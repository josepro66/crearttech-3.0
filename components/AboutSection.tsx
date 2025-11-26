import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section id="about" className="relative py-24 px-6 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-['Orbitron'] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Sobre CreartTech
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-3xl font-bold mb-6 text-white">
                            Tecnología Musical del Futuro
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            En CreartTech, fusionamos la artesanía boutique con la tecnología de vanguardia
                            para crear controladores MIDI únicos que transforman tu flujo creativo.
                        </p>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Cada controlador es diseñado con precisión, personalizable hasta el último detalle,
                            y construido para músicos que exigen lo mejor en rendimiento y estética.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                                <div className="text-sm text-gray-400">Controladores Creados</div>
                            </div>
                            <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                                <div className="text-sm text-gray-400">Personalizables</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: '🎨',
                                title: 'Diseño Personalizado',
                                desc: 'Elige colores, materiales y configuraciones únicas'
                            },
                            {
                                icon: '⚡',
                                title: 'Tecnología Avanzada',
                                desc: 'Componentes de alta calidad y respuesta ultra-rápida'
                            },
                            {
                                icon: '🔧',
                                title: 'Construcción Artesanal',
                                desc: 'Cada unidad es ensamblada y probada a mano'
                            },
                            {
                                icon: '🌐',
                                title: 'Soporte Global',
                                desc: 'Envíos internacionales y soporte técnico 24/7'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan-500/50 hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                <div className="text-4xl">{feature.icon}</div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
                                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
