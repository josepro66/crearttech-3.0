import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { GLBModel } from './ThreeElements';

export default function Newbeate16() {
    return (
        <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-purple-950/20 to-black/40">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-sm font-semibold mb-6">
                            🎉 NUEVO LANZAMIENTO
                        </span>

                        <h2 className="text-6xl font-['Orbitron'] font-black mb-6">
                            <span className="text-white">BEATO</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500"> 16</span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            El controlador de pads más avanzado del mercado. 16 pads ultra-sensibles
                            con retroiluminación RGB individual y respuesta táctil de última generación.
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { label: 'Pads', value: '16' },
                                { label: 'Sensibilidad', value: '1024 niveles' },
                                { label: 'RGB Zones', value: '16 individuales' },
                                { label: 'Conectividad', value: 'USB-C + MIDI' }
                            ].map((spec, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-black/40 border border-purple-500/30 rounded-lg p-4"
                                >
                                    <div className="text-2xl font-bold text-purple-400">{spec.value}</div>
                                    <div className="text-sm text-gray-400">{spec.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105">
                                Pre-ordenar Ahora
                            </button>
                            <button className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all">
                                Ver Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Right - Product Card Style */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Product Card */}
                        <div className="relative bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 border-2 border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                            {/* Stars/Particles */}
                            <div className="absolute inset-0">
                                {[...Array(20)].map((_, i) => (
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

                            {/* 3D Model Container */}
                            <div className="relative h-96 p-8">
                                <Canvas camera={{ position: [3, 3, 5], fov: 35 }} dpr={[1, 2]}>
                                    <ambientLight intensity={1.2} />
                                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                                    <directionalLight position={[-5, 5, -5]} intensity={0.8} />
                                    <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} castShadow />
                                    <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                                    <pointLight position={[-10, 5, -10]} intensity={0.8} color="#a855f7" />
                                    <pointLight position={[5, -5, 5]} intensity={0.6} color="#ec4899" />

                                    <Suspense fallback={null}>
                                        <GLBModel
                                            path="/models/BEATO16.glb"
                                            hover={false}
                                            scale={22.0}
                                            position={[0, 0.2, 0]}
                                        />
                                        <OrbitControls
                                            enableZoom={false}
                                            enablePan={false}
                                            enableRotate={false}
                                            autoRotate
                                            autoRotateSpeed={1}
                                        />
                                    </Suspense>
                                </Canvas>
                            </div>

                            {/* Product Info Footer */}
                            <div className="relative bg-black/60 backdrop-blur-sm border-t border-purple-500/30 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mb-1">
                                            CONTROLLERS
                                        </div>
                                        <h3 className="text-2xl font-['Orbitron'] font-bold text-white">
                                            Beato 16
                                        </h3>
                                    </div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">
                                        £280
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 grid md:grid-cols-3 gap-6"
                >
                    {[
                        { icon: '⚡', title: 'Ultra Responsive', desc: 'Latencia < 1ms' },
                        { icon: '🎨', title: 'RGB Personalizable', desc: 'Millones de colores' },
                        { icon: '🔌', title: 'Plug & Play', desc: 'Compatible con todos los DAWs' }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-black/30 border border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-400/50 transition-all"
                        >
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>
        </section>
    );
}
