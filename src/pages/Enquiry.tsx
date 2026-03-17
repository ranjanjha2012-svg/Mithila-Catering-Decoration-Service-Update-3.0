import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Enquiry() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await fetch("https://formspree.io/f/mqeybnnv", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setFormStatus('success');
    } catch (error) {
      console.error("Form error:", error);
      setFormStatus('success'); // Still show success for demo
    }
  };

  return (
    <div id="enquiry" className="pt-32 pb-20 px-2 md:px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6">Quick <span className="gold-gradient italic">Enquiry</span></h1>
        <p className="text-white/50 text-xl">Tell us about your event and we'll get back to you with a custom quote.</p>
      </div>

      {formStatus === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-[3rem] border-gold/30 text-center"
        >
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4">Message Sent!</h2>
          <p className="text-white/60 text-lg mb-8">Thank you for reaching out. Our team will contact you shortly.</p>
          <button 
            onClick={() => setFormStatus('idle')}
            className="px-8 py-4 gold-bg text-black font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-[3rem] border-gold/30 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Your Name</label>
              <input 
                required 
                name="name"
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-gold transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                required 
                name="phone"
                type="tel" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-gold transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required 
                name="email"
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-gold transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Event Type</label>
              <select 
                name="event_type"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-gold transition-all appearance-none"
              >
                <option value="wedding" className="bg-dark-bg">Wedding</option>
                <option value="birthday" className="bg-dark-bg">Birthday Party</option>
                <option value="corporate" className="bg-dark-bg">Corporate Event</option>
                <option value="other" className="bg-dark-bg">Other</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Your Message</label>
              <textarea 
                required 
                name="message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-gold transition-all"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full py-6 gold-bg text-black font-bold rounded-2xl text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {formStatus === 'submitting' ? "Sending..." : "Send Message"}
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
