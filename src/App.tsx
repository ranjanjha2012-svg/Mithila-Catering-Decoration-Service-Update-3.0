/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, 
  PartyPopper, 
  Users, 
  Briefcase, 
  Truck, 
  Heart, 
  Calendar, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Send,
  MessageSquare,
  ChevronRight,
  Star,
  Tent,
  MoreVertical,
  Menu,
  X,
  Check,
  ShoppingCart,
  ArrowLeft,
  QrCode,
  Leaf,
  Egg,
  Drumstick,
  CreditCard,
  Wallet
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { QRCodeSVG } from 'qrcode.react';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const services = [
  { 
    name: "Birthday Parties", 
    icon: <PartyPopper className="w-6 h-6" />, 
    desc: "Unforgettable celebrations for all ages.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Kitty Parties", 
    icon: <Users className="w-6 h-6" />, 
    desc: "Elegant and fun gatherings for your circle.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Get Together", 
    icon: <Users className="w-6 h-6" />, 
    desc: "Perfect catering for family and friends.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Corporate Parties", 
    icon: <Briefcase className="w-6 h-6" />, 
    desc: "Professional catering for business excellence.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Bulk Orders", 
    icon: <Truck className="w-6 h-6" />, 
    desc: "Large scale catering with consistent quality.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Wedding", 
    icon: <Heart className="w-6 h-6" />, 
    desc: "Royal catering for your special day.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Anniversary", 
    icon: <Star className="w-6 h-6" />, 
    desc: "Celebrating milestones with exquisite taste.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Bhandara", 
    icon: <ChefHat className="w-6 h-6" />, 
    desc: "Traditional and spiritual community meals.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
  },
  { 
    name: "Tent & Decoration", 
    icon: <Tent className="w-6 h-6" />, 
    desc: "Transforming spaces into magical venues.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800"
  }
];

const stats = [
  { label: "Events Done", value: 600, suffix: "+" },
  { label: "Customers", value: 4000, suffix: "+" },
  { label: "Support", value: "24/7", isStatic: true },
  { label: "Event Decoration", value: "Premium", isStatic: true },
  { label: "Catering", value: "Premium", isStatic: true },
  { label: "Mithila Flavors", value: "Authentic", isStatic: true }
];

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}{suffix}</span>;
}

const serviceAreas = [
  "Delhi", "Faridabad", "Noida", "Gurugram", "Patna", "Darbhanga", "Mumbai", "Bangalore", "Kolkata"
];

