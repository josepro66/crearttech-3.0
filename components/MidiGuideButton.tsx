import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MidiGuide from './MidiGuide';

export default function MidiGuideButton() {
    const [isOpen, setIsOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

                if (isAtBottom && isOpen) {
                    setTimeout(() => {
                        setIsOpen(false);
                    }, 300);
                }
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';

            const lenisElement = document.querySelector('.lenis');
            if (lenisElement) {
                lenisElement.classList.add('lenis-stopped');
            }
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';

            const lenisElement = document.querySelector('.lenis');
            if (lenisElement) {
                lenisElement.classList.remove('lenis-stopped');
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20">
            {/* Fondo con grid holográfico más visible */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/30"></div>
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50"></div>

            {/* Efecto de brillo ambiental */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 cursor-pointer group"
                        onClick={() => setIsOpen(true)}
                    >
                        <motion.h2
                            className="text-4xl md:text-6xl lg:text-7xl font-['Orbitron'] font-bold text-center mb-12 leading-tight tracking-wider"
                            style={{
                                background: 'linear-gradient(to right, #22d3ee, #c084fc, #e879f9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: '0 0 30px rgba(192, 132, 252, 0.3)'
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            ¿QUÉ CONTROLADOR MIDI COMPRAR?
                        </motion.h2>

                        <motion.div
                            className="relative inline-flex items-center gap-4 px-10 py-5 bg-black border border-cyan-500/50 rounded-xl text-white font-bold text-xl overflow-hidden"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 1)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Fondo del botón con gradiente animado */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <span className="relative z-10 text-cyan-400 group-hover:text-white transition-colors">DESCUBRE AQUÍ</span>
                            <svg className="relative z-10 w-6 h-6 text-purple-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: 50,
                            scale: 0.95,
                            transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="fixed inset-0 z-[9999] bg-black"
                    >
                        <div className="fixed top-24 right-8 z-[10000]">
                            <motion.button
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-white font-bold flex items-center gap-2"
                                whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(6,182,212,0.8)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                CERRAR
                            </motion.button>
                        </div>

                        <div
                            ref={scrollContainerRef}
                            className="w-full h-full overflow-y-scroll pt-16 pointer-events-auto"
                            style={{
                                overscrollBehavior: 'contain',
                                WebkitOverflowScrolling: 'touch'
                            }}
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            <MidiGuide />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
