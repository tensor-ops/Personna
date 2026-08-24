import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Frontend Development",
    text: "Crafting responsive, high-fidelity user interfaces with React, modern JavaScript, Tailwind CSS, and buttery smooth GSAP motion interactions.",
    tag: "UI / UX & INTERACTION",
    gradient: "from-[#1f0a0c] via-[#121212] to-[#0a0a0a]"
  },
  {
    number: "02",
    title: "Backend Development",
    text: "Architecting secure REST APIs, enterprise authentication pipelines, and scalable database schemas across PostgreSQL and MongoDB.",
    tag: "API & ARCHITECTURE",
    gradient: "from-[#1a0809] via-[#111111] to-[#090909]"
  },
  {
    number: "03",
    title: "AI & Machine Learning",
    text: "Integrating production-grade LLM workflows, predictive machine learning pipelines, and computer vision systems backed by AWS AI certification.",
    tag: "INTELLIGENCE & ML",
    gradient: "from-[#220a0d] via-[#131313] to-[#0a0a0a]"
  },
  {
    number: "04",
    title: "Cloud & Deployment",
    text: "Deploying resilient, containerized multi-tenant services using Docker, GitHub Actions CI/CD workflows, and optimized cloud hosting.",
    tag: "DEVOPS & CLOUD",
    gradient: "from-[#1d090b] via-[#101010] to-[#080808]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.92 - index * 0.025,
        y: -15 - index * 8,
        filter: "blur(6px)",
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-20 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Ambient Glow */}
      <div 
        className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-80"
        style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border text-[11px] font-mono uppercase tracking-widest text-white shadow-xl"
              style={{ borderColor: 'var(--accent-border)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent-color)' }}></span>
              <span className="font-bold" style={{ color: 'var(--accent-color)' }}>EPISODE 02</span>
              <span className="text-white/40">|</span>
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              DIRECTOR'S CUT <br />
              <span 
                className="text-transparent bg-clip-text drop-shadow-[0_0_25px_var(--accent-glow)]"
                style={{ backgroundImage: 'var(--accent-gradient)' }}
              >
                TECHNICAL CAPABILITIES.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Merging full-stack engineering, scalable microservices, and AI integrations into production-ready platforms.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-8 pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-[var(--accent-color)]`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow-subtle), transparent 70%)'
                }}
              ></div>

              {/* Accent Stripe */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)' }}
              ></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span 
                  className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border"
                  style={{
                    color: 'var(--accent-color)',
                    backgroundColor: 'var(--accent-glow-subtle)',
                    borderColor: 'var(--accent-border)'
                  }}
                >
                  {item.tag}
                </span>
                <span className="text-2xl md:text-3xl font-mono font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-[var(--accent-color)] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Subtle Theme Corner Dot */}
              <div 
                className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full z-10 transition-all group-hover:scale-125"
                style={{
                  backgroundColor: 'var(--accent-color)',
                  boxShadow: '0 0 10px var(--accent-color)'
                }}
              ></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;