import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openAndDownloadPdf } from '../utils/pdfHelper';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Ambient Glows */}
      <div 
        className="absolute top-1/4 left-10 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-70"
        style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(circle, var(--accent-glow-subtle) 0%, transparent 70%)' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border text-xs font-mono uppercase tracking-widest text-white shadow-2xl"
            style={{ borderColor: 'var(--accent-border)' }}
          >
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent-color)' }}></span>
            <span className="font-bold" style={{ color: 'var(--accent-color)' }}>EPISODE 01</span>
            <span className="text-white/40">|</span>
            <span>ABOUT THE ENGINEER</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            EPISODE SYNOPSIS <br />
            <span 
              className="text-transparent bg-clip-text drop-shadow-[0_0_30px_var(--accent-glow)]"
              style={{ backgroundImage: 'var(--accent-gradient)' }}
            >
              ORIGIN & VISION.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[var(--accent-color)] transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow-subtle), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>
            
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-color)' }}>Cast & Background</h3>
              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I am <span className="text-white font-bold drop-shadow">Parth Agrawal</span>, a B.Tech student in Information Technology (Minor in Entrepreneurship) at <strong className="text-white">Indian Institute of Information Technology, Allahabad</strong> with a CGPA of <span className="font-bold" style={{ color: 'var(--accent-color)' }}>9.24/10</span>.
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                My research and engineering focuses on encrypted DNS traffic intelligence, machine learning for network security, and architecting scalable full-stack platforms and AI agent systems.
              </p>
            </div>
            
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">IIIT Allahabad (CGPA 9.24)</span>
                <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Network ML & Security</span>
                <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Full-Stack & Distributed Systems</span>
              </div>

              <a
                href="/Parth_Agrawal_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => openAndDownloadPdf('/Parth_Agrawal_CV.pdf', 'Parth_Agrawal_CV.pdf')}
                className="shrink-0 px-4 py-2 rounded text-white text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 0 20px var(--accent-glow)'
                }}
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Get CV (PDF)
              </a>
            </div>
          </div>

          {/* Card 2: Fellowships & Achievements (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[var(--accent-color)] transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow-subtle), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>
            
            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-color)' }}>Education & Accolades</h3>
              <ul className="space-y-3 text-sm text-white/80 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold" style={{ color: 'var(--accent-color)' }}>&#8250;</span>
                  <span><strong className="text-white">IIIT Allahabad (2023–Present)</strong>: B.Tech IT & Entrepreneurship (CGPA: 9.24/10).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold" style={{ color: 'var(--accent-color)' }}>&#8250;</span>
                  <span><strong className="text-white">Christ Church Boys' Sr. Sec. School (2019–2022)</strong>: CBSE 95.3% | PCM 92.8%.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold" style={{ color: 'var(--accent-color)' }}>&#8250;</span>
                  <span>Top 1500 in <strong className="text-white">The Big Code 2026</strong> & LeetCode Max 1913 (Top 4.18%).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold" style={{ color: 'var(--accent-color)' }}>&#8250;</span>
                  <span><strong className="text-white">Gold Medalist</strong> in IMO, IEO & NSO (Zonal Rank 5 in IMO).</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-6 font-mono text-xs text-white/40 relative z-10">
              // ACADEMIC & CONTEST CREDENTIALS
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--accent-color)] transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow-subtle), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--accent-color)' }}>Production Tech Stack</h3>
              <p className="text-base md:text-lg font-semibold text-white">Equipped with industry-grade instruments for robust scaling.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {['React', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'JavaScript'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:border-[var(--accent-color)] hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;