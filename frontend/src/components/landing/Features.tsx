import React from "react";
import { 
  Zap, 
  Users, 
  MessageSquare, 
  Database, 
  Cpu, 
  Globe, 
  ShieldCheck 
} from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";

const features = [
  {
    title: "Real-time Synchronization",
    description: "Operational Transformation algorithms ensure conflicts are resolved instantly across all connected clients.",
    icon: Zap,
    className: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Room-based Collaboration",
    description: "Create private rooms for your team. Granular permissions and secure access control baked in.",
    icon: Users,
    className: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Integrated Chat System",
    description: "Discuss code without leaving the editor. Context-aware messages and file linking support.",
    icon: MessageSquare,
    className: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Enterprise Grade Backend",
    description: "Built on Spring Boot and MySQL. Scalable architecture ready for thousands of concurrent connections.",
    icon: Database,
    className: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Low Latency execution",
    description: "Global edge network ensures your keystrokes are transmitted in milliseconds.",
    icon: Cpu,
    className: "col-span-1 md:col-span-3 lg:col-span-1",
  },
    {
    title: "Cross-Platform",
    description: "Works seamlessly on any device with a modern browser.",
    icon: Globe,
    className: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Secure by Design",
    description: "End-to-end encryption for all code sessions.",
    icon: ShieldCheck,
    className: "col-span-1 md:col-span-1 lg:col-span-1",
  },
];

import { motion } from "framer-motion";

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-24 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Everything you need to <br/>
            <span className="text-indigo-500">ship faster.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-neutral-400"
          >
            A comprehensive suite of tools designed for modern development teams.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={feature.className}
            >
              <SpotlightCard className="p-8 h-full">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-indigo-500/10 p-3 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {feature.description}
                    </p>
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
