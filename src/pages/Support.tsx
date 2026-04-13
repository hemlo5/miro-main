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
          Support & FAQ
        </motion.h1>
        
        <div className="grid md:grid-cols-1 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-white/70 mb-6">Need help with your account, API access, or enterprise deployment? Our technical team is here to assist.</p>
            <a href="mailto:hello@hemlo.ai" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
              Email Support
            </a>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2">How is the probability score calculated?</h3>
              <p className="text-white/60 leading-relaxed">
                Hemlo uses the Mirofish engine to spawn distinct AI agents (Generators and Critics). They perform independent analysis and debate each other over multiple rounds. The final probability is derived from the weighted consensus of these agents after filtering out factual hallucinations.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2">What data powers the Live Feed?</h3>
              <p className="text-white/60 leading-relaxed">
                We ingest high-frequency data streams including global news APIs, Polymarket live order books, and real-time social sentiment data to inform both our feed and our simulation context windows.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2">What does 'Divergence' mean?</h3>
              <p className="text-white/60 leading-relaxed">
                Divergence is the percentage point difference between the current live betting market odds (e.g., Polymarket) and Hemlo's simulated AI probability. A high positive divergence indicates that the AI believes the event is much more likely to happen than the market currently prices it.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2">What are the simulation limits?</h3>
              <p className="text-white/60 leading-relaxed">
                Because running parallel agent networks is highly compute-intensive, accounts on the Free plan are limited to 2 custom simulations per day. Pro users have priority compute access and a limit of 10 daily simulations lengthier context rounds.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
