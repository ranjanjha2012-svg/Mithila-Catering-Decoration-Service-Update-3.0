import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { services } from '../constants/data';

export default function Services() {
  return (
    <div className="pt-32 pb-20 px-2 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6">Our <span className="gold-gradient italic">Services</span></h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto">From intimate gatherings to grand celebrations, we provide premium catering and decoration services tailored to your needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative h-[450px] rounded-[3rem] overflow-hidden border border-white/10 glass-card"
          >
            <img 
              src={service.image} 
              alt={service.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="w-14 h-14 rounded-2xl bg-gold/20 backdrop-blur-md flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-3">{service.name}</h3>
              <p className="text-white/60 mb-8 line-clamp-2">{service.desc}</p>
              <a 
                href="/enquiry"
                className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-sm group/btn"
              >
                Enquire Now <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
