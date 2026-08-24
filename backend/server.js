import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');

// Ensure data directory and messages.json exist
const ensureDataFile = () => {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
};

ensureDataFile();

// Helper to read messages
const readMessages = () => {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading messages file:', error);
    return [];
  }
};

// Helper to write messages
const writeMessages = (messages) => {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
};

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Personna Portfolio Contact API'
  });
});

// GET /api/contact - List all submitted contact messages
app.get('/api/contact', (req, res) => {
  const messages = readMessages();
  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// POST /api/contact - Save a new contact message
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message, permission } = req.body;

  // Validation
  if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
    return res.status(400).json({ success: false, error: 'First name is required.' });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message content is required.' });
  }

  if (!permission) {
    return res.status(400).json({ success: false, error: 'Contact permission is required.' });
  }

  const newMessage = {
    id: crypto.randomUUID(),
    firstName: firstName.trim(),
    lastName: (lastName || '').trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    permission: Boolean(permission),
    createdAt: new Date().toISOString(),
    clientIp: req.ip || req.headers['x-forwarded-for'] || null
  };

  try {
    const messages = readMessages();
    messages.unshift(newMessage); // newest first
    writeMessages(messages);

    console.log(`[CONTACT] New message received from ${newMessage.firstName} (${newMessage.email})`);

    return res.status(201).json({
      success: true,
      message: 'Message captured successfully!',
      data: newMessage
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ success: false, error: 'Failed to save message. Please try again later.' });
  }
});

// DELETE /api/contact/:id - Delete a contact message by ID
app.delete('/api/contact/:id', (req, res) => {
  const { id } = req.params;
  const messages = readMessages();
  const index = messages.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Message not found.' });
  }

  messages.splice(index, 1);
  writeMessages(messages);

  return res.status(200).json({ success: true, message: 'Message deleted successfully.' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Personna Contact Backend running at http://localhost:${PORT}`);
});
