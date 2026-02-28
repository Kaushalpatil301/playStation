// PlayStationPage.jsx
// Drop this into any React + Tailwind project (Vite / CRA / Next.js)
// Make sure tailwind.config.js has content: ['./src/**/*.{js,jsx}']

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "games",
    num: "01",
    label: "Games",
    items: [
      {
        id: 1,
        name: "Marvel's Spider-Man 2",
        desc: "Swing through an expanded New York City",
        tag: "Action / Adventure",
        price: "$69.99",
        img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80",
      },
      {
        id: 2,
        name: "God of War Ragnarök",
        desc: "The epic Norse saga reaches its conclusion",
        tag: "Action / RPG",
        price: "$59.99",
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
      },
      {
        id: 3,
        name: "Horizon Forbidden West",
        desc: "Explore a lush post-apocalyptic frontier",
        tag: "Open World",
        price: "$49.99",
        img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
      },
      {
        id: 4,
        name: "The Last of Us Part I",
        desc: "A landmark of cinematic storytelling rebuilt",
        tag: "Survival / Drama",
        price: "$69.99",
        img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80",
      },
      {
        id: 5,
        name: "Demon's Souls",
        desc: "A brutal rebirth of a genre-defining classic",
        tag: "Action / RPG",
        price: "$39.99",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
      },
      {
        id: 6,
        name: "Returnal",
        desc: "Die. Return. Unravel the mystery.",
        tag: "Roguelike / Shooter",
        price: "$59.99",
        img: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=600&q=80",
      },
    ],
  },
  {
    id: "accessories",
    num: "02",
    label: "Accessories",
    items: [
      {
        id: 7,
        name: "DualSense Controller",
        desc: "Feel every moment with adaptive haptic feedback",
        tag: "Controller",
        price: "$69.99",
        img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
      },
      {
        id: 8,
        name: "Pulse 3D Wireless Headset",
        desc: "Immersive 3D audio built natively for PlayStation",
        tag: "Audio",
        price: "$99.99",
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      },
      {
        id: 9,
        name: "HD Camera",
        desc: "Crystal clear 1080p dual lens broadcast camera",
        tag: "Camera",
        price: "$59.99",
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      },
      {
        id: 10,
        name: "Media Remote",
        desc: "Streamlined control for all your entertainment",
        tag: "Remote",
        price: "$29.99",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      },
      {
        id: 11,
        name: "DualSense Edge",
        desc: "Precision tuning engineered for elite play",
        tag: "Pro Controller",
        price: "$199.99",
        img: "https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=600&q=80",
      },
    ],
  },
  {
    id: "consoles",
    num: "03",
    label: "PlayStation Consoles",
    items: [
      {
        id: 12,
        name: "PlayStation 5",
        desc: "Play has no limits. The future of gaming is here.",
        tag: "Console",
        price: "$499.99",
        img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
      },
      {
        id: 13,
        name: "PS5 Digital Edition",
        desc: "All-digital gaming without the disc drive",
        tag: "Console",
        price: "$399.99",
        img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&q=80",
      },
      {
        id: 14,
        name: "PlayStation VR2",
        desc: "A new generation of VR powered entirely by PS5",
        tag: "VR Headset",
        price: "$549.99",
        img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80",
      },
      {
        id: 15,
        name: "PS5 Slim",
        desc: "Compact redesign with the same full performance",
        tag: "Console",
        price: "$449.99",
        img: "https://images.unsplash.com/photo-1631214500004-0f4c31b5e949?w=600&q=80",
      },
    ],
  },
  {
    id: "subscriptions",
    num: "04",
    label: "Subscriptions",
    items: [
      {
        id: 16,
        name: "PlayStation Plus Essential",
        desc: "Online multiplayer and curated monthly games",
        tag: "Monthly / Annual",
        price: "$9.99/mo",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
      },
      {
        id: 17,
        name: "PlayStation Plus Extra",
        desc: "A vast catalog with hundreds of PS4 & PS5 titles",
        tag: "Monthly / Annual",
        price: "$14.99/mo",
        img: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80",
      },
      {
        id: 18,
        name: "PlayStation Plus Premium",
        desc: "The ultimate PlayStation membership experience",
        tag: "Monthly / Annual",
        price: "$17.99/mo",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
      },
      {
        id: 19,
        name: "PlayStation Now",
        desc: "Stream classic titles from past PlayStation generations",
        tag: "Streaming",
        price: "$9.99/mo",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
      },
    ],
  },
];

