import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChefHat, 
  Leaf, 
  Egg, 
  Drumstick, 
  Check, 
  ShoppingCart, 
  ArrowLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Wallet, 
  MessageSquare 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { genAI } from '../lib/gemini';
import { tiffinPricing } from '../constants/data';

export default function Tiffin() {
  const [step, setStep] = useState<'selection' | 'booking' | 'form' | 'payment'>('selection');
  const [tiffinType, setTiffinType] = useState<'Veg' | 'Egg' | 'Non-Veg'>('Veg');
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['Lunch']);
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
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

  const calculateTotal = () => {
    const basePrice = tiffinPricing[tiffinType];
    const mealCount = selectedMeals.length;
    const subtotal = basePrice * mealCount;
    const discount = subtotal * 0.1; // 10% discount for demo
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const tiffinTotal = calculateTotal();

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
    } catch (error) {
      console.error("Booking form error:", error);
      setStep('payment');
    }
  };

  return (
    <div id="tiffin" className="pt-32 pb-20 px-2 md:px-6 max-w-6xl mx-auto min-h-screen">
      <div className="fixed inset-0 bg-[#1a3a1a] -z-10" /> {/* Dark Grass Green Background */}
      
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => {
          if (step === 'payment') {
            setStep('form');
          } else if (step === 'form') {
            setStep('booking');
          } else if (step === 'booking') {
            setStep('selection');
          } else {
            window.location.href = '/';
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
              className="py-5 bg-white/5 border-2 border-gold/30 text-gold font-bold rounded-2xl hover:bg-gold/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <QrCode className="w-6 h-6" /> Pay via GPay / PhonePe
            </button>
            <button 
              className="py-5 bg-white/5 border-2 border-blue-500/30 text-blue-400 font-bold rounded-2xl hover:bg-blue-500/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <CreditCard className="w-6 h-6" /> Pay via Paytm / Card
            </button>
            <button 
              className="py-5 bg-white/5 border-2 border-purple-500/30 text-purple-400 font-bold rounded-2xl hover:bg-purple-500/10 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <Wallet className="w-6 h-6" /> Other UPI Apps
            </button>
            <button 
              className="py-5 bg-[#25D366] text-white font-bold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#25D366]/20"
            >
              <MessageSquare className="w-6 h-6" /> Share Screenshot
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
