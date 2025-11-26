import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLBModel } from './ThreeElements';

{
    id: 1,
        name: 'KNOBO Pro',
            category: 'Knob Controller',
                image: `${import.meta.env.BASE_URL}models/KNOBO.glb`,
                    price: 299,
                        features: ['16 Encoders', 'RGB Backlight', 'USB-C'],
                            color: 'cyan',
                                scale: 25
},
{
    id: 2,
        name: 'BEATO Studio',
            category: 'Pad Controller',
                image: `${import.meta.env.BASE_URL}models/BEATO.glb`,
                    price: 399,
                        features: ['16 Pads', 'Velocity Sensitive', 'MIDI 2.0'],
                            color: 'purple',
                                scale: 22
},
{
    id: 3,
        name: 'MIXO Elite',
            category: 'Mixer Controller',
                image: `${import.meta.env.BASE_URL}models/MIXO.glb`,
                    price: 499,
                        features: ['8 Faders', '24 Knobs', 'Motorized'],
                            color: 'fuchsia',
                                scale: 20
}

export default function ProductShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProduct = FEATURED_PRODUCTS[activeIndex];

    return (
        <section id="showcase" className="relative py-24 px-6 bg-gradient-to-b from-black/40 to-transparent">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-['Orbitron'] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Productos Destacados
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Descubre nuestra línea premium de controladores MIDI
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Product Display */}
                    <motion.div
                        key={activeProduct.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                            {/* Decorative glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-${activeProduct.color}-500/10 to-transparent blur-3xl`}></div>

                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                            {/* Stars/Particles */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(15)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
                                        }}
                                    />
                                ))}
                            </div>

                            {/* 3D Model Canvas */}
                            <div className="relative z-10 h-full w-full">
                                <Canvas camera={{ position: [5, 5, 8], fov: 30 }} dpr={[1, 2]}>
                                    <ambientLight intensity={2.0} />
                                    <directionalLight position={[5, 5, 5]} intensity={2.5} />
                                    <directionalLight position={[-5, 5, -5]} intensity={1.5} />
                                    <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={3} castShadow />
                                    <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                                    <pointLight
                                        position={[-10, 5, -10]}
                                        intensity={1.5}
                                        color={activeProduct.color === 'cyan' ? '#22d3ee' : activeProduct.color === 'purple' ? '#a855f7' : '#e879f9'}
                                    />
                                    <pointLight position={[5, -5, 5]} intensity={1.0} color="#ec4899" />
                                    <Environment preset="city" />

                                    <Suspense fallback={null}>
                                        <GLBModel
                                            path={activeProduct.image}
                                            hover={false}
                                            scale={activeProduct.scale || 20}
                                            position={[0, 0, 0]}
                                        />
                                        <OrbitControls
                                            enableZoom={false}
                                            enablePan={false}
                                            enableRotate={false}
                                            autoRotate
                                            autoRotateSpeed={1}
                                            minPolarAngle={Math.PI / 3.5}
                                            maxPolarAngle={Math.PI / 2.5}
                                        />
                                    </Suspense>
                                </Canvas>
                            </div>

                            {/* Corner accents */}
                            <div className={`absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-${activeProduct.color}-500/50`}></div>
                            <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-${activeProduct.color}-500/50`}></div>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProduct.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className={`text-${activeProduct.color}-400 text-sm font-semibold uppercase tracking-wider`}>
                                    {activeProduct.category}
                                </span>
                                <h3 className="text-4xl font-bold text-white mt-2 mb-4">
                                    {activeProduct.name}
                                </h3>
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
                                    £{activeProduct.price}
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    {activeProduct.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className={`w-2 h-2 rounded-full bg-${activeProduct.color}-400`}></div>
                                            <span className="text-gray-300">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button className={`w-full py-4 bg-gradient-to-r from-${activeProduct.color}-600 to-${activeProduct.color}-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-${activeProduct.color}-500/50 transition-all hover:scale-105`}>
                                    Personalizar Ahora
                                </button>
                            </motion.div>
                        </AnimatePresence>

                        {/* Product Selector */}
                        <div className="flex gap-4 mt-8">
                            {FEATURED_PRODUCTS.map((product, index) => (
                                <button
                                    key={product.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeIndex === index
                                        ? `bg-${product.color}-500/20 border-2 border-${product.color}-500 text-${product.color}-400`
                                        : 'bg-gray-800 border-2 border-gray-700 text-gray-400 hover:border-gray-600'
                                        }`}
                                >
                                    {product.name.split(' ')[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>
        </section >
    );
}
