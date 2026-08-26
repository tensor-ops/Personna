<div align="center">

  # 🎬 PARTH AGRAWAL &mdash; DEVELOPER PORTFOLIO
  ### *A Cinematic, Netflix-Themed Interactive Portfolio Experience*

  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-red.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>Explore high-performance software engineering, machine learning research, and distributed systems in a dynamic studio atmosphere.</strong>
  </p>

</div>

---

## 🌟 Highlights & Features

### 🎞️ Cinematic "Netflix Original" Design System
- **Studio Preloader**: Dynamic intro sequence inspired by cinematic entertainment opening titles.
- **Bento Grid Architecture**: Sleek modular cards with magnetic spotlight tracking and glossy sheen effects.
- **3D Holographic Tilt Frame**: Interactive 3D cursor-reactive perspective poster card on the Hero section.
- **Dual-State Custom Cursor**: Fluid cursor dot, responsive ring, and ambient spotlight beam that follow mouse movement.

### 🎨 Modular Multi-Theme Engine
Switch between 6 bespoke color presets in real time with instant site-wide CSS variable transitions and automatic `localStorage` persistence:

| Preset | Vibe & Aesthetic | Accent Color |
| :--- | :--- | :--- |
| 🔴 **Cinematic Red** | *Netflix Studio & Scarlet Glow* | `#E50914` |
| 🔵 **Electric Cyan** | *Cyberspace & Electric Blue* | `#00F0FF` |
| 🟢 **Quantum Emerald** | *Terminal Neon & Matrix Green* | `#10B981` |
| 🟣 **Nebula Violet** | *Cosmic Ultraviolet & Synthwave* | `#A855F7` |
| 🟡 **Solar Gold** | *Radiant Ember & Interstellar Dawn* | `#F59E0B` |
| 🌸 **Cyber Rose** | *Laser Magenta & Neon Quartz* | `#F43F5E` |

- **Floating Quick-Theme Bar**: Always accessible bottom-right glassmorphic pill with live tooltips and pulsing halos.
- **Top Navigation Switcher**: Integrated in the header with full theme descriptions and palette swatches.

### 📁 Featured Projects & Research Showcase
Curated portfolio of production applications, distributed platforms, and research:
- 🛒 **QuickCart AI**: AI shopping co-pilot with natural language mission planning (Next.js, Mistral 7B, DynamoDB).
- 🧠 **DailyForge OS**: Grounded multi-agent AI system with telemetry routing and habit analytics.
- 🔒 **Encrypted DNS Intelligence**: ML framework detecting residual observability across DoH, DoT, and DoQ protocols.
- 💚 **Manobala AI**: AI mental health support platform powered by Google Gemini API.
- 💳 **Visa Component Suite**: Published React 19 + TypeScript component library (`@vap/feediq-tool`).
- 🚆 **YatriSewa Platform**: High-concurrency transit booking and emergency SOS infrastructure.
- ⚔️ **Algorithmic Suite**: High-performance problem solving (LeetCode Knight 1913 Rating, Top 4.18%).

### 📄 One-Click CV & Resume Delivery
- Seamless dual-action PDF download: Opens the PDF in Chrome's native PDF reader in a new tab while simultaneously triggering a direct file download to disk.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation & Transitions**: [GSAP (GreenSock)](https://greensock.com/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Variable Theme Engine
- **Icons & Assets**: Custom SVG icon suite & dynamic canvas/gradient effects
- **PDF Generation**: ReportLab PDF generator

---

## 📂 Project Structure

```bash
Personna/
├── frontend/                      # React 19 + Vite Frontend
│   ├── public/                    # Static assets & downloadable PDFs
│   ├── src/
│   │   ├── components/            # UI components (Hero, About, Skills, Projects, Contact, etc.)
│   │   ├── context/               # Theme context and state
│   │   ├── utils/                 # PDF and helper utilities
│   │   ├── App.jsx                # Main layout
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Styling and design system tokens
│   ├── vite.config.js             # Vite config with backend API proxy
│   └── package.json               # Frontend dependencies
├── backend/                       # Node.js + Express Contact Backend
│   ├── data/
│   │   └── messages.json          # Persistent JSON store for submitted messages
│   ├── server.js                  # Express API server (POST /api/contact, GET /api/contact, GET /api/stats)
│   ├── .env                       # Backend environment variables (PORT 5001)
│   ├── .env.example
│   └── package.json               # Backend dependencies
├── MASTER_PROMPT.md               # Master prompt & full architectural blueprint
├── package.json                   # Root orchestrator (runs frontend & backend together)
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Quick Start (Run Both Frontend & Backend)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/parth506/Personna.git
   cd Personna
   ```

2. **Install all dependencies (Root, Frontend & Backend)**:
   ```bash
   npm run install:all
   ```

3. **Start both Frontend and Backend concurrently**:
   ```bash
   npm run dev
   ```
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend API**: [http://localhost:5001](http://localhost:5001)

### Running Separately

- **Frontend Only**: `npm run dev:frontend` (or `cd frontend && npm run dev`)
- **Backend Only**: `npm run dev:backend` (or `cd backend && npm run dev`)
- **Build Frontend**: `npm run build:frontend`

---

## ⚙️ Configuration & Customization

### Adding or Customizing Themes
Theme definitions are located in [`src/context/ThemeContext.jsx`](src/context/ThemeContext.jsx). To add a new preset, add an object to the `THEMES` array and define corresponding tokens in [`src/index.css`](src/index.css):

```javascript
// src/context/ThemeContext.jsx
{
  id: 'sapphire',
  name: 'Deep Sapphire',
  vibe: 'Midnight Blue & Cobalt Neon',
  color: '#0066FF',
  light: '#38BDF8',
  dark: '#002299',
  rgb: '0, 102, 255',
  gradient: 'linear-gradient(135deg, #38BDF8 0%, #0066FF 50%, #002299 100%)'
}
```

---

## 👨‍💻 Author

**Parth Agrawal**
- 🏛️ B.Tech in Information Technology & Entrepreneurship Minor, **IIIT Allahabad** (CGPA: 9.24/10)
- 🐙 GitHub: [@parth506](https://github.com/parth506)
- 💼 LinkedIn: [parthagrawal129](https://www.linkedin.com/in/parthagrawal129)
- ⚡ LeetCode: [kanha_12](https://leetcode.com/u/kanha_12/) (Knight 1913 Rating, Top 4.18%)
- 📧 Email: [parthagrawal4675@gmail.com](mailto:parthagrawal4675@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
