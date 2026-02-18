import React from "react";
import { SpotlightCard } from "../ui/SpotlightCard";

const testimonials = [
  {
    content: "CodeCollab has completely transformed how our remote team works. The real-time sync is indistinguishable from local editing.",
    author: "Sarah Chen",
    role: "Senior Engineer at Vercel",
    avatar: "SC"
  },
  {
    content: "The WebSocket implementation is flawless. We've had 50+ developers in a single room with zero lag. Incredible engineering.",
    author: "Alex Rivera",
    role: "CTO at TechFlow",
    avatar: "AR"
  },
  {
    content: "Finally, a collaborative editor that doesn't feel clunky. The UI is beautiful and the experience is buttery smooth.",
    author: "Jordan Smith",
    role: "Frontend Lead at Stripe",
    avatar: "JS"
  },
  {
    content: "I use this for all my technical interviews now. The syntax highlighting and multi-language support are top-notch.",
    author: "Emily Davis",
    role: "Hiring Manager at Google",
    avatar: "ED"
  },
  {
    content: "It's like Google Docs for code, but actually good. The conflict resolution is magic.",
    author: "Michael Brown",
    role: "DevOps Engineer at AWS",
    avatar: "MB"
  },
  {
    content: "The chat integration is a game changer. Context switching is a thing of the past.",
    author: "Lisa Wang",
    role: "Full Stack Dev at Netflix",
    avatar: "LW"
  }
];

import { motion } from "framer-motion";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Loved by developers <br/>
            <span className="text-indigo-500">everywhere.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="p-8 h-full flex flex-col justify-between border-neutral-800 bg-neutral-900/40">
                <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
