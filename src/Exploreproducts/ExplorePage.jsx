// PlayStationPage.jsx
// Drop this into any React + Tailwind project (Vite / CRA / Next.js)
// Make sure tailwind.config.js has content: ['./src/**/*.{js,jsx}']

import { useRef, useState, useEffect } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "games",
    num: "01",
    label: "Games",
    items: [
      { id: 1, name: "Marvel's Spider-Man 2", desc: "Swing through an expanded New York City", tag: "Action / Adventure", price: "$69.99", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80" },
      { id: 2, name: "God of War Ragnarök", desc: "The epic Norse saga reaches its conclusion", tag: "Action / RPG", price: "$59.99", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80" },
      { id: 3, name: "Horizon Forbidden West", desc: "Explore a lush post-apocalyptic frontier", tag: "Open World", price: "$49.99", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80" },
      { id: 4, name: "The Last of Us Part I", desc: "A landmark of cinematic storytelling rebuilt", tag: "Survival / Drama", price: "$69.99", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80" },
      { id: 5, name: "Demon's Souls", desc: "A brutal rebirth of a genre-defining classic", tag: "Action / RPG", price: "$39.99", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" },
      { id: 6, name: "Returnal", desc: "Die. Return. Unravel the mystery.", tag: "Roguelike / Shooter", price: "$59.99", img: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=600&q=80" },
    ],
  },
  {
    id: "accessories",
    num: "02",
    label: "Accessories",
    items: [
      { id: 7, name: "DualSense Controller", desc: "Feel every moment with adaptive haptic feedback", tag: "Controller", price: "$69.99", img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80" },
      { id: 8, name: "Pulse 3D Wireless Headset", desc: "Immersive 3D audio built natively for PlayStation", tag: "Audio", price: "$99.99", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" },
      { id: 9, name: "HD Camera", desc: "Crystal clear 1080p dual lens broadcast camera", tag: "Camera", price: "$59.99", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80" },
      { id: 10, name: "Media Remote", desc: "Streamlined control for all your entertainment", tag: "Remote", price: "$29.99", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
      { id: 11, name: "DualSense Edge", desc: "Precision tuning engineered for elite play", tag: "Pro Controller", price: "$199.99", img: "https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=600&q=80" },
    ],
  },
  {
    id: "consoles",
    num: "03",
    label: "PlayStation Consoles",
    items: [
      { id: 12, name: "PlayStation 5", desc: "Play has no limits. The future of gaming is here.", tag: "Console", price: "$499.99", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80" },
      { id: 13, name: "PS5 Digital Edition", desc: "All-digital gaming without the disc drive", tag: "Console", price: "$399.99", img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80" },
      { id: 14, name: "PlayStation VR2", desc: "A new generation of VR powered entirely by PS5", tag: "VR Headset", price: "$549.99", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80" },
      { id: 15, name: "PS5 Slim", desc: "Compact redesign with the same full performance", tag: "Console", price: "$449.99", img: "https://images.unsplash.com/photo-1631214500004-0f4c31b5e949?w=600&q=80" },
    ],
  },
  {
    id: "subscriptions",
    num: "04",
    label: "Subscriptions",
    items: [
      { id: 16, name: "PlayStation Plus Essential", desc: "Online multiplayer and curated monthly games", tag: "Monthly / Annual", price: "$9.99/mo", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80" },
      { id: 17, name: "PlayStation Plus Extra", desc: "A vast catalog with hundreds of PS4 & PS5 titles", tag: "Monthly / Annual", price: "$14.99/mo", img: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80" },
      { id: 18, name: "PlayStation Plus Premium", desc: "The ultimate PlayStation membership experience", tag: "Monthly / Annual", price: "$17.99/mo", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" },
      { id: 19, name: "PlayStation Now", desc: "Stream classic titles from past PlayStation generations", tag: "Streaming", price: "$9.99/mo", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" },
    ],
  },
];

/* ─── PRODUCT CARD ──────────────────────────────────────────────────── */
function ProductCard({ item }) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 w-75 rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group"
      style={{
        background: hovered
          ? `radial-gradient(ellipse at ${spotlight.x}% ${spotlight.y}%, #091830 0%, #060d1f 65%)`
          : "#060d1f",
        borderColor: hovered ? "rgba(26,111,255,0.25)" : "rgba(26,111,255,0.08)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 30px 70px rgba(0,4,20,0.85), 0 0 0 1px rgba(26,111,255,0.2), 0 0 60px rgba(26,111,255,0.06)"
          : "none",
      }}
    >
      {/* Top shimmer edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(26,111,255,0.5), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingBottom: "58%" }}>
        {/* Scanlines */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,10,40,0.08) 2px, rgba(0,10,40,0.08) 4px)",
          }}
        />
        {/* Gradient fade bottom */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(6,13,31,0.92) 100%)" }} />
        <img
          src={item.img}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{
            filter: "saturate(0.55) brightness(0.75) hue-rotate(15deg)",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="px-5 pb-6 pt-4">
        <span
          className="text-[9px] tracking-[0.2em] uppercase font-medium"
          style={{ fontFamily: "'DM Mono', monospace", color: "rgba(77,159,255,0.6)" }}
        >
          {item.tag}
        </span>
        <h3
          className="mt-2 mb-1.5 text-[15px] font-bold leading-tight tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", color: "#e8f0ff" }}
        >
          {item.name}
        </h3>
        <p
          className="text-xs leading-relaxed mb-5 font-light"
          style={{ color: "#3a5080" }}
        >
          {item.desc}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-[13px] font-medium"
            style={{ fontFamily: "'DM Mono', monospace", color: "rgba(77,159,255,0.6)" }}
          >
            {item.price}
          </span>
          <button
            className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 rounded-lg border transition-all duration-300"
            style={{
              fontFamily: "'DM Mono', monospace",
              borderColor: "rgba(26,111,255,0.2)",
              color: "#3a5080",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,111,255,0.5)";
              e.currentTarget.style.color = "#4d9fff";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(26,111,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,111,255,0.2)";
              e.currentTarget.style.color = "#3a5080";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── CAROUSEL SECTION ──────────────────────────────────────────────── */
function CarouselSection({ section, index }) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const stopDrag = () => { isDragging.current = false; };

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="mb-24 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 0.06}s`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div className="flex-1">
          <p
            className="text-[10px] tracking-[0.22em] uppercase mb-1.5"
            style={{ fontFamily: "'DM Mono', monospace", color: "rgba(26,111,255,0.55)" }}
          >
            {section.num} — Collection
          </p>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif", color: "#e8f0ff" }}
          >
            {section.label}
          </h2>
          {/* Divider */}
          <div
            className="mt-3.5 h-px"
            style={{ background: "linear-gradient(90deg, rgba(26,111,255,0.3), rgba(26,111,255,0.05) 55%, transparent)" }}
          />
        </div>
        {/* Arrow buttons */}
        <div className="flex gap-2.5 mt-1 ml-6">
          {["←", "→"].map((arrow, i) => (
            <button
              key={arrow}
              onClick={() => scroll(i === 0 ? -1 : 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300"
              style={{
                background: "rgba(26,111,255,0.04)",
                border: "1px solid rgba(26,111,255,0.14)",
                color: "#3a5080",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,111,255,0.45)";
                e.currentTarget.style.color = "#4d9fff";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(26,111,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(26,111,255,0.14)";
                e.currentTarget.style.color = "#3a5080";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 select-none"
        style={{ scrollbarWidth: "none", cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {section.items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────── */

// simple auto-playing fullscreen carousel used in hero background
function HeroCarousel({ items }) {
  const ref = useRef(null);
  useEffect(() => {
    let index = 0;
    const scroll = () => {
      if (!ref.current || items.length === 0) return;
      const width = ref.current.clientWidth;
      index = (index + 1) % items.length;
      ref.current.scrollTo({ left: index * width, behavior: 'smooth' });
    };
    const iv = setInterval(scroll, 3000);
    return () => clearInterval(iv);
  }, [items]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex whitespace-nowrap overflow-x-hidden"
      style={{ scrollBehavior: 'smooth' }}
    >
      {items.map((it) => (
        <div
          key={it.id}
          className="shrink-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${it.img})` }}
        />
      ))}
    </div>
  );
}

export default function PlayStationPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#030610", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
        @keyframes orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(28px,-38px) scale(1.04); }
          66% { transform: translate(-18px,26px) scale(0.96); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: fade-up 0.8s ease both; }
        .hero-title   { animation: fade-up 0.8s 0.12s ease both; }
        .hero-desc    { animation: fade-up 0.8s 0.22s ease both; }
        .hero-stats   { animation: fade-up 0.8s 0.34s ease both; }
      `}</style>

      {/* ── Ambient Orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute rounded-full" style={{ width: 700, height: 700, top: -250, left: -200, background: "radial-gradient(circle, #1a6fff, transparent 70%)", filter: "blur(130px)", opacity: 0.11, animation: "orb-drift 22s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 500, height: 500, top: "30%", right: -150, background: "radial-gradient(circle, #2563eb, transparent 70%)", filter: "blur(130px)", opacity: 0.07, animation: "orb-drift 22s ease-in-out infinite", animationDelay: "-8s" }} />
        <div className="absolute rounded-full" style={{ width: 450, height: 450, bottom: "15%", left: "38%", background: "radial-gradient(circle, #1a6fff, transparent 70%)", filter: "blur(130px)", opacity: 0.05, animation: "orb-drift 22s ease-in-out infinite", animationDelay: "-15s" }} />
      </div>

      {/* ── Grain Overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.022,
        }}
      />

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-14 h-17"
        style={{
          background: "rgba(3,6,16,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(26,111,255,0.1)",
        }}
      >
        <a href="#" className="flex items-center gap-3 no-underline">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ filter: "drop-shadow(0 0 8px rgba(77,159,255,0.55))" }}>
            <circle cx="14" cy="14" r="12" stroke="rgba(77,159,255,0.45)" strokeWidth="1" />
            <path d="M11 9v10l9-5-9-5z" fill="rgba(77,159,255,0.85)" />
          </svg>
          <span className="text-[15px] font-bold tracking-[0.06em] uppercase" style={{ fontFamily: "'Syne', sans-serif", color: "#e8f0ff" }}>
            PlayStation
          </span>
        </a>
        <ul className="flex gap-10 list-none">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-[10px] tracking-[0.14em] uppercase no-underline transition-colors duration-300"
                style={{ fontFamily: "'DM Mono', monospace", color: "#3a5080" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4d9fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3a5080")}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── CONTENT ── */}
      <div className="relative z-10">
        <div className="max-w-310 mx-auto px-14">

          {/* ── HERO ── */}
          <header className="relative h-[80vh] overflow-hidden">
            {/* background carousel and overlay */}
            <HeroCarousel items={SECTIONS.flatMap(s => s.items).slice(0, 8)} />
            <div className="absolute inset-0 bg-black/40" />

            {/* text container */}
            <div className="relative z-10 pt-28 pb-20 px-14 max-w-310 mx-auto">
              <div className="hero-eyebrow flex items-center gap-3 mb-6">
                <span className="block w-9 h-px" style={{ background: "#1a6fff", boxShadow: "0 0 10px #1a6fff" }} />
                <span className="text-[10px] tracking-[0.28em] uppercase" style={{ fontFamily: "'DM Mono', monospace", color: "#4d9fff" }}>
                  Explore Products — 2025
                </span>
              </div>

              <h1
                className="hero-title font-extrabold leading-[0.93] tracking-[-0.04em] mb-7"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(60px, 7.5vw, 100px)", color: "#e8f0ff", textShadow: "0 0 100px rgba(26,111,255,0.18)" }}
              >
                The PlayStation
                <span className="block" style={{ color: "transparent", WebkitTextStroke: "1px rgba(77,159,255,0.2)" }}>
                  Universe.
                </span>
              </h1>

              <p className="hero-desc text-sm leading-[1.85] font-light tracking-[0.015em] max-w-97.5" style={{ color: "#3a5080" }}>
                A curated showcase of hardware, software, and services designed for those who play without limits.
              </p>

              {/* call to action buttons */}
              <div className="mt-8 flex gap-4">
                <button
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                  style={{
                    background: "#1a6fff",
                    color: "#e8f0ff",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#4d9fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#1a6fff";
                  }}
                >
                  Explore All
                </button>
                <button
                  className="px-8 py-3 rounded-lg font-semibold border transition-all duration-300"
                  style={{
                    borderColor: "#1a6fff",
                    color: "#1a6fff",
                    background: "transparent",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#1a6fff";
                    e.currentTarget.style.color = "#e8f0ff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#1a6fff";
                  }}
                >
                  See Recommendations
                </button>
              </div>

              <div className="hero-stats flex gap-12 mt-14">
                {[["460+", "Products"], ["5M+", "Players"], ["4", "Collections"]].map(([num, label]) => (
                  <div key={label} className="pl-5" style={{ borderLeft: "1px solid rgba(26,111,255,0.18)" }}>
                    <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Syne', sans-serif", color: "#e8f0ff" }}>{num}</div>
                    <div className="text-[10px] tracking-[0.16em] uppercase mt-1" style={{ fontFamily: "'DM Mono', monospace", color: "#3a5080" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </header>

          {/* ── CAROUSEL SECTIONS ── */}
          {SECTIONS.map((section, i) => (
            <CarouselSection key={section.id} section={section} index={i} />
          ))}

          {/* ── FOOTER ── */}
          <footer
            className="flex items-center justify-between py-10"
            style={{ borderTop: "1px solid rgba(26,111,255,0.06)" }}
          >
            <span className="text-[10px] tracking-[0.07em]" style={{ fontFamily: "'DM Mono', monospace", color: "#263a5a" }}>
              © 2025 Sony Interactive Entertainment LLC
            </span>
            <span className="text-[10px] tracking-[0.07em]" style={{ fontFamily: "'DM Mono', monospace", color: "#263a5a" }}>
              PlayStation® is a registered trademark
            </span>
          </footer>

        </div>
      </div>
    </div>
  );
}
