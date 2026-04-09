import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { NeuralNetwork } from './NeuralNetwork';

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-black px-6 w-full">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden h-[75vh] md:h-[80vh] w-full"
        >
          <NeuralNetwork className="absolute inset-0 w-full h-full bg-white" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 md:p-8 max-w-md shadow-xl">
              <div className="text-slate-500 text-xs tracking-widest uppercase mb-3 font-semibold">
                OUR APPROACH
              </div>
              <p className="text-slate-800 text-sm md:text-base leading-relaxed">
                We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-900 hover:bg-slate-800 rounded-full px-8 py-3 text-white text-sm font-medium self-start md:self-auto shadow-lg transition-colors"
            >
              Explore more
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
