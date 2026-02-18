import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Terminal } from "lucide-react";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[120vh] flex-col items-center justify-start overflow-hidden bg-neutral-950 pt-32 text-white"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 top-0 h-[600px] w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-950 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          v2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl bg-gradient-to-br from-white via-white to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl"
        >
          Code Together, <br />
          <span className="text-indigo-500">Real-Time</span> Forever.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl"
        >
          Experience the future of collaborative development. Zero latency.
          Room-based sessions. Integrated chat. Powered by WebSocket mastery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a href="/editor" className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-indigo-600 px-8 py-4 font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]">
            <div className="absolute inset-0 bg-white/20 translate-y-full skew-y-12 transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative">Start Coding Now</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-neutral-800">
            <Terminal className="h-4 w-4 text-neutral-400" />
            <span>View Documentation</span>
          </button>
        </motion.div>
      </div>

      {/* 3D Code Editor Visual */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          y: translateY,
          opacity,
          perspective: 1000,
        }}
        className="relative mt-20 w-full max-w-5xl px-4"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-indigo-500/20">
          {/* Editor Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/20" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                <div className="h-3 w-3 rounded-full bg-green-500/20" />
              </div>
              <div className="ml-4 flex items-center gap-2 rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-400">
                <Code2 className="h-3 w-3" />
                App.tsx
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-neutral-900 bg-indigo-500/20 text-[10px] flex items-center justify-center text-indigo-300"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <span className="flex h-2 w-2">
                 <span className="animate-pulse inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              </span>
            </div>
          </div>

          {/* Editor Content */}
          <div className="grid grid-cols-[auto_1fr] p-4 font-mono text-sm leading-6">
            <div className="select-none pr-4 text-right text-neutral-700">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="text-neutral-300">
              <div>
                <span className="text-pink-500">import</span>{" "}
                <span className="text-cyan-400">React</span>{" "}
                <span className="text-pink-500">from</span>{" "}
                <span className="text-green-400">'react'</span>;
              </div>
              <div className="mt-2">
                <span className="text-purple-400">const</span>{" "}
                <span className="text-yellow-300">CollabEditor</span>{" "}
                <span className="text-pink-500">=</span> () <span className="text-pink-500">=&gt;</span> {"{"}
              </div>
              <div className="pl-4">
                <span className="text-purple-400">const</span> [code, setCode] ={" "}
                <span className="text-cyan-400">useState</span>(
                <span className="text-green-400">""</span>);
              </div>
              <div className="pl-4 mt-2">
                <span className="text-neutral-500">// Real-time sync enabled</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">useWebSocket</span>((msg) <span className="text-pink-500">=&gt;</span> {"{"}
              </div>
              <div className="pl-8">
                 <span className="text-cyan-400">handleUpdate</span>(msg);
              </div>
              <div className="pl-4">
                {"}"});
              </div>
              <div className="pl-4 mt-2">
                <span className="text-pink-500">return</span> (
              </div>
              <div className="pl-8">
                &lt;<span className="text-yellow-300">Editor</span>
              </div>
              <div className="pl-12">
                 <span className="text-cyan-400">value</span>={"{code}"}
              </div>
              <div className="pl-12">
                 <span className="text-cyan-400">onChange</span>={"{handleChange}"}
              </div>
              <div className="pl-8">
                /&gt;
              </div>
              <div className="pl-4">
                );
              </div>
              <div>{"}"}</div>
            </div>
          </div>
          
          {/* Floating Cursor effect */}
           <motion.div 
             animate={{ opacity: [1, 0, 1] }}
             transition={{ duration: 0.8, repeat: Infinity }}
             className="absolute left-[240px] top-[148px] h-5 w-0.5 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"
           />
           
           <div className="absolute right-10 bottom-10 rounded-lg bg-neutral-800/90 p-3 backdrop-blur border border-neutral-700 shadow-xl">
             <div className="flex items-center gap-2 text-xs text-neutral-300 mb-1">
               <span className="font-bold text-indigo-400">User 2</span>
               <span>typing...</span>
             </div>
             <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-700">
               <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/2 bg-indigo-500"
               />
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
