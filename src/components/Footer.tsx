import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10 px-2 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
              alt="Mithila Logo" 
              className="h-16 w-16 object-contain rounded-full border border-gold/30"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <div className="text-2xl font-serif font-bold text-gray-900 leading-tight">Mithila Catering &</div>
              <div className="text-2xl font-serif font-bold text-gray-900 leading-tight">Decoration Service</div>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mb-8">
            Crafting unforgettable moments since 2021. From grand weddings to intimate gatherings, we bring authentic flavors and elegant decorations to your doorstep.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-all">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-all">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-all">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-gray-900 font-bold uppercase tracking-widest text-sm mb-8">Quick Links</h4>
          <ul className="space-y-4 text-gray-600">
            <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
            <li><a href="/services" className="hover:text-gold transition-colors">Services</a></li>
            <li><a href="/gallery" className="hover:text-gold transition-colors">Gallery</a></li>
            <li><a href="/enquiry" className="hover:text-gold transition-colors">Enquiry</a></li>
            <li><a href="/contact" className="hover:text-gold transition-colors">Contact</a></li>
            <li><a href="/tiffin" className="hover:text-gold transition-colors">Tiffin Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-900 font-bold uppercase tracking-widest text-sm mb-8">Contact Info</h4>
          <ul className="space-y-6 text-gray-600">
            <li className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gold shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Call Us</p>
                <p className="font-bold text-gray-900">+91 9650254164</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gold shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                <p className="font-bold text-gray-900 text-sm">mithilacateringservices@gmail.com</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gold shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Visit Us</p>
                <p className="font-bold text-gray-900">Delhi, Noida, Faridabad & Pan India</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-10 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-6">
        <p className="text-gray-400 text-sm">© 2026 Mithila Catering & Decoration Service. All rights reserved.</p>
        <div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-gray-400">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