/* ─── PRODUCT CARD ──────────────────────────────────────────────────── */
function ProductCard({ item, onSelect }) {
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
      onClick={() => onSelect(item)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 w-64 md:w-75 rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group"
      style={{
        background: hovered
          ? `radial-gradient(ellipse at ${spotlight.x}% ${spotlight.y}%, #091830 0%, #060d1f 65%)`
          : "#060d1f",
        borderColor: hovered
          ? "rgba(26,111,255,0.25)"
          : "rgba(26,111,255,0.08)",
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
          background:
            "linear-gradient(90deg, transparent, rgba(26,111,255,0.5), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: "58%" }}
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,10,40,0.08) 2px, rgba(0,10,40,0.08) 4px)",
          }}
        />
        {/* Gradient fade bottom */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 30%, rgba(6,13,31,0.92) 100%)",
          }}
        />
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
          className="text-[11px] tracking-[0.2em] uppercase font-bold"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "rgba(77,159,255,0.6)",
          }}
        >
          {item.tag}
        </span>
        <h3
          className="mt-2 mb-1.5 text-[18px] font-bold leading-tight tracking-tight"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8f0ff" }}
        >
          {item.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5 font-medium"
          style={{ color: "#3a5080", fontFamily: "'Rajdhani', sans-serif" }}
        >
          {item.desc}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-[14px] font-bold"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "rgba(77,159,255,0.6)",
            }}
          >
            {item.price}
          </span>
          <button
            className="text-[11px] font-bold tracking-[0.12em] uppercase px-4 py-2 rounded-lg border transition-all duration-300"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              borderColor: "rgba(26,111,255,0.2)",
              color: "#3a5080",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,111,255,0.5)";
              e.currentTarget.style.color = "#4d9fff";
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(26,111,255,0.15)";
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
function CarouselSection({ section, index, onSelect }) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
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
    scrollRef.current.scrollLeft =
      scrollLeft.current - (x - startX.current) * 1.2;
  };
  const stopDrag = () => {
    isDragging.current = false;
  };

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
            className="text-[12px] font-bold tracking-[0.22em] uppercase mb-1.5"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: "rgba(26,111,255,0.55)",
            }}
          >
            {section.num} — Collection
          </p>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8f0ff" }}
          >
            {section.label}
          </h2>
          {/* Divider */}
          <div
            className="mt-3.5 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(26,111,255,0.3), rgba(26,111,255,0.05) 55%, transparent)",
            }}
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
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(26,111,255,0.2)";
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
          <ProductCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

