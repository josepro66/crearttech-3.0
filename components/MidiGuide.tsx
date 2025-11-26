import React from 'react';

const MidiGuide = () => {
    const products = [
        {
            id: 'beato16',
            name: 'Beato16',
            subtitle: 'Potencia y Versatilidad',
            description: 'El nuevo Beato16 es un controlador MIDI diseñado para ofrecer una experiencia táctil y dinámica. Equipado con 4 teclas táctiles tipo gaming (perfectas para octavar o grabar), 16 botones arcade, 1 fader y 4 perillas, ofrece una respuesta rápida y precisa. Su versatilidad no se limita a la música: también funciona como macropad para optimizar flujos de trabajo en Ableton Live, Resolume, Unity o cualquier app MIDI. Con una construcción robusta, es ideal para finger drumming y creadores digitales que buscan flexibilidad y potencia.',
            targetAudience: [
                'Productores de todos los géneros',
                'Beatmakers y amantes del finger drumming',
                'VJs y técnicos de luces',
                'Creadores digitales que usan Unity o Resolume',
                'Músicos que buscan interacción física y robustez'
            ],
            image: '/textures/fotos controladores/BEATO16.png'
        },
        {
            id: 'mixo',
            name: 'Mixo',
            subtitle: 'Control Preciso para Mezcla y Producción',
            description: 'El Mixo es un controlador MIDI compacto con 4 potenciómetros, 4 botones LED y 4 faders, ideal para quienes buscan versatilidad en sus proyectos creativos. Su diseño intuitivo no solo es perfecto para hacer música, sino que también funciona como un macropad en cualquier programa como Illustrator, Unity o Resolume, ayudando a acelerar tareas repetitivas. Con total compatibilidad MIDI, te permite controlar tu DAW, ajustar efectos y gestionar mezclas. Su portabilidad lo hace ideal tanto para estudios como para presentaciones en vivo.',
            targetAudience: [
                'Productores que desean controlar con precisión la automatización',
                'Diseñadores y creadores que usan Illustrator, Unity, etc.',
                'DJs que buscan un controlador pequeño para mezclar en vivo',
                'Ingenieros de sonido y artistas que trabajan con efectos',
                'Personas que quieren un controlador versátil y portátil'
            ],
            image: '/textures/fotos controladores/MIXO.png'
        },
        {
            id: 'beato8',
            name: 'Beato8',
            subtitle: 'Simplicidad y Fluidez Creativa',
            description: 'El Beato8 es una versión más ligera del Beato16, pero igual de poderosa. Con 8 botones arcade y 4 perillas, es perfecto para lanzar samples, disparar loops y controlar efectos sin distracciones. Ideal para finger drummers y presentaciones en vivo.',
            targetAudience: [
                'Músicos que necesitan un controlador portátil para giras y conciertos',
                'Productores que prefieren un diseño minimalista pero funcional',
                'Personas que buscan una opción más sencilla que el Beato16'
            ],
            image: '/textures/fotos controladores/BEATO8.png'
        },
        {
            id: 'fado',
            name: 'Fado',
            subtitle: 'El Control Definitivo para Mezcla',
            description: 'Fado es un controlador MIDI diseñado para ofrecer un control preciso y creativo de tus mezclas y automatizaciones en tiempo real. Equipado con 8 faders asignables, te permite controlar volúmenes, efectos y parámetros con total libertad. Su diseño robusto con cuerpo metálico y totalmente personalizable lo hace perfecto para productores, DJs y creadores digitales. Compatible con Ableton Live, Resolume y cualquier software MIDI.',
            targetAudience: [
                'Ingenieros de sonido que necesitan control especializado',
                'DJs que desean ajustar volúmenes y efectos en vivo',
                'Productores que trabajan con automatización',
                'Artistas que prefieren un enfoque centrado en los faders',
                'Usuarios de Ableton Live, Resolume y otros DAWs'
            ],
            image: '/textures/fotos controladores/FADO.png'
        },
        {
            id: 'loopo',
            name: 'Loopo',
            subtitle: 'La Opción Ideal para la Performance en Vivo',
            description: 'Loopo es un pedal MIDI diseñado para ofrecer una fluidez total en tus presentaciones. Con 4 footswitches y 4 perillas asignables, te permite controlar efectos, loops y parámetros con precisión, ideal cuando necesitas mantener las manos libres. Perfecto para guitarristas, tecladistas y performers, se adapta a cualquier DAW, pedalera digital o software compatible con MIDI. Compacto, resistente y fácil de integrar.',
            targetAudience: [
                'Guitarristas, tecladistas y performers',
                'Músicos que necesitan manos libres',
                'Usuarios de pedaleras digitales y live looping',
                'Artistas que buscan libertad en el escenario'
            ],
            image: '/textures/fotos controladores/LOOPO.png'
        },
        {
            id: 'knobo',
            name: 'Knobo',
            subtitle: 'Control Total con Perillas',
            description: 'Knobo es un controlador MIDI diseñado para ofrecer un control preciso y creativo de tus mezclas y automatizaciones en tiempo real. Equipado con 8 knobs asignables, te permite controlar volúmenes, efectos y parámetros con total libertad. Su diseño robusto con cuerpo metálico y totalmente personalizable lo convierte en la herramienta perfecta para productores, DJs y creadores digitales. Compatible con Ableton Live, Resolume y cualquier software MIDI.',
            targetAudience: [
                'Productores que trabajan con síntesis y modulación',
                'Artistas que prefieren control táctil directo',
                'Músicos que buscan un controlador especializado en perillas',
                'Usuarios de Ableton Live y Resolume'
            ],
            image: '/textures/fotos controladores/KNOBO.png'
        }
    ];

    return (
        <div className="relative bg-gradient-to-b from-[#0a0a16] via-[#120f24] to-[#1a1530] text-white font-['Orbitron'] py-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:100px_100px] opacity-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/20 via-cyan-900/10 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <div className="container mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                            ¿Listo para tener tu propio controlador MIDI personalizado?
                        </h1>
                        <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                Ahora puedes comprar y personalizar el instrumento perfecto desde cualquier lugar. Todos nuestros controladores están fabricados en metal, con un diseño único, robusto, de alta calidad y a la vez compacto.
                            </p>
                            <p>
                                Además, puedes elegir los colores del chasis, botones, perillas, faders y pedales, lo que hace que cada pieza sea verdaderamente única.
                            </p>
                            <p className="text-cyan-400 font-bold text-xl mt-8">
                                Entonces, ¿cuál deberías comprar? Te ayudamos a elegir entre nuestros modelos según tus necesidades creativas, tu estilo musical y cómo piensas usarlo, incluso más allá de la música.
                            </p>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="space-y-24 mt-20">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                            >
                                {/* Product Image */}
                                <div className="lg:w-1/2">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                        <div className="relative bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="lg:w-1/2 space-y-6">
                                    <div>
                                        <div className="inline-block px-4 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm font-bold mb-4">
                                            {index + 1}. {product.name}
                                        </div>
                                        <h2 className="text-4xl font-black mb-4 text-white">
                                            {product.subtitle}
                                        </h2>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Target Audience */}
                                    <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            ¿A QUIÉN VA DIRIGIDO EL {product.name.toUpperCase()}?
                                        </h3>
                                        <ul className="space-y-3">
                                            {product.targetAudience.map((audience, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                                    <svg className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{audience}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                                        <span className="relative z-10">Personalizar {product.name}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA */}
                    <div className="mt-32 text-center">
                        <div className="bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
                            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                ¿Listo para crear tu controlador perfecto?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Cada controlador es único y personalizable. Elige los colores, configura tus controles y crea el instrumento de tus sueños.
                            </p>
                            <button className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]">
                                <span className="relative z-10 flex items-center gap-3">
                                    Comenzar a Personalizar
                                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MidiGuide;
