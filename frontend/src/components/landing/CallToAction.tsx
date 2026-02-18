import React from "react";
import { ArrowRight } from "lucide-react";

export const CallToAction: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-32">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Ready to code <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">in real-time?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
          Join thousands of developers who are already building the future with CodeCollab. 
          Start your free trial today.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/editor" className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-neutral-200">
            <span>Start Coding for Free</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
           <button className="text-neutral-400 hover:text-white font-medium transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};
