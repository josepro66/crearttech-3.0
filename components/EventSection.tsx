import React from 'react';
import { motion } from 'framer-motion';

const EVENTS = [
    {
        date: '15 DIC',
        title: 'Workshop: Producción Musical con MIDI',
        location: 'Online',
        time: '18:00 - 20:00',
        color: 'cyan'
    },
    {
        date: '22 DIC',
        title: 'Lanzamiento: BEATO Pro Series',
        location: 'CreartTech Studio',
        time: '19:00 - 22:00',
        color: 'purple'
    },
    {
        date: '05 ENE',
        title: 'Masterclass: Control Avanzado',
        location: 'Online',
        time: '17:00 - 19:00',
        color: 'fuchsia'
    }
];

export default function EventSection() {
    return (
        <section id="events" className="relative py-24 px-6 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-['Orbitron'] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Próximos Eventos
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Únete a nuestros workshops, lanzamientos y masterclasses exclusivas
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {EVENTS.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 overflow-hidden group cursor-pointer"
                        >
                            {/* Decorative corner */}
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${event.color}-500/20 to-transparent blur-2xl`}></div>

                            {/* Date Badge */}
                            <div className={`inline-block bg-${event.color}-500/20 border border-${event.color}-500/50 rounded-lg px-4 py-2 mb-4`}>
                                <div className={`text-${event.color}-400 font-bold text-sm`}>{event.date}</div>
                            </div>

                            {/* Event Info */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                {event.title}
                            </h3>

                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>🕐</span>
                                    <span>{event.time}</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button className={`mt-6 w-full py-2 bg-gradient-to-r from-${event.color}-600 to-${event.color}-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-${event.color}-500/50 transition-all`}>
                                Registrarse
                            </button>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
