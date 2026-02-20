import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import React from "react";


type Theme = "light" | "dark";

const smoothScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Creative CC Logo Component
function CCLogo({ theme }: { theme: Theme }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-11 h-11 cursor-pointer"
    >
      <motion.div
        className={`absolute inset-0 rounded-xl ${
          theme === "dark" ? "bg-white" : "bg-black"
        }`}
        whileHover={{ rotate: 6 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`absolute inset-0 rounded-xl flex items-center justify-center ${
          theme === "dark" ? "bg-white" : "bg-black"
        }`}
        whileHover={{ rotate: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <span
            className={`text-lg font-black tracking-tighter ${
              theme === "dark" ? "text-black" : "text-white"
            }`}
          >
            {"</>"}
          </span>
        </div>
      </motion.div>
      {/* minimal logo: no accent dot */}
    </motion.div>
  );
}

// Navbar Component
function Navbar({
  theme,
  toggleTheme,
  isThemeChanging,
}: {
  theme: Theme;
  toggleTheme: () => void;
  isThemeChanging: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Features", "About", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-white/80 backdrop-blur-xl border-b border-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={scrollToTop}
          aria-label="Go to top"
          className="flex items-center gap-3 cursor-pointer group"
        >
          <CCLogo theme={theme} />
          <span
            className={`text-xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            CodeCollab
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8" role="menubar" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => smoothScrollTo(item.toLowerCase())}
              className={`text-sm font-medium transition-all cursor-pointer relative group ${
                theme === "dark"
                  ? "text-white/70 hover:text-white"
                  : "text-black/70 hover:text-black"
              }`}
              role="menuitem"
              aria-label={`Go to ${item}`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all group-hover:w-full`}
              />
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4">
          <button
            className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* end mobile button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            disabled={isThemeChanging}
            transition={{ duration: 0.3 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/5 hover:bg-black/10 text-black"
            }`}
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => smoothScrollTo("contact")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              theme === "dark"
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
            aria-label="Get started"
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute left-0 right-0 top-full z-40 transition-transform origin-top ${
          mobileOpen ? "scale-y-100" : "scale-y-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className={`mx-4 my-2 rounded-xl p-4 ${theme === "dark" ? "bg-zinc-900/95" : "bg-white/95"} shadow-lg`}> 
          <nav className="flex flex-col gap-3" role="menu">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  smoothScrollTo(item.toLowerCase());
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  theme === "dark" ? "text-white/90 hover:bg-white/5" : "text-black/80 hover:bg-black/5"
                }`}
                role="menuitem"
                aria-label={`Go to ${item}`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                smoothScrollTo("contact");
                setMobileOpen(false);
              }}
              className={`mt-2 px-3 py-2 rounded-md font-medium ${
                theme === "dark" ? "bg-white text-black" : "bg-black text-white"
              }`}
              aria-label="Get started"
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </motion.nav>
  );
}

// Old CodeEditor3D component removed - using Hero3DWindow now

// Big 3D Window Component for Hero
function Hero3DWindow({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="mt-12 w-full max-w-5xl mx-auto"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        animate={{
          // increased sensitivity for stronger tilt on hover
          rotateX: isHovered ? -mousePos.y * 14 : 0,
          rotateY: isHovered ? mousePos.x * 14 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div
          className={`relative rounded-2xl overflow-hidden transition-colors duration-300 ${
            theme === "dark" ? "bg-zinc-900 border border-white/6" : "bg-white border border-black/6"
          }`}
          style={{
            boxShadow:
              theme === "dark"
                ? "0 30px 80px -30px rgba(0,0,0,0.6)"
                : "0 28px 60px -20px rgba(16,24,40,0.08)",
          }}
        >
          <div className={`flex items-center gap-3 px-6 py-4 ${theme === "dark" ? "bg-zinc-800/60" : "bg-zinc-100/60"}`}>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>collab.tsx</div>
          </div>

          <div className="p-8 font-mono text-sm md:text-base space-y-3">
            {/* Minimal highlighted React code sample — each line slightly offset in Z for depth */}
            {[
              <div key={0} className={`py-1`} style={{ transform: `translateZ(48px)` }}>
                <span className={theme === "dark" ? "text-violet-300" : "text-violet-600"}>import</span>
                <span className={`ml-2 ${theme === "dark" ? "text-amber-300" : "text-amber-600"}`}>React</span>
                <span className={`ml-2 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>from</span>
                <span className={`ml-2 ${theme === "dark" ? "text-emerald-300" : "text-emerald-600"}`}>'react'</span>
              </div>,
              <div key={1} className={`py-1`} style={{ transform: `translateZ(36px)` }}>
                <span className={theme === "dark" ? "text-violet-300" : "text-violet-600"}>const</span>
                <span className={`ml-2 ${theme === "dark" ? "text-cyan-300" : "text-cyan-600"}`}>Editor</span>
                <span className={`ml-2 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>=</span>
                <span className={`ml-2 ${theme === "dark" ? "text-amber-300" : "text-amber-600"}`}>&lt;div&gt;</span>
              </div>,
              <div key={2} className={`py-1`} style={{ transform: `translateZ(28px)` }}>
                <span className={theme === "dark" ? "text-zinc-400" : "text-zinc-500"}>  {/* example code */}</span>
              </div>,
              <div key={3} className={`py-1`} style={{ transform: `translateZ(20px)` }}>
                <span className={theme === "dark" ? "text-emerald-300" : "text-emerald-600"}>&lt;/div&gt;</span>
              </div>,
              <div key={4} className={`py-1`} style={{ transform: `translateZ(12px)` }}>
                <span className={theme === "dark" ? "text-zinc-500" : "text-zinc-400"}>export default Editor;</span>
              </div>,
            ]}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CodeLine2({
  num,
  children,
  theme,
  indent,
}: {
  num: number;
  children: React.ReactNode;
  theme: Theme;
  indent?: boolean;
}) {
  return (
    <div className="flex hover:bg-white/5 -mx-2 px-2 rounded">
      <span className={`w-8 mr-6 text-right select-none ${theme === "dark" ? "text-zinc-600" : "text-zinc-400"}`}>
        {num}
      </span>
      <span className={indent ? "pl-8" : ""}>{children}</span>
    </div>
  );
}

// Hero Section
function HeroSection({ theme }: { theme: Theme }) {
  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Code together
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              .
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`text-2xl md:text-3xl lg:text-4xl font-medium ${
              theme === "dark" ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Build faster.
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`mt-8 text-lg md:text-xl max-w-lg mx-auto leading-relaxed ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Real-time collaborative code editor for teams who ship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow:
                theme === "dark"
                  ? "0 0 40px rgba(139, 92, 246, 0.3)"
                  : "0 15px 40px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-4 rounded-full text-base font-medium transition-all ${
              theme === "dark"
                ? "bg-white text-black hover:bg-white/95"
                : "bg-black text-white hover:bg-black/95"
            }`}
          >
            Get Started
          </motion.button>
        </motion.div>

        <Hero3DWindow theme={theme} />
      </div>
    </section>
  );
}

// Minimal Feature Card — accessible, flat, and animated
function FeatureCard({
  feature,
  theme,
  index,
}: {
  feature: { icon: string; title: string; description: string; detail?: string };
  theme: Theme;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  return (
    <motion.div
      role="listitem"
      tabIndex={0}
      onKeyDown={handleKey}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl p-6 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 group ${
        theme === "dark" ? "bg-zinc-900 border border-white/6 shadow-lg" : "bg-white border border-black/6 shadow-sm"
      }`}
      onClick={() => setOpen((v) => !v)}
    >
      {/* shiny hover overlay */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: theme === "dark" ? "linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06))" : "linear-gradient(120deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15))",
          mixBlendMode: theme === "dark" ? "overlay" : "normal",
        }}
      />
        <div className="flex items-start gap-4">
        <div className="text-2xl text-current opacity-90" aria-hidden>
          {feature.icon}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
            {feature.title}
          </h3>
          <p className={`mt-2 text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            {feature.description}
          </p>
          <div
            aria-hidden={!open}
            className={`mt-3 text-sm text-zinc-500 transition-max-h overflow-hidden ${open ? "max-h-40" : "max-h-0"}`}
          >
            {feature.detail}
          </div>
        </div>
      </div>
      <button
        aria-expanded={open}
        aria-controls={`feature-detail-${index}`}
        className={`mt-4 text-sm font-medium underline opacity-80 ${theme === "dark" ? "text-zinc-300" : "text-zinc-600"}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        {open ? "Hide" : "Learn more"}
      </button>
    </motion.div>
  );
}

// Features Section
export function FeaturesSection({ theme }: { theme: Theme }) {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: "Zero Latency",
      description: "Keystrokes sync instantly across collaborators.",
      detail: "Optimized socket transport and delta updates ensure near-instant sync even on high-latency networks.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: "Live Presence",
      description: "See cursors, selections and who's editing in real time.",
      detail: "Color-coded cursors, avatars, and activity indicators help teams avoid conflicts and stay in flow.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: "End-to-end Encryption",
      description: "Your code stays private — encrypted in transit and at rest.",
      detail: "We use modern cryptography for workspace-level keys; you retain control of access and retention policies.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M12 2v6" />
          <path d="M5 7l7 7 7-7" />
        </svg>
      ),
      title: "Context Assist",
      description: "Helpful, context-aware suggestions for faster development.",
      detail: "Suggestions respect your codebase and style, and run locally or on secure infra as configured.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      ),
      title: "One-click Deploy",
      description: "Deploy from the editor without context switching.",
      detail: "CI integrations make shipping a single action; preview URLs and rollbacks are first-class.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M10 14a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M21 12a9 9 0 10-18 0" />
        </svg>
      ),
      title: "Integrations",
      description: "Connect GitHub, CI, and favorite tools.",
      detail: "Webhooks, OAuth, and native plugins keep your existing workflows intact.",
    },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <section id="features" className={`py-20 md:py-28 px-6 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Ship together
          </h2>
          <p className={`text-lg md:text-xl ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
            Everything your team needs to build confidently.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} theme={theme} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// 3D Interactive Cube for About Section
function Interactive3DCube({ theme }: { theme: Theme }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging || !autoRotate) return;
    const interval = setInterval(() => {
      setRotateY(prev => prev + 0.5);
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging, autoRotate]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setRotateY(prev => prev + deltaX * 0.5);
    setRotateX(prev => prev - deltaY * 0.5);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex justify-center py-12 select-none"
      style={{ perspective: "1000px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-grab active:cursor-grabbing"
      >
        {/* Front Face */}
        <div
          className={`absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 ${
            theme === "dark"
              ? "bg-gradient-to-br from-violet-600 to-fuchsia-600"
              : "bg-gradient-to-br from-violet-500 to-fuchsia-500"
          }`}
          style={{ transform: "translateZ(128px)" }}
        >
          <span className="text-6xl mb-4">🚀</span>
          <span className="text-white font-bold text-xl text-center">
            Collaboration First
          </span>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-500 to-blue-600"
          style={{ transform: "rotateY(180deg) translateZ(128px)" }}
        >
          <span className="text-6xl mb-4">💡</span>
          <span className="text-white font-bold text-xl text-center">
            Ideas Flow Free
          </span>
        </div>

        {/* Left Face */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-green-600"
          style={{
            transform: "rotateY(-90deg) translateZ(128px)",
            width: "256px",
          }}
        >
          <span className="text-6xl mb-4">⚡</span>
          <span className="text-white font-bold text-xl text-center">
            Ship Faster
          </span>
        </div>

        {/* Right Face */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-500 to-orange-600"
          style={{
            transform: "rotateY(90deg) translateZ(128px)",
            width: "256px",
          }}
        >
          <span className="text-6xl mb-4">🎯</span>
          <span className="text-white font-bold text-xl text-center">
            Stay Focused
          </span>
        </div>

        {/* Top Face */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-pink-600"
          style={{
            transform: "rotateX(90deg) translateZ(128px)",
            height: "256px",
          }}
        >
          <span className="text-6xl mb-4">✨</span>
          <span className="text-white font-bold text-xl text-center">
            Create Magic
          </span>
        </div>

        {/* Bottom Face */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600"
          style={{
            transform: "rotateX(-90deg) translateZ(128px)",
            height: "256px",
          }}
        >
          <span className="text-6xl mb-4">🔥</span>
          <span className="text-white font-bold text-xl text-center">
            Stay Hot
          </span>
        </div>

        {/* Floating particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute -top-8 -right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl shadow-lg"
          style={{ transform: "translateZ(180px)" }}
        >
          ⭐
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute -bottom-6 -left-6 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-xl shadow-lg"
          style={{ transform: "translateZ(150px)" }}
        >
          💜
        </motion.div>
      </motion.div>
    </div>
  );
}

// About Section
function AboutSection({ theme }: { theme: Theme }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className={`py-24 md:py-32 px-6 ${
        theme === "dark" ? "bg-zinc-950" : "bg-zinc-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Why CodeCollab?
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-zinc-500" : "text-zinc-500"
            }`}
          >
            Because great software is built together, not alone.
          </p>
        </motion.div>

        <Interactive3DCube theme={theme} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-center text-lg max-w-xl mx-auto ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Hover over the cube to explore what makes us different.
        </motion.p>
      </div>
    </section>
  );
}

// CTA Section
function CTASection({ theme }: { theme: Theme }) {
  return (
    <section
      id="contact"
      className={`py-24 md:py-32 px-6 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2
          className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Ready to build
          <br />
          something great?
        </h2>
        <p
          className={`text-xl mb-12 ${
            theme === "dark" ? "text-zinc-500" : "text-zinc-500"
          }`}
        >
          Join the future of collaborative coding.
        </p>
        <motion.button
          whileHover={{
            scale: 1.03,
            boxShadow:
              theme === "dark"
                ? "0 0 60px rgba(139, 92, 246, 0.5)"
                : "0 25px 60px rgba(0, 0, 0, 0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          className={`px-12 py-6 rounded-full text-xl font-semibold transition-all ${
            theme === "dark"
              ? "bg-white text-black hover:bg-white/95"
              : "bg-black text-white hover:bg-black/95"
          }`}
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}

// Footer
function Footer({ theme }: { theme: Theme }) {
  return (
    <footer
      className={`py-12 px-6 border-t ${
        theme === "dark"
          ? "bg-black border-white/5"
          : "bg-white border-black/5"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer"
          >
            <CCLogo theme={theme} />
            <span
              className={`font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              CodeCollab
            </span>
          </button>

          <p
            className={`text-sm ${
              theme === "dark" ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            © 2024 CodeCollab. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Theme Transition Overlay
function ThemeTransitionOverlay({
  isAnimating,
  targetTheme,
  onAnimationComplete,
}: {
  isAnimating: boolean;
  targetTheme: Theme;
  onAnimationComplete: () => void;
}) {
  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ clipPath: "circle(0% at calc(100% - 56px) 36px)", opacity: 0.18 }}
          animate={{ clipPath: "circle(150% at calc(100% - 56px) 36px)", opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onAnimationComplete}
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: targetTheme === 'dark' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)'
          }}
        />
      )}
    </AnimatePresence>
  );
}

// Main App
export function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetTheme, setTargetTheme] = useState<Theme>("dark");

    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);


  const toggleTheme = () => {
    if (isAnimating) return;
    const newTheme = theme === "dark" ? "light" : "dark";
    // apply the theme immediately, keep the transition overlay animation
    setTargetTheme(newTheme);
    setTheme(newTheme);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setTheme(targetTheme);
    setTimeout(() => {
      setIsAnimating(false);
    }, 100);
  };


  return (
    <div
      className={`min-h-screen transition-colors duration-100 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <ThemeTransitionOverlay
        isAnimating={isAnimating}
        targetTheme={targetTheme}
        onAnimationComplete={handleAnimationComplete}
      />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isThemeChanging={isAnimating}
      />
      <HeroSection theme={theme} />
      <FeaturesSection theme={theme} />
      <AboutSection theme={theme} />
      <CTASection theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}
