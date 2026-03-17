import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles, MapPin, Calendar, Send } from 'lucide-react';
import Counter from '../components/Counter';
import { stats, serviceAreas } from '../constants/data';
import { genAI } from '../lib/gemini';

export default function Home() {
  const [aiInput, setAiInput] = useState("");
  const [aiDate, setAiDate] = useState("");
  const [aiTime, setAiTime] = useState("");
  const [aiPlace, setAiPlace] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="relative z-10 px-2 md:px-6 max-w-7xl mx-auto w-full text-center">
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
            
            <h1 className="text-5xl md:text-9xl font-serif font-bold mb-8 leading-tight">
              Mithila Catering <br />
              <span className="gold-gradient italic">& Decoration Service</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/70 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
              Crafting Unforgettable Moments with Authentic Mithila Flavors and Royal Decorations Across India.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a 
                href="/enquiry"
                className="group relative px-10 py-5 gold-bg text-black font-bold rounded-2xl text-xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Plan Your Event
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/tiffin"
                className="px-10 py-5 bg-white/5 border-2 border-gold/30 text-gold font-bold rounded-2xl text-xl hover:bg-gold/10 transition-all backdrop-blur-md"
              >
                Tiffin Service
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-2 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 glass-card rounded-3xl border-gold/10"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold gold-gradient mb-2">
                {stat.isStatic ? stat.value : <Counter value={stat.value as number} suffix={stat.suffix} />}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 px-2 md:px-6 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12">Serving <span className="gold-gradient">Pan India</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {serviceAreas.map((area, idx) => (
              <span key={idx} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm md:text-base font-medium hover:border-gold/50 hover:text-gold transition-all cursor-default">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Planner Section */}
      <section id="ai-planner" className="py-32 px-2 md:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full text-gold text-sm font-bold mb-4 border border-gold/20">
              <Sparkles className="w-4 h-4" /> AI Powered
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6">Mithila <span className="gold-gradient italic">AI Planner</span></h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Let our artificial intelligence design your perfect event menu and decoration theme in seconds.</p>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-[3rem] border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest ml-1">What's the occasion?</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Royal Wedding, 1st Birthday, Corporate Gala"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-gold transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                      <input 
                        type="date"
                        value={aiDate}
                        onChange={(e) => setAiDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-12 text-white focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Place</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                      <input 
                        type="text"
                        placeholder="City"
                        value={aiPlace}
                        onChange={(e) => setAiPlace(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-12 text-white focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleAiPlan}
                  disabled={isAiLoading}
                  className="w-full py-6 gold-bg text-black font-bold rounded-2xl text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isAiLoading ? "Planning..." : "Generate My Plan"}
                  <Send className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-black/40 rounded-[2rem] p-8 border border-white/5 min-h-[300px] flex flex-col">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-serif font-bold text-xl">AI Suggestions</span>
                </div>
                <div className="flex-1 text-white/70 leading-relaxed overflow-y-auto max-h-[400px] custom-scrollbar">
                  {aiResponse ? (
                    <div className="whitespace-pre-wrap">{aiResponse}</div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                      <Sparkles className="w-12 h-12 mb-4" />
                      <p>Fill the details and click generate to see your custom event plan.</p>
                    </div>
                  )}
                </div>
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
    </div>
  );
}
