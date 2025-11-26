import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import ProductCard3D from './ProductCard3D';

interface ProductsSectionProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export default function ProductsSection({ products, onProductClick }: ProductsSectionProps) {
    const [filter, setFilter] = useState<string>('All');
    const [currentIndex, setCurrentIndex] = useState(0);

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? filteredProducts.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === filteredProducts.length - 1 ? 0 : prev + 1));
    };

    // Reset index when filter changes
    React.useEffect(() => {
        setCurrentIndex(0);
    }, [filter]);

    const currentProduct = filteredProducts[currentIndex];

    return (
        <section id="productos" className="relative py-20 px-6">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(6,78,59,0.3)_50%,_transparent_100%)]"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold backdrop-blur-sm">
                            ⚡ Nuestra Colección
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-['Orbitron'] font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                        Controladores MIDI
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Diseños únicos y personalizables con tecnología de vanguardia
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="flex gap-3 mb-12 overflow-x-auto pb-2 justify-center scrollbar-hide"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((cat, index) => (
                        <motion.button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-3 rounded-xl font-['Orbitron'] uppercase text-sm font-bold whitespace-nowrap transition-all ${filter === cat
                                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                                : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/30'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Single Card Display with Navigation */}
                {filteredProducts.length > 0 ? (
                    <div className="relative flex items-center justify-center min-h-[600px]">
                        {/* Left Arrow */}
                        <motion.button
                            onClick={goToPrevious}
                            className="absolute -left-24 md:-left-20 lg:-left-24 z-30 w-16 h-16 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center hover:scale-110 transition-transform border-2 border-cyan-400/50"
                            whileHover={{ scale: 1.15, boxShadow: '0 0 40px rgba(34, 211, 238, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Previous product"
                        >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        {/* Card Container */}
                        <div className="w-full max-w-md mx-auto px-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentProduct.id}
                                    initial={{ opacity: 0, x: 100, rotateY: -30 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                    exit={{ opacity: 0, x: -100, rotateY: 30 }}
                                    transition={{
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                >
                                    <ProductCard3D
                                        product={currentProduct}
                                        onClick={onProductClick}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Arrow */}
                        <motion.button
                            onClick={goToNext}
                            className="absolute -right-24 md:-right-20 lg:-right-24 z-30 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 transition-transform border-2 border-purple-400/50"
                            whileHover={{ scale: 1.15, boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Next product"
                        >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🎛️</div>
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">
                            No hay productos en esta categoría
                        </h3>
                        <p className="text-gray-500">
                            Prueba con otra categoría
                        </p>
                    </motion.div>
                )}

                {/* Indicator Dots */}
                {filteredProducts.length > 0 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {filteredProducts.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 w-8 shadow-lg shadow-cyan-500/50'
                                    : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Go to product ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Counter */}
                {filteredProducts.length > 0 && (
                    <motion.div
                        className="text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="text-gray-400 font-['Orbitron'] text-sm">
                            {currentIndex + 1} / {filteredProducts.length}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Custom CSS for hiding scrollbar */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
