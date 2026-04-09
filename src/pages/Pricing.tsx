import { motion } from 'motion/react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
        >
          Simple Pricing
        </motion.h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {['Starter', 'Pro', 'Enterprise'].map((tier, i) => (
            <motion.div 
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border ${i === 1 ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white'}`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier}</h3>
              <div className="text-4xl font-bold mb-6">${(i + 1) * 29}<span className="text-lg font-normal opacity-60">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {[1, 2, 3, 4].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-sm">Core feature {feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-medium transition-transform active:scale-95 ${i === 1 ? 'bg-black text-white' : 'bg-white text-black'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
