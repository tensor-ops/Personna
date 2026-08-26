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
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 my-auto">

          {/* Left Side: Developer Story, Metrics Matrix & Description */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 text-left">

            {/* Cinematic Netflix Pill Ticker */}
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
            <h1 className="hero-anim-item text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.92] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              PARTH <br />
              <span 
                className="text-transparent bg-clip-text drop-shadow-[0_0_35px_var(--accent-glow)]"
                style={{ backgroundImage: 'var(--accent-gradient)' }}
              >
                AGRAWAL
              </span>
            </h1>

            {/* Role Header */}
            <div className="hero-anim-item flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider font-semibold text-white/90">
              <span style={{ color: 'var(--accent-color)' }}>&bull;</span>
              <span>FULL-STACK ARCHITECT</span>
              <span className="text-white/40">|</span>
              <span>AI & ML RESEARCHER</span>
              <span className="text-white/40">|</span>
              <span>DISTRIBUTED SYSTEMS</span>
            </div>

            {/* Quick Bio */}
            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-xl drop-shadow">
              Architecting high-concurrency distributed backends, intelligent multi-agent systems, and production React applications with deep focus on encrypted traffic observability and algorithmic efficiency.
            </p>

            {/* Live Metrics Matrix Grid (Fills Space with High Impact Stats) */}
            <div className="hero-anim-item grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl pt-1">
              <div 
                className="p-3 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: 'var(--accent-color)' }}>9.24</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">CGPA // IIITA</span>
              </div>
              <div 
                className="p-3 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-xl md:text-2xl font-black tracking-tight text-white">1913</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">LeetCode Knight</span>
              </div>
              <div 
                className="p-3 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-xl md:text-2xl font-black tracking-tight text-white">783+</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Solved Algos</span>
              </div>
              <div 
                className="p-3 rounded-xl bg-black/60 backdrop-blur-xl border flex flex-col"
                style={{ borderColor: 'var(--accent-border)' }}
              >
                <span className="text-xl md:text-2xl font-black tracking-tight" style={{ color: 'var(--accent-color)' }}>Top 4.18%</span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Global Contest</span>
              </div>
            </div>

            {/* Core Domain Badges */}
            <div className="hero-anim-item flex flex-wrap gap-2 pt-1">
              {['React 19', 'TypeScript', 'Node.js', 'Python / ML', 'DynamoDB', 'Docker', 'C++'].map((badge, bIdx) => (
                <span 
                  key={bIdx} 
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-white/70 hover:border-[var(--accent-border)] hover:text-white transition-colors"
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

          {/* Right Side: Interactive 3D Holographic Tilt Developer Card & Specs */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-6 perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform w-full max-w-[340px]"
            >
              {/* Cinematic Neon Back Glow */}
              <div 
                className="absolute -inset-3 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"
                style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, var(--accent-glow-subtle) 60%, transparent 80%)' }}
              ></div>

              {/* Holographic Developer Card with Glossy Sheen */}
              <div 
                className="relative w-full h-[360px] p-6 bg-[#101010]/95 backdrop-blur-2xl rounded-2xl border shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between"
                style={{ borderColor: 'var(--accent-border)' }}
              >

                {/* Dynamic Specular Glare Layer */}
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Top Card Terminal Header */}
                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                    SYS://ONLINE &bull; PARTH_OS v2.6
                  </span>
                </div>

                {/* Center Monogram Emblem */}
                <div className="flex flex-col items-center justify-center my-auto space-y-3 relative z-10">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center border shadow-2xl relative group-hover:scale-105 transition-transform duration-500"
                    style={{
                      borderColor: 'var(--accent-border)',
                      background: 'radial-gradient(circle, var(--accent-glow-subtle) 0%, rgba(20,20,20,0.9) 80%)'
                    }}
                  >
                    <span 
                      className="text-4xl font-black tracking-tighter"
                      style={{
                        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                        color: 'var(--accent-color)',
                        filter: 'drop-shadow(0 0 15px var(--accent-glow))'
                      }}
                    >
                      PA
                    </span>
                    {/* Corner Accent Ticks */}
                    <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t-2 border-l-2" style={{ borderColor: 'var(--accent-color)' }}></div>
                    <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b-2 border-r-2" style={{ borderColor: 'var(--accent-color)' }}></div>
                  </div>

                  <div className="text-center space-y-0.5">
                    <div className="text-sm font-mono font-bold tracking-widest uppercase text-white">
                      PARTH AGRAWAL
                    </div>
                    <div className="text-[11px] font-mono text-white/50 tracking-wider">
                      FULL-STACK ARCHITECT // ML
                    </div>
                  </div>
                </div>

                {/* Bottom Telemetry Lines */}
                <div className="pt-3 border-t border-white/10 font-mono text-[10px] space-y-1.5 relative z-10">
                  <div className="flex justify-between text-white/70">
                    <span>SPECIALIZATION</span>
                    <span className="text-emerald-400 font-bold">NETWORK ML & ARCHITECTURE</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>GLOBAL CONTEST</span>
                    <span style={{ color: 'var(--accent-color)' }}>TOP 1500 THE BIG CODE</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>LOCATION</span>
                    <span>PRAYAGRAJ (ALLAHABAD), IN</span>
                  </div>
                </div>

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
            href="./Parth_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => openAndDownloadPdf('./Parth_Agrawal_Resume.pdf', 'Parth_Agrawal_Resume.pdf')}
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