const tiffinPricing = {
  'Veg': 2700,
  'Egg': 2900,
  'Non-Veg': 3100
};

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'tiffin'>('main');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // AI Planner State
  const [aiInput, setAiInput] = useState("");
  const [aiDate, setAiDate] = useState("");
  const [aiTime, setAiTime] = useState("");
  const [aiPlace, setAiPlace] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Tiffin State
  const [tiffinType, setTiffinType] = useState<'Veg' | 'Egg' | 'Non-Veg'>('Veg');
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['Lunch']);
  const [selectedLocation, setSelectedLocation] = useState<string>('Delhi');
  const [showPayment, setShowPayment] = useState(false);

  const calculateTiffinTotal = () => {
    const basePrice = tiffinPricing[tiffinType];
    const mealCount = selectedMeals.length;
    let total = basePrice * mealCount;
    let discount = 0;

    if (mealCount === 2) discount = 0.06;
    if (mealCount === 3) discount = 0.10;

    const discountAmount = total * discount;
    return {
      subtotal: total,
      discount: discountAmount,
      total: total - discountAmount
    };
  };

  const tiffinTotal = calculateTiffinTotal();

  const handleTiffinBooking = () => {
    setShowPayment(true);
  };

  const handleUpiPayment = () => {
    const upiUrl = `upi://pay?pa=9650254164@kotak&pn=Mithila%20Catering&am=${tiffinTotal.total}&cu=INR`;
    window.location.href = upiUrl;
  };

  const shareOnWhatsApp = () => {
    const message = `Hello Mithila Catering! I have booked a ${tiffinType} Tiffin Service for ${selectedMeals.join(', ')} in ${selectedLocation}. Total Amount: ₹${tiffinTotal.total}. I'm sharing the payment screenshot.`;
    const whatsappUrl = `https://wa.me/919650254164?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mqeybnnv", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleAiPlan = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiResponse("");
    
    try {
      const prompt = `You are an expert event planner for "Mithila Catering & Decoration Service". 
      The user wants help planning an event: "${aiInput}". 
      Event Details:
      - Date: ${aiDate || "Not specified"}
      - Time: ${aiTime || "Not specified"}
      - Place: ${aiPlace || "Not specified"}
      
      Provide a creative, detailed, and professional event plan including menu suggestions, decoration themes, and logistical tips. 
      Keep the tone elegant and helpful. Mention that Mithila Catering has been serving since 2021.`;
      
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      setAiResponse(response.text || "I couldn't generate a plan. Please try again.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("I'm sorry, I couldn't generate a plan right now. Please try again or contact us directly!");
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiResponse]);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-gold selection:text-black">
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.link/a8re98" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
      >
        <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-gold/10 px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <img 
            src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
            alt="Mithila Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-full border border-gold/30 cursor-pointer hover:scale-110 transition-transform"
            referrerPolicy="no-referrer"
            onClick={() => { scrollToTop(); setCurrentView('main'); }}
          />
          <div 
            className="text-left cursor-pointer group"
            onClick={() => { scrollToTop(); setCurrentView('main'); }}
          >
            <div className="text-sm md:text-xl font-serif font-bold gold-gradient leading-tight group-hover:opacity-80 transition-opacity">Mithila Catering &</div>
            <div className="text-sm md:text-xl font-serif font-bold gold-gradient leading-tight group-hover:opacity-80 transition-opacity">Decoration Service</div>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-white/70">
          <a href="#home" onClick={() => setCurrentView('main')} className="hover:text-gold transition-colors">Home</a>
          <a href="#services" onClick={() => setCurrentView('main')} className="hover:text-gold transition-colors">Services</a>
          <a href="#ai-planner" onClick={() => setCurrentView('main')} className="hover:text-gold transition-colors">AI Planner</a>
          <a href="#enquiry" onClick={() => setCurrentView('main')} className="hover:text-gold transition-colors">Enquiry</a>
          <button 
            onClick={() => setCurrentView('tiffin')}
            className="hover:text-gold transition-colors flex items-center gap-2"
          >
            <ChefHat className="w-4 h-4 text-gold" />
            Tiffin
          </button>
        </div>

        {/* Mobile Controls - Adjusted to show links directly or in a compact way */}
        <div className="flex md:hidden items-center gap-2 text-[10px] uppercase tracking-tighter font-bold text-white/70 overflow-x-auto no-scrollbar max-w-[60%]">
          <a href="#home" onClick={() => setCurrentView('main')} className="px-2 py-1 hover:text-gold whitespace-nowrap">Home</a>
          <a href="#services" onClick={() => setCurrentView('main')} className="px-2 py-1 hover:text-gold whitespace-nowrap">Services</a>
          <a href="#ai-planner" onClick={() => setCurrentView('main')} className="px-2 py-1 hover:text-gold whitespace-nowrap">AI Planner</a>
          <a href="#enquiry" onClick={() => setCurrentView('main')} className="px-2 py-1 hover:text-gold whitespace-nowrap">Enquiry</a>
          <button onClick={() => setCurrentView('tiffin')} className="px-2 py-1 hover:text-gold whitespace-nowrap flex items-center gap-1">
            <ChefHat className="w-3 h-3" /> Tiffin
          </button>
        </div>
      </nav>

      {currentView === 'main' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg to-dark-bg" />
            </div>
            
            <div className="relative z-10 px-4 md:px-6 max-w-7xl mx-auto w-full text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 border border-gold/30 rounded-full bg-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-8">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-blink shadow-[0_0_10px_#ef4444]" />
                  <span className="text-gold uppercase tracking-[0.3em] text-sm md:text-lg font-bold whitespace-nowrap">Established Since 2021</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight">
                  Mithila Catering & <br />
                  <span className="gold-gradient italic">Decoration Service</span>
                </h1>
                <h2 className="text-2xl md:text-4xl font-serif text-gold-light mb-8">
                  Crafting Unforgettable Moments Across India
                </h2>
                <p className="text-white/70 text-base md:text-2xl mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                  From grand weddings to intimate gatherings, Mithila Catering & Decoration Service brings professional event management to your doorstep with high-quality service and authentic flavors.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a href="#ai-planner" className="w-full sm:w-auto px-12 py-6 gold-bg text-black font-bold rounded-full text-xl md:text-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-3">
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
                    AI Plan
                  </a>
                  <a href="#enquiry" className="w-full sm:w-auto px-12 py-6 border-2 border-gold text-gold font-bold rounded-full text-xl md:text-2xl hover:bg-gold/10 transition-all flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                    Enquiry
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-gold/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold gold-gradient uppercase tracking-widest">We Served</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "Events Done", value: 600, suffix: "+" },
              { label: "Customers", value: 4000, suffix: "+" },
              { label: "Support", value: "24/7", isStatic: true }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 glass-card rounded-2xl border-gold/10"
              >
                <p className="text-4xl md:text-6xl font-serif font-bold text-gold mb-2">
                  {typeof stat.value === 'number' ? (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-white/60 text-sm uppercase tracking-widest font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Event Decoration", value: "Premium" },
              { label: "Catering", value: "Premium" },
              { label: "Mithila Flavors", value: "Authentic" }
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 border border-gold/20 rounded-3xl bg-gold/5"
              >
                <p className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-3">{cat.value}</p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">{cat.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
              alt="Mithila Logo" 
              className="h-12 w-12 md:h-16 md:w-16 object-contain rounded-full border border-gold/30"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Our Premium <span className="gold-gradient">Services</span></h2>
          </div>
          <div className="w-24 h-1 gold-bg mx-auto rounded-full" />
          <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
            We offer a wide range of event management and tent services across India, ensuring every detail is handled with precision. Authentic Mithila flavors combined with world-class decoration.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 3) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card overflow-hidden rounded-xl md:rounded-3xl group hover:border-gold/30 transition-all"
            >
              <div className="h-24 md:h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60" />
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-6 w-8 h-8 md:w-12 md:h-12 gold-bg rounded-lg md:rounded-xl flex items-center justify-center text-black">
                  {React.cloneElement(service.icon as React.ReactElement, { className: "w-4 h-4 md:w-6 md:h-6" })}
                </div>
              </div>
              <div className="p-3 md:p-8">
                <h3 className="text-[10px] md:text-2xl font-serif font-bold mb-1 md:mb-3 text-gold-light leading-tight">{service.name}</h3>
                <p className="hidden md:block text-white/50 leading-relaxed text-sm">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Event Planner Section */}
      <section id="ai-planner" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-[2rem] border-gold/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-32 h-32 text-gold" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center gap-6 mb-10">
                <img 
                  src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
                  alt="Mithila AI Planner Logo" 
                  className="h-24 w-24 md:h-32 md:w-32 object-contain rounded-full border-4 border-gold shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  referrerPolicy="no-referrer"
                />
                <div className="text-center">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold gold-gradient">Mithila AI Planner</h2>
                  <p className="text-white/40 uppercase tracking-[0.4em] text-xs mt-2">Your Personal Event Architect</p>
                </div>
              </div>
              
              <p className="text-white/60 mb-8 text-lg">
                Plan your perfect event with our AI assistant.
              </p>

              <div className="space-y-6">
                {/* Initial Chat Message */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      Hello! I'm your Mithila AI Event Planner. Tell me about the event you're dreaming of, and I'll help you plan the catering, decoration, and management!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Event Date</label>
                    <input 
                      type="date" 
                      value={aiDate}
                      onChange={(e) => setAiDate(e.target.value)}
                      className="w-full bg-black/40 border border-gold/20 rounded-xl p-3 text-white focus:border-gold/50 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Event Time</label>
                    <input 
                      type="time" 
                      value={aiTime}
                      onChange={(e) => setAiTime(e.target.value)}
                      className="w-full bg-black/40 border border-gold/20 rounded-xl p-3 text-white focus:border-gold/50 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Event Place</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Delhi, Patna..."
                      value={aiPlace}
                      onChange={(e) => setAiPlace(e.target.value)}
                      className="w-full bg-black/40 border border-gold/20 rounded-xl p-3 text-white focus:border-gold/50 outline-none"
                    />
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Describe your event details, guest count, and preferences..."
                    className="w-full bg-black/40 border border-gold/20 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 min-h-[120px] transition-all"
                  />
                  <button
                    onClick={handleAiPlan}
                    disabled={isAiLoading}
                    className="absolute bottom-4 right-4 px-6 py-2 gold-bg text-black font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    {isAiLoading ? "Planning..." : "Generate Plan"}
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <AnimatePresence>
                  {aiResponse && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gold/5 border border-gold/10 rounded-2xl p-6 overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                          <MessageSquare className="w-4 h-4 text-gold" />
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                            {aiResponse}
                          </p>
                        </div>
                      </div>
                      <div ref={chatEndRef} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Let's Create <br /><span className="gold-gradient">Magic Together</span></h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Ready to elevate your event? Fill out the form and our team will get back to you with a customized proposal within 24 hours.
            </p>
            
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-2xl border-gold/10">
                <p className="text-gold font-serif text-xl mb-4 font-bold">Contact Us</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-widest">Name</p>
                      <p className="text-xl">Ranjan Kumar Jha</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-widest">Phone</p>
                      <a href="tel:+919650254164" className="text-xl hover:text-gold transition-colors">+91 9650254164</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-widest">Email</p>
                      <a href="mailto:ranjanjha2012@gmail.com" className="text-lg hover:text-gold transition-colors">ranjanjha2012@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm uppercase tracking-widest">Help Desk</p>
                      <a href="mailto:mithilacateringservices@gmail.com" className="text-lg hover:text-gold transition-colors">mithilacateringservices@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-[2rem] border-gold/20">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-green-500">Enquiry Sent!</h3>
                <p className="text-white/60">Thank you for reaching out. We will respond as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                    <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
                    <input required name="phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Email Address</label>
                    <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Approximate Guests</label>
                    <input required name="guests" type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Event Type</label>
                  <select required name="event_type" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all appearance-none">
                    <option value="" className="bg-dark-bg">Select Service</option>
                    {services.map(s => <option key={s.name} value={s.name} className="bg-dark-bg">{s.name}</option>)}
                    <option value="Others" className="bg-dark-bg">Others</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Delivery Address</label>
                  <input required name="address" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/40 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea name="message" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all min-h-[100px]" />
                </div>

                <button type="submit" className="w-full py-5 gold-bg text-black font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3">
                  Send Enquiry
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map & Service Area Section */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Our <span className="gold-gradient">Presence</span></h2>
            <p className="text-white/40 uppercase tracking-[0.2em] text-sm">Serving across major cities</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-gold/20 h-[400px] relative group">
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
            </div>

            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
                + Pan India
              </div>
              <h3 className="text-3xl font-serif font-bold">Service Areas</h3>
              <div className="grid grid-cols-2 gap-4">
                {serviceAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors cursor-default">
                    <MapPin className="w-4 h-4 text-gold/50" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-gold/10">
                <p className="text-white/40 italic">"Bringing Mithila's finest flavors to your doorstep, wherever you are."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zomato Section */}
      <section className="py-20 px-6 border-y border-gold/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-2">We are also available on</h3>
            <p className="text-white/50">Order our authentic Mithila flavors directly to your home!</p>
          </div>
          <a 
            href="https://zomato.onelink.me/xqzv/2eh1vuyw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img 
              src="https://i.ibb.co/1fhRWXVC/zomato-logo-zomato-icon-transparent-free-png.webp" 
              alt="Zomato" 
              className="h-16 md:h-20 object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </section>

        </>
      ) : (
        <TiffinService 
          onBack={() => setCurrentView('main')}
          tiffinType={tiffinType}
          setTiffinType={setTiffinType}
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          tiffinTotal={tiffinTotal}
          onBook={handleTiffinBooking}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          onUpiPayment={handleUpiPayment}
          onWhatsAppShare={shareOnWhatsApp}
        />
      )}

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gold/10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-white/50 text-xs md:text-sm tracking-widest uppercase text-center md:text-left order-2 md:order-1">
              © 2026 Mithila Catering & Decoration Service. All Rights Reserved.
            </div>
            
            <div className="flex flex-col items-center gap-6 order-1 md:order-2">
              <div className="text-2xl md:text-4xl font-serif font-bold gold-gradient text-center">Mithila Catering & Decoration Service</div>
              <div className="flex gap-8 text-white/40">
                <a href="#" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest">Instagram</span>
                </a>
                <a href="#" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest">Facebook</span>
                </a>
                <a href="#" className="hover:text-gold transition-colors flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest">Twitter</span>
                </a>
              </div>
            </div>

            <div className="text-white/50 text-xs md:text-sm tracking-widest uppercase text-center md:text-right order-3">
              Designed by <span className="text-gold font-bold">Walt Designs & Studio</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-8 border-t border-white/5">
            <img 
              src="https://i.ibb.co/CKgjw4rx/file-000000003bec71faa9b37e16b055cb49.png" 
              alt="Mithila Logo" 
              className="h-20 w-20 object-contain rounded-full border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              referrerPolicy="no-referrer"
            />
            <div className="text-center">
              <p className="text-gold font-serif font-bold tracking-[0.2em]">Mithila AI Planner</p>
              <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] mt-1">Smart Event Solutions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TiffinService({ 
  onBack, 
  tiffinType, 
  setTiffinType, 
  selectedMeals, 
  setSelectedMeals, 
  selectedLocation, 
  setSelectedLocation, 
  tiffinTotal, 
  onBook,
  showPayment,
  setShowPayment,
  onUpiPayment,
  onWhatsAppShare
}: any) {
  const [step, setStep] = useState<'selection' | 'booking' | 'form' | 'payment'>('selection');
  const [aiSummary, setAiSummary] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const tiffinDetails = {
    'Veg': {
      price: 2700,
      menu: "4 Roti + Rice + Dal + Sabji + Salad + Sweet/Raita (Weekdays)",
      notes: "On-time delivery. Sabji & Dal will change daily.",
      color: "from-green-600/40 to-green-900/60 border-green-500/50",
      icon: <Leaf className="w-12 h-12 text-green-400" />,
      tag: "Pure Vegetarian"
    },
    'Egg': {
      price: 2900,
      menu: "4 Roti + Rice + Dal + Egg Sabji + Salad + Sweet/Raita (Weekdays)",
      notes: "On-time delivery. Sabji & Dal will change daily. Egg as sabji somedays.",
      color: "from-yellow-600/40 to-yellow-900/60 border-yellow-500/50",
      icon: <Egg className="w-12 h-12 text-yellow-400" />,
      tag: "Eggitarian"
    },
    'Non-Veg': {
      price: 3100,
      menu: "4 Roti + Rice + Dal + Chicken/Mutton Sabji + Salad + Sweet/Raita (Weekdays)",
      notes: "On-time delivery. Sabji & Dal will change daily. Non-veg served on specific days.",
      color: "from-red-600/40 to-red-900/60 border-red-500/50",
      icon: <Drumstick className="w-12 h-12 text-red-400" />,
      tag: "Non-Vegetarian"
    }
  };

  const generateAiSummary = async (type: string) => {
    setIsAiLoading(true);
    try {
      const prompt = `Write a very short, appetizing 2-sentence summary for a "${type} Tiffin Service" by Mithila Catering. 
      Mention freshness, authentic taste, and home-style cooking. Keep it under 40 words.`;
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setAiSummary(response.text || "");
    } catch (e) {
      setAiSummary("Fresh, home-style meals prepared with authentic Mithila spices and delivered hot to your doorstep.");
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (step === 'booking') {
      generateAiSummary(tiffinType);
    }
  }, [step, tiffinType]);

  const toggleMeal = (meal: string) => {
    if (selectedMeals.includes(meal)) {
      if (selectedMeals.length > 1) {
        setSelectedMeals(selectedMeals.filter((m: string) => m !== meal));
      }
    } else {
      if (selectedMeals.length < 3) {
        setSelectedMeals([...selectedMeals, meal]);
      }
    }
  };

  const handleCardBookNow = (type: 'Veg' | 'Egg' | 'Non-Veg') => {
    setTiffinType(type);
    setStep('booking');
  };

  const handleBookingFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', bookingFormData.name);
    formData.append('phone', bookingFormData.phone);
    formData.append('address', bookingFormData.address);
    formData.append('tiffin_type', tiffinType);
    formData.append('meals', selectedMeals.join(', '));
    formData.append('area', selectedLocation);
    formData.append('total_amount', tiffinTotal.total.toString());
    formData.append('notes', bookingFormData.notes);

    try {
      await fetch("https://formspree.io/f/mqeybnnv", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setStep('payment');
      onBook();
    } catch (error) {
      console.error("Booking form error:", error);
      setStep('payment');
      onBook();
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-6 max-w-6xl mx-auto min-h-screen">
      <div className="fixed inset-0 bg-[#1a3a1a] -z-10" /> {/* Dark Grass Green Background */}
      
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => {
          if (step === 'payment') {
            setStep('form');
            setShowPayment(false);
          } else if (step === 'form') {
            setStep('booking');
          } else if (step === 'booking') {
            setStep('selection');
          } else {
            onBack();
          }
        }}
        className="flex items-center gap-2 text-gold mb-8 hover:underline bg-black/40 px-6 py-3 rounded-full border border-gold/20 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" /> {step === 'selection' ? 'Back to Home' : 'Back'}
      </motion.button>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-4">Premium <span className="gold-gradient italic">Tiffin Service</span></h1>
        <p className="text-white/60 text-xl font-light">Authentic home-style meals delivered to your doorstep.</p>
      </div>

      {step === 'selection' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {(['Veg', 'Egg', 'Non-Veg'] as const).map((type, idx) => (
            <motion.div 
              key={type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 transition-all flex flex-col items-center text-center group hover:scale-[1.02] bg-gradient-to-br ${tiffinDetails[type].color} ${idx === 2 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="mb-6 md:mb-8 p-4 md:p-6 bg-black/30 rounded-full shadow-inner group-hover:rotate-12 transition-transform">
                {tiffinDetails[type].icon}
              </div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-2">{type} Tiffin</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${type === 'Veg' ? 'bg-green-500' : type === 'Egg' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/80">{tiffinDetails[type].tag}</span>
              </div>
              <p className="text-3xl md:text-5xl font-serif font-bold text-gold mb-1">₹{tiffinPricing[type]}/-</p>
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest mb-6">Per Meal (30 Days)</p>
              
              <div className="hidden md:block space-y-4 mb-8 text-left w-full bg-black/20 p-6 rounded-2xl border border-white/5">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 leading-relaxed">{tiffinDetails[type].menu}</p>
                </div>
              </div>

              <button 
                onClick={() => handleCardBookNow(type)}
                className="w-full py-4 md:py-5 gold-bg text-black font-bold rounded-xl md:rounded-2xl text-lg md:text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2"
              >
                Book Now <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {step === 'booking' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* AI Summary */}
          <div className="glass-card p-6 rounded-2xl border-gold/20 bg-gold/5 italic text-center">
            {isAiLoading ? (
              <div className="flex items-center justify-center gap-2 text-gold/60">
                <Sparkles className="w-5 h-5 animate-spin" /> Generating AI Summary...
              </div>
            ) : (
              <p className="text-gold-light text-lg">"{aiSummary}"</p>
            )}
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl border-white/10 bg-black/20">
              <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gold" /> Select Area
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Delhi', 'Faridabad', 'Noida'].map((loc) => (
                  <button 
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`flex-1 min-w-[120px] px-6 py-4 rounded-xl border-2 transition-all text-center font-bold text-lg ${selectedLocation === loc ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/60 hover:border-gold/30'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border-white/10 bg-black/20">
              <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-gold" /> Select Time
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                  <button 
                    key={meal}
                    onClick={() => toggleMeal(meal)}
                    className={`flex-1 min-w-[120px] px-6 py-4 rounded-xl border-2 transition-all text-center font-bold text-lg ${selectedMeals.includes(meal) ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/60 hover:border-gold/30'}`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] uppercase tracking-widest font-bold text-white/40 text-center">
                <div className="p-3 border border-white/5 rounded-xl bg-white/5">
                  <p className="text-gold mb-1">Breakfast</p>
                  <p>07:00am - 10:00am</p>
                </div>
                <div className="p-3 border border-white/5 rounded-xl bg-white/5">
                  <p className="text-gold mb-1">Lunch</p>
                  <p>12:00pm - 03:00pm</p>
                </div>
                <div className="p-3 border border-white/5 rounded-xl bg-white/5">
                  <p className="text-gold mb-1">Dinner</p>
                  <p>05:30pm - 10:00pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-sm text-red-200/80 leading-relaxed">
            <p className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Important Note:
            </p>
            <p>1) During weekends/Festival delivery will might possibly Late breakfast delivery and Early Dinner. All notice and updates will be managed in whatsapp.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-gold/30 bg-gold/10 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-serif font-bold mb-3">Order Summary</h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-white/70">
                  <span className="px-4 py-1.5 bg-gold/20 rounded-full text-gold text-sm font-bold border border-gold/30">{tiffinType}</span>
                  <span className="bg-white/5 px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">{selectedMeals.join(' + ')}</span>
                  <span className="bg-white/5 px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">{selectedLocation}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-white/40 line-through text-lg">₹{tiffinTotal.subtotal}</div>
                <div className="text-green-500 text-xl font-bold mb-1">Discount: -₹{tiffinTotal.discount.toFixed(0)}</div>
                <div className="text-6xl font-serif font-bold text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">₹{tiffinTotal.total.toFixed(0)}</div>
              </div>
            </div>
            <button 
              onClick={() => setStep('form')}
              className="w-full mt-10 py-7 gold-bg text-black font-bold rounded-2xl text-2xl md:text-3xl hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-4 group"
            >
              Continue to Details <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}

      {step === 'form' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 rounded-[3rem] border-gold/30 max-w-2xl mx-auto bg-black/40"
        >
          <h2 className="text-4xl font-serif font-bold mb-8 text-center">Delivery <span className="gold-gradient">Details</span></h2>
          <form onSubmit={handleBookingFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                required 
                type="text" 
                value={bookingFormData.name}
                onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                required 
                type="tel" 
                value={bookingFormData.phone}
                onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Full Address</label>
              <textarea 
                required 
                value={bookingFormData.address}
                onChange={(e) => setBookingFormData({...bookingFormData, address: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all min-h-[100px]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Special Instructions (Optional)</label>
              <input 
                type="text" 
                value={bookingFormData.notes}
                onChange={(e) => setBookingFormData({...bookingFormData, notes: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-gold transition-all" 
              />
            </div>
            <button type="submit" className="w-full py-6 gold-bg text-black font-bold rounded-xl text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3">
              Proceed to Payment <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </motion.div>
      )}

      {step === 'payment' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 rounded-[3rem] border-gold/30 text-center max-w-3xl mx-auto bg-black/40"
        >
          <h2 className="text-4xl font-serif font-bold mb-6">Secure <span className="gold-gradient">Payment</span></h2>
          <p className="text-white/60 mb-10 text-lg">Scan the QR code below or choose a payment method to pay ₹{tiffinTotal.total.toFixed(0)}</p>
          
          <div className="bg-white p-8 rounded-[2rem] inline-block mb-10 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            <QRCodeSVG 
              value={`upi://pay?pa=9650254164@kotak&pn=Mithila%20Catering&am=${tiffinTotal.total}&cu=INR`} 
              size={240}
              level="H"
            />
          </div>
          
          <div className="mb-10">
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-2">UPI ID</p>
            <p className="text-gold font-bold text-2xl tracking-widest">9650254164@kotak</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <button 
              onClick={onUpiPayment}
              className="py-5 bg-white/5 border-2 border-gold/30 text-gold font-bold rounded-2xl hover:bg-gold/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <QrCode className="w-6 h-6" /> Pay via GPay / PhonePe
            </button>
            <button 
              onClick={onUpiPayment}
              className="py-5 bg-white/5 border-2 border-blue-500/30 text-blue-400 font-bold rounded-2xl hover:bg-blue-500/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <CreditCard className="w-6 h-6" /> Pay via Paytm / Card
            </button>
            <button 
              onClick={onUpiPayment}
              className="py-5 bg-white/5 border-2 border-purple-500/30 text-purple-400 font-bold rounded-2xl hover:bg-purple-500/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Wallet className="w-6 h-6" /> Other UPI Apps
            </button>
            <button 
              onClick={onWhatsAppShare}
              className="py-5 bg-[#25D366] text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#25D366]/20"
            >
              <MessageSquare className="w-6 h-6" /> Share Screenshot
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
            <img src="https://i.ibb.co/99X8wXW/gpay.png" alt="GPay" className="h-8" />
            <img src="https://i.ibb.co/99X8wXW/phonepe.png" alt="PhonePe" className="h-8" />
            <img src="https://i.ibb.co/99X8wXW/paytm.png" alt="Paytm" className="h-8" />
            <img src="https://i.ibb.co/99X8wXW/upi.png" alt="UPI" className="h-8" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

