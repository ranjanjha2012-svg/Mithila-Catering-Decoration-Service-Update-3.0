import React, { useState } from 'react';
import { Menu, X, ChefHat, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 px-2 md:px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3 md:gap-4">
        <a href="/" onClick={scrollToTop} className="flex items-center gap-3 md:gap-4">
          <img 
            src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
            alt="Mithila Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="text-left cursor-pointer group">
            <div className="text-sm md:text-xl font-serif font-bold text-gray-900 leading-tight group-hover:text-gold transition-colors">Mithila Catering &</div>
            <div className="text-sm md:text-xl font-serif font-bold text-gray-900 leading-tight group-hover:text-gold transition-colors">Decoration Service</div>
          </div>
        </a>
      </div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-bold text-gray-600">
        <a href="#home" className="hover:text-gold transition-colors">Home</a>
        <a href="#services" className="hover:text-gold transition-colors">Services</a>
        <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
        <a href="#enquiry" className="hover:text-gold transition-colors">Enquiry</a>
        <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
        <a 
          href="#tiffin"
          className="hover:text-gold transition-colors flex items-center gap-2"
        >
          <ChefHat className="w-4 h-4 text-gold" />
          Tiffin
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <img 
                  src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
                  alt="Mithila Logo" 
                  className="h-12 w-12 object-contain rounded-full border border-gold/30"
                  referrerPolicy="no-referrer"
                />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-xl font-serif font-bold text-gray-900">
                <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors flex items-center gap-3 py-2 border-b border-gray-100">
                  Home
                </a>
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors flex items-center gap-3 py-2 border-b border-gray-100">
                  Services
                </a>
                <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors flex items-center gap-3 py-2 border-b border-gray-100">
                  Gallery
                </a>
                <a href="#enquiry" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors flex items-center gap-3 py-2 border-b border-gray-100">
                  Enquiry
                </a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold transition-colors flex items-center gap-3 py-2 border-b border-gray-100">
                  Contact
                </a>
                <a 
                  href="#tiffin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-gold transition-colors flex items-center gap-3 text-left py-2 border-b border-gray-100"
                >
                  Tiffin Service
                </a>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Contact Us</p>
                <div className="flex flex-col gap-4 text-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
                      <p className="font-bold">+91 9650254164</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Email</p>
                      <p className="font-bold text-sm">mithilacateringservices@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
