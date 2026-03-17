/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Check } from 'lucide-react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Enquiry from './pages/Enquiry';
import Contact from './pages/Contact';
import Tiffin from './pages/Tiffin';

function App() {
  const [showCityPopup, setShowCityPopup] = useState(true);
  const [userCity, setUserCity] = useState("");

  useEffect(() => {
    const savedCity = localStorage.getItem('userCity');
    if (savedCity) {
      setUserCity(savedCity);
      setShowCityPopup(false);
    }
  }, []);

  const handleCityConfirm = () => {
    if (userCity.trim()) {
      localStorage.setItem('userCity', userCity);
      setShowCityPopup(false);
    }
  };

  return (
    <Router>
      <AnimatePresence>
        {showCityPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-gold/20"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
                <MapPin className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-4">Welcome to Mithila</h2>
              <p className="text-gray-500 text-center mb-8">Please enter your city to help us serve you better across India.</p>
              
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your city..."
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCityConfirm()}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 text-gray-900 focus:outline-none focus:border-gold transition-all text-lg"
                  />
                </div>
                <button
                  onClick={handleCityConfirm}
                  className="w-full py-5 gold-bg text-black font-bold rounded-2xl text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3"
                >
                  Confirm City <Check className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tiffin" element={<Tiffin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
