import React from 'react';
import { 
  PartyPopper, 
  Users, 
  Briefcase, 
  Truck, 
  Heart, 
  Star, 
  ChefHat, 
  Tent 
} from 'lucide-react';

export const services = [
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

export const stats = [
  { label: "Events Done", value: 600, suffix: "+" },
  { label: "Customers", value: 4000, suffix: "+" },
  { label: "Support", value: "24/7", isStatic: true },
  { label: "Event Decoration", value: "Premium", isStatic: true },
  { label: "Catering", value: "Premium", isStatic: true },
  { label: "Mithila Flavors", value: "Authentic", isStatic: true }
];

export const serviceAreas = [
  "Delhi", "Faridabad", "Noida", "Gurugram", "Patna", "Darbhanga", "Mumbai", "Bangalore", "Kolkata"
];

export const tiffinPricing = {
  'Veg': 2700,
  'Egg': 2900,
  'Non-Veg': 3100
};
