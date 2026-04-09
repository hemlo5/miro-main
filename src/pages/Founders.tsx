import { motion } from 'motion/react';

export default function Founders() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
        >
          The Team
        </motion.h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Alex Rivera', role: 'CEO & Co-founder', img: 'https://i.pravatar.cc/300?img=11' },
            { name: 'Sam Chen', role: 'CTO & Co-founder', img: 'https://i.pravatar.cc/300?img=12' },
            { name: 'Jordan Lee', role: 'Head of Design', img: 'https://i.pravatar.cc/300?img=33' },
            { name: 'Taylor Swift', role: 'Lead Engineer', img: 'https://i.pravatar.cc/300?img=44' },
          ].map((person, i) => (
            <motion.div 
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1">{person.name}</h3>
              <p className="text-white/50 text-sm">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
