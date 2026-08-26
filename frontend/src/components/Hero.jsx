import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { openAndDownloadPdf } from '../utils/pdfHelper';
import ThemeSwitcher from './ThemeSwitcher';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'FEATURE FILM // FULL-STACK ARCHITECT',
    'ORIGINAL SERIES // AI & ML SPECIALIST',
    'BLOCKBUSTER // DISTRIBUTED SYSTEMS',
    'ACCLAIMED // ALGORITHMIC PROBLEM SOLVER'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
        "-=0.7"
      )
      .fromTo(
        card,
        { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
        { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
        "-=0.9"
      );

    // --- 3D PERSPECTIVE PHYSICS & SPOTLIGHT TRACKING ---
    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update Spotlight position
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, var(--accent-glow) 0%, var(--accent-glow-subtle) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12">

        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div 
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border text-xs font-mono uppercase tracking-widest text-white shadow-2xl"
            style={{ borderColor: 'var(--accent-border)' }}
          >
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent-color)' }}></span>
            <span className="font-bold tracking-wider" style={{ color: 'var(--accent-color)' }}>NETFLIX DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2024 - 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">FULL-STACK 4K</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">AI / ML CERTIFIED</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-14 my-auto w-full">

          {/* Left Column: Headline, Bio & Primary Metrics */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">

            {/* Cinematic Netflix Pill Tickers */}
            <div className="hero-anim-item flex flex-wrap items-center gap-2.5">
              <span 
                className="px-3 py-1 text-white font-black text-xs rounded tracking-widest animate-pulse"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 0 20px var(--accent-glow)'
                }}
              >
                TOP 1%
              </span>
              <span 
                className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider uppercase border"
                style={{
                  backgroundColor: 'var(--accent-glow-subtle)',
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent-color)'
                }}
              >
                ★ 99% MATCH
              </span>
              <span className="text-white/60 text-xs font-mono tracking-widest uppercase">
                B.Tech (IT & Entrepreneurship) // IIIT Allahabad
              </span>
            </div>

            {/* Giant Title */}
            <h1 className="hero-anim-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.92] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              PARTH <br />
              <span 
                className="text-transparent bg-clip-text drop-shadow-[0_0_35px_var(--accent-glow)]"
                style={{ backgroundImage: 'var(--accent-gradient)' }}
              >
                AGRAWAL
              </span>
            </h1>

            {/* Role Header */}
            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs md:text-sm font-mono tracking-wider font-semibold text-white/90">
              <span style={{ color: 'var(--accent-color)' }}>&bull;</span>
              <span>FULL-STACK ARCHITECT</span>
              <span className="text-white/40">|</span>
              <span>AI & ML RESEARCHER</span>
              <span className="text-white/40">|</span>
              <span>DISTRIBUTED SYSTEMS</span>
            </div>

            {/* Bio Description */}
            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-2xl drop-shadow">
              Architecting high-concurrency distributed backends, intelligent multi-agent systems, and production React applications with deep research in encrypted traffic observability and algorithmic efficiency.
            </p>

            {/* Live Metrics Matrix Grid */}
            <div className="hero-anim-item grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-2xl pt-1">
              <div 
                className="p-3.5 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col justify-between shadow-lg"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: 'var(--accent-color)' }}>9.24</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider mt-1">CGPA // IIITA</span>
              </div>
              <div 
                className="p-3.5 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col justify-between shadow-lg"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-tight text-white">1913</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider mt-1">LeetCode Knight</span>
              </div>
              <div 
                className="p-3.5 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col justify-between shadow-lg"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-tight text-white">783+</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider mt-1">Solved Algos</span>
              </div>
              <div 
                className="p-3.5 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col justify-between shadow-lg"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: 'var(--accent-color)' }}>Top 4.18%</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider mt-1">Global Contest</span>
              </div>
            </div>

            {/* Core Domain Badges */}
            <div className="hero-anim-item flex flex-wrap gap-2 pt-1">
              {['React 19', 'TypeScript', 'Node.js', 'Python / ML', 'DynamoDB', 'Docker', 'C++', 'System Design'].map((badge, bIdx) => (
                <span 
                  key={bIdx} 
                  className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:border-[var(--accent-border)] hover:text-white transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column: Interactive System Telemetry & Engineering Matrix */}
          <div className="lg:col-span-5 flex flex-col space-y-4 w-full">
            
            {/* Terminal Console Card */}
            <div 
              className="w-full p-6 bg-[#101010]/95 backdrop-blur-2xl rounded-2xl border shadow-[0_30px_60px_rgba(0,0,0,0.9)] space-y-5"
              style={{ borderColor: 'var(--accent-border)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  <span className="text-xs font-mono text-white/50 uppercase ml-2 tracking-wider">ENGINEERING MATRIX</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                  SYS://ACTIVE
                </span>
              </div>

              {/* Matrix Specifications */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <span className="text-white/50">EDUCATION</span>
                  <span className="text-white font-semibold text-right">B.Tech IT, IIIT Allahabad</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <span className="text-white/50">ACADEMIC HONORS</span>
                  <span className="text-right" style={{ color: 'var(--accent-color)' }}>CGPA 9.24 / 10 &bull; Top 1%</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <span className="text-white/50">ALGORITHMIC RANK</span>
                  <span className="text-white font-semibold text-right">Knight 1913 (Top 4.18%)</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <span className="text-white/50">GLOBAL HACKATHONS</span>
                  <span className="text-white font-semibold text-right">Top 1500 The Big Code 2026</span>
                </div>
                <div className="flex justify-between items-start border-b border-white/5 pb-2">
                  <span className="text-white/50">KEY RESEARCH</span>
                  <span className="text-white font-semibold text-right">Encrypted DNS (DoH/DoQ)</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-white/50">LOCATION</span>
                  <span className="text-white/80 text-right">Prayagraj (Allahabad), IN</span>
                </div>
              </div>

              {/* Interactive Status Footer */}
              <div 
                className="p-3 rounded-xl border flex items-center justify-between text-xs font-mono"
                style={{
                  backgroundColor: 'var(--accent-glow-subtle)',
                  borderColor: 'var(--accent-border)'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent-color)' }}></span>
                  <span className="font-bold" style={{ color: 'var(--accent-color)' }}>STREAM STATUS</span>
                </div>
                <span className="text-white font-mono uppercase tracking-wider text-[11px]">OPEN TO OPPORTUNITIES</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div 
          className="text-2xl font-black tracking-tighter flex items-center gap-2"
          style={{
            color: 'var(--accent-color)',
            filter: 'drop-shadow(0 2px 15px var(--accent-glow))'
          }}
        >
          PARTH<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-[var(--accent-color)] transition-colors">Home</a>
          <a href="#about" className="hover:text-[var(--accent-color)] transition-colors">About</a>
          <a href="#expertise" className="hover:text-[var(--accent-color)] transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-[var(--accent-color)] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[var(--accent-color)] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[var(--accent-color)] transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <a
            href="/Parth_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => openAndDownloadPdf('/Parth_Agrawal_Resume.pdf', 'Parth_Agrawal_Resume.pdf')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--accent-color)',
              boxShadow: '0 0 20px var(--accent-glow)'
            }}
          >
            Hire Me
          </a>
        </div>
      </header>
    </section>
  );
};

export default Hero;