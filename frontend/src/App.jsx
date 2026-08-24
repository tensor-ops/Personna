import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import FloatingThemeBar from './components/FloatingThemeBar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <main className="bg-[#050505] min-h-screen text-white relative cursor-none">
        {/* Cinematic Preloader */}
        {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

        {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
        <CustomCursor />

        {/* Global Floating Quick Theme Switcher Bar (Always visible on all screens) */}
        <FloatingThemeBar />

        {/* Portfolio Sections */}
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;