import React from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "Spring Boot", color: "text-green-500" },
  { name: "React", color: "text-cyan-400" },
  { name: "MySQL", color: "text-blue-400" },
  { name: "Redis", color: "text-red-500" },
  { name: "WebSockets", color: "text-white" },
  { name: "TypeScript", color: "text-blue-500" },
  { name: "Tailwind CSS", color: "text-cyan-300" },
  { name: "Vite", color: "text-purple-400" },
  { name: "Docker", color: "text-blue-600" },
  { name: "Kubernetes", color: "text-blue-500" },
];

const MarqueeRow: React.FC<{ items: typeof techStack; direction: "left" | "right" }> = ({ items, direction }) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex gap-16 py-8"
            >
                {[...items, ...items, ...items].map((tech, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <span className={`text-4xl font-bold ${tech.color} opacity-80 hover:opacity-100 transition-opacity`}>
                            {tech.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export const TechStack: React.FC = () => {
  const row1 = techStack.slice(0, 5);
  const row2 = techStack.slice(5, 10);

  return (
    <section id="tech-stack" className="py-24 bg-neutral-900 border-y border-neutral-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white sm:text-4xl"
        >
          Powered by Modern Tech
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-neutral-400"
        >
          Built on a rock-solid foundation for maximum performance and scalability.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col gap-8"
      >
         <MarqueeRow items={row1} direction="left" />
         <MarqueeRow items={row2} direction="right" />
      </motion.div>
    </section>
  );
};
