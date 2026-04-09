import { motion } from 'motion/react';

export default function Vision() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-12"
        >
          Our Vision
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <p className="text-2xl text-white/80 leading-relaxed mb-8">
            We are building the foundational layer for the next generation of human-computer interaction. Our goal is to make advanced AI systems accessible, intuitive, and deeply integrated into everyday workflows.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Problem</h3>
              <p className="text-white/60 leading-relaxed">
                Current systems are fragmented and require users to adapt to the machine. The cognitive load of managing multiple tools and contexts prevents true creative flow.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">The Solution</h3>
              <p className="text-white/60 leading-relaxed">
                A unified, context-aware environment that anticipates needs and acts as a true collaborative partner, not just a tool.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
