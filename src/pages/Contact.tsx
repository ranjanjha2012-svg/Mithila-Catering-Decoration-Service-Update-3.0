import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20 px-2 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6">Contact <span className="gold-gradient italic">Us</span></h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto">We're here to help you plan your next big event. Reach out to us via any of the channels below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 rounded-[3rem] border-gold/20"
          >
            <h3 className="text-3xl font-serif font-bold mb-8">Get in Touch</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Call Us</p>
                  <p className="text-2xl font-bold text-white">+91 9650254164</p>
                  <p className="text-white/60">Available 24/7 for support</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email Us</p>
                  <p className="text-xl font-bold text-white">mithilacateringservices@gmail.com</p>
                  <p className="text-white/60">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Our Location</p>
                  <p className="text-xl font-bold text-white">Delhi, Noida, Faridabad & Pan India</p>
                  <p className="text-white/60">Serving across major cities in India</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Working Hours</p>
                  <p className="text-xl font-bold text-white">Mon - Sun: 24 Hours</p>
                  <p className="text-white/60">Always ready to serve you</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-6">Follow Our Journey</p>
              <div className="flex gap-6">
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 hover:bg-gold hover:text-black transition-all">
                  <Instagram className="w-7 h-7" />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 hover:bg-gold hover:text-black transition-all">
                  <Facebook className="w-7 h-7" />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 hover:bg-gold hover:text-black transition-all">
                  <Youtube className="w-7 h-7" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-full min-h-[500px] rounded-[3rem] overflow-hidden border border-white/10 relative group"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562064611597!2d77.22732107550004!3d28.61393907567493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1710645000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 pointer-events-none border-[20px] border-dark-bg/20" />
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2"
          >
            Open in Google Maps <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
