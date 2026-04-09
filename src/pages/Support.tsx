import { motion } from 'motion/react';

export default function Support() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-12"
        >
          Support
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-white/70 mb-6">Need help with your account or have a question about our services? Our team is here to help.</p>
            <a href="mailto:support@hemlo.com" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
              Email Support
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <p className="text-white/70 mb-6">Find quick answers to common questions about Hemlo's features, pricing, and capabilities.</p>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
              View FAQ
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
