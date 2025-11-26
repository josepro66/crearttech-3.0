import React, { useState } from 'react';
import { MOCK_PRODUCTS } from './constants';
import ProductCard3D from './components/ProductCard3D';
import ProductDetail from './components/ProductDetail';
import AIAssistant from './components/AIAssistant';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductShowcase from './components/ProductShowcase';
import Newbeate16 from './components/Newbeate16';
import EventSection from './components/EventSection';
import ProductsSection from './components/ProductsSection';
import MidiGuideButton from './components/MidiGuideButton';
import GlobalParallax from './components/GlobalParallax';
import Logo3D from './components/Logo3D';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<string>('All');

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  const filteredProducts = filter === 'All'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-purple-950 text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* Global Parallax Effects */}
      <GlobalParallax />

      {/* Animated Grid and Plasma Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 plasma-bg" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-cyan-900/50 h-16 flex items-center px-6 justify-between">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}textures/logo.png`}
              alt="Creart Tech"
              className="h-10 w-auto animate-pulse-glow"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.8)) drop-shadow(0 0 20px rgba(168,85,247,0.6))',
                animation: 'breathe-glow 3s ease-in-out infinite'
              }}
            />
            <span className="text-2xl font-['Orbitron'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              CREART.TECH
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Home
            </a>
            <a href="#build" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Build your own midi controller
            </a>
            <a href="#guide" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              What MIDI controller should I go for?
            </a>
            <a href="#shop" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
              Shop
            </a>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <span className="text-cyan-400 font-mono group-hover:text-white transition-colors">CART [{cart.reduce((acc, curr) => acc + curr.quantity, 0)}]</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600"></div>
          </div>
        </nav>

        {/* All Sections - Solo mostrar si NO hay producto seleccionado */}
        <AnimatePresence mode="wait">
          {!selectedProduct && (
            <motion.div
              key="all-sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeroSection />
              <AboutSection />
              <MidiGuideButton />
              <Newbeate16 />
              <ProductsSection
                products={MOCK_PRODUCTS}
                onProductClick={setSelectedProduct}
              />
              <EventSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Detail / Configurator */}
        <AnimatePresence mode="wait">
          {selectedProduct && (
            <ProductDetail
              key="configurator"
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onAddToCart={handleAddToCart}
            />
          )}
        </AnimatePresence>

        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
};

export default App;