/* ─── PRODUCT DETAIL VIEW ───────────────────────────────────────────── */
function ProductDetailView({ product, onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="relative z-20 w-full min-h-screen py-10 fade-up"
      style={{ animation: "fade-up 0.6s ease both" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-14">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#4d9fff] hover:text-[#e8f0ff] transition-colors duration-300 mb-8 tracking-widest text-sm uppercase font-bold"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="text-xl">←</span> Back to Explore
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image Showcase */}
          <div className="relative group">
            <div
              className="absolute inset-0 z-0 blur-[60px] opacity-40 transition-all duration-700 group-hover:opacity-70 group-hover:blur-[80px]"
              style={{
                background: "linear-gradient(45deg, #1a6fff, #4d9fff)",
              }}
            />
            <div className="relative z-10 w-full aspect-square md:aspect-video rounded-3xl overflow-hidden border border-[rgba(26,111,255,0.2)] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060d1f] via-transparent to-transparent opacity-80" />
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="block w-6 h-px"
                style={{ background: "#1a6fff" }}
              />
              <span
                className="text-xs tracking-[0.2em] uppercase font-bold"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#4d9fff",
                }}
              >
                {product.tag}
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#e8f0ff" }}
            >
              {product.name}
            </h1>

            <p
              className="text-lg leading-relaxed mb-6 font-medium"
              style={{ color: "#a5c0e0", fontFamily: "'Rajdhani', sans-serif" }}
            >
              {product.desc}. Experience unparalleled immersion and next-level
              gameplay designed exclusively for PlayStation. Discover what it
              means to play without limits.
            </p>

            {/* AI Recommendation Box */}
            <div className="relative p-5 mb-8 rounded-xl overflow-hidden group border border-[rgba(168,85,247,0.3)] bg-[rgba(168,85,247,0.05)]">
              <div
                className="absolute inset-0 z-0 opacity-20 blur-[30px] transition-all duration-700 group-hover:opacity-40"
                style={{
                  background: "linear-gradient(45deg, #a855f7, #ec4899)",
                }}
              />
              <div className="relative z-10 flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  >
                    <path
                      d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                      fill="#a855f7"
                      stroke="url(#ai-grad)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="ai-grad"
                        x1="2"
                        y1="2"
                        x2="22"
                        y2="22"
                      >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4
                    className="text-[13px] tracking-widest uppercase font-bold mb-1.5 flex items-center gap-2"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      background: "linear-gradient(90deg, #c084fc, #f472b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    AI Buy Suggestion
                  </h4>
                  <p
                    className="text-[15px] leading-relaxed font-medium"
                    style={{
                      color: "#d8b4fe",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    Based on your profile, {product.name} is a 98% match. Our AI
                    highlights its industry-leading performance and seamless
                    integration with your existing PlayStation ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="text-4xl font-bold mb-10 drop-shadow-[0_0_15px_rgba(77,159,255,0.4)]"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "#e8f0ff" }}
            >
              {product.price}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                className="px-8 py-4 text-sm rounded-lg font-bold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto"
                style={{
                  background: "#1a6fff",
                  color: "#e8f0ff",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4d9fff";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(26,111,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1a6fff";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Buy Now
              </button>
              <button
                className="px-8 py-4 text-sm rounded-lg font-bold tracking-widest uppercase border transition-all duration-300 w-full sm:w-auto"
                style={{
                  borderColor: "#1a6fff",
                  color: "#1a6fff",
                  background: "rgba(26,111,255,0.05)",
                  fontFamily: "'Orbitron', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(26,111,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(26,111,255,0.05)";
                }}
              >
                Add to Cart
              </button>
            </div>

            {/* Key Features Mockup */}
            <div className="pt-8 border-t border-[rgba(26,111,255,0.1)]">
              <h4
                className="text-sm tracking-widest uppercase font-bold mb-6"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#6a8cc0",
                }}
              >
                Feature Highlights
              </h4>
              <ul className="space-y-4">
                {[
                  "Next-Gen Immersion",
                  "Ultra-High Speed SSD",
                  "Ray Tracing Supported",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4d9fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span
                      className="font-medium"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: "#e8f0ff",
                        fontSize: "16px",
                      }}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      ref.current.scrollTo({ left: index * width, behavior: "smooth" });
    };
    const iv = setInterval(scroll, 3000);
    return () => clearInterval(iv);
  }, [items]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex whitespace-nowrap overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#030610", fontFamily: "'Rajdhani', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
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
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: -250,
            left: -200,
            background: "radial-gradient(circle, #1a6fff, transparent 70%)",
            filter: "blur(130px)",
            opacity: 0.11,
            animation: "orb-drift 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "30%",
            right: -150,
            background: "radial-gradient(circle, #2563eb, transparent 70%)",
            filter: "blur(130px)",
            opacity: 0.07,
            animation: "orb-drift 22s ease-in-out infinite",
            animationDelay: "-8s",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 450,
            height: 450,
            bottom: "15%",
            left: "38%",
            background: "radial-gradient(circle, #1a6fff, transparent 70%)",
            filter: "blur(130px)",
            opacity: 0.05,
            animation: "orb-drift 22s ease-in-out infinite",
            animationDelay: "-15s",
          }}
        />
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
        <Link to="/" className="flex items-center gap-3 no-underline">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            style={{ filter: "drop-shadow(0 0 8px rgba(77,159,255,0.55))" }}
          >
            <circle
              cx="14"
              cy="14"
              r="12"
              stroke="rgba(77,159,255,0.45)"
              strokeWidth="1"
            />
            <path d="M11 9v10l9-5-9-5z" fill="rgba(77,159,255,0.85)" />
          </svg>
          <span
            className="text-[17px] font-bold tracking-[0.06em] uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "#e8f0ff" }}
          >
            PlayStation
          </span>
        </Link>
        <ul className="hidden md:flex gap-10 list-none">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-[12px] font-bold tracking-[0.14em] uppercase no-underline transition-colors duration-300"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#3a5080",
                }}
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
      {selectedProduct ? (
        <ProductDetailView
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <div className="relative z-10 w-full mb-20">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14">
            {/* ── HERO ── */}
            <header className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mb-16 rounded-xl mt-4">
              {/* background carousel and overlay */}
              <HeroCarousel
                items={SECTIONS.flatMap((s) => s.items).slice(0, 8)}
              />
              <div className="absolute inset-0 bg-black/60 md:bg-black/40" />

              {/* text container */}
              <div className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-14 max-w-7xl mx-auto">
                <div className="hero-eyebrow flex items-center gap-3 mb-4 md:mb-6">
                  <span
                    className="block w-6 md:w-9 h-px"
                    style={{
                      background: "#1a6fff",
                      boxShadow: "0 0 10px #1a6fff",
                    }}
                  />
                  <span
                    className="text-[10px] md:text-[12px] font-bold tracking-[0.2em] md:tracking-[0.28em] uppercase"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: "#4d9fff",
                    }}
                  >
                    Explore Products — 2026
                  </span>
                </div>

                <h1
                  className="hero-title font-extrabold leading-[1] md:leading-[0.93] tracking-[-0.04em] mb-4 md:mb-7 text-4xl md:text-6xl lg:text-[100px]"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: "#e8f0ff",
                    textShadow: "0 0 100px rgba(26,111,255,0.18)",
                  }}
                >
                  The PlayStation
                  <span
                    className="block mt-1 md:mt-2"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(77,159,255,0.4)",
                    }}
                  >
                    Universe.
                  </span>
                </h1>

                <p
                  className="hero-desc text-md md:text-lg leading-[1.6] md:leading-[1.85] font-medium tracking-[0.015em] max-w-2xl mb-6 md:mb-8"
                  style={{
                    color: "#a5c0e0",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  A curated showcase of hardware, software, and services
                  designed for those who play without limits.
                </p>

                {/* call to action buttons */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-14">
                  <button
                    className="px-5 py-2.5 md:px-8 md:py-3 text-xs md:text-sm rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto"
                    style={{
                      background: "#1a6fff",
                      color: "#e8f0ff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#4d9fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#1a6fff";
                    }}
                  >
                    Explore All
                  </button>
                  <button
                    className="px-5 py-2.5 md:px-8 md:py-3 text-xs md:text-sm rounded-lg font-semibold border transition-all duration-300 w-full sm:w-auto"
                    style={{
                      borderColor: "#1a6fff",
                      color: "#1a6fff",
                      background: "transparent",
                      backdropFilter: "blur(4px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#1a6fff";
                      e.currentTarget.style.color = "#e8f0ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#1a6fff";
                    }}
                  >
                    See Recommendations
                  </button>
                </div>

                <div className="hero-stats flex gap-6 md:gap-12 overflow-x-auto pb-4 hide-scrollbar">
                  {[
                    ["460+", "Products"],
                    ["5M+", "Players"],
                    ["4", "Collections"],
                  ].map(([num, label]) => (
                    <div
                      key={label}
                      className="pl-4 md:pl-5 shrink-0"
                      style={{ borderLeft: "1px solid rgba(26,111,255,0.3)" }}
                    >
                      <div
                        className="text-xl md:text-3xl font-extrabold tracking-tight"
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          color: "#e8f0ff",
                        }}
                      >
                        {num}
                      </div>
                      <div
                        className="text-[11px] md:text-[12px] font-bold tracking-[0.16em] uppercase mt-1"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          color: "#6a8cc0",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* ── CAROUSEL SECTIONS ── */}
            {SECTIONS.map((section, i) => (
              <CarouselSection
                key={section.id}
                section={section}
                index={i}
                onSelect={setSelectedProduct}
              />
            ))}

            {/* ── FOOTER ── */}
            <footer
              className="flex flex-col md:flex-row items-center justify-between py-10 gap-4"
              style={{ borderTop: "1px solid rgba(26,111,255,0.06)" }}
            >
              <span
                className="text-[12px] font-bold tracking-[0.07em] text-center"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#263a5a",
                }}
              >
                © 2026 Sony Interactive Entertainment LLC
              </span>
              <span
                className="text-[12px] font-bold tracking-[0.07em] text-center"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "#263a5a",
                }}
              >
                PlayStation® is a registered trademark
              </span>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
