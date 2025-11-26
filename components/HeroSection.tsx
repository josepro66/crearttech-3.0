import React, { Suspense, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// Componente de partículas espaciales mejorado con colores
function SpaceParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 150 + 50;
            const angle = Math.random() * Math.PI * 2;

            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = (Math.random() - 0.5) * 250;
            positions[i3 + 2] = Math.sin(angle) * radius - Math.random() * 300;

            // Colores holográficos (cyan, magenta, purple)
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i3] = 0.0;
                colors[i3 + 1] = 0.95;
                colors[i3 + 2] = 1.0;
            } else if (colorChoice < 0.66) {
                colors[i3] = 0.8;
                colors[i3 + 1] = 0.0;
                colors[i3 + 2] = 1.0;
            } else {
                colors[i3] = 1.0;
                colors[i3 + 1] = 1.0;
                colors[i3 + 2] = 1.0;
            }

            velocities[i] = Math.random() * 3 + 1.5;
            sizes[i] = Math.random() * 0.6 + 0.2;
        }

        return { positions, colors, velocities, sizes };
    }, []);

    useFrame(() => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < positions.length / 3; i++) {
                const i3 = i * 3;

                positions[i3 + 2] += particles.velocities[i];

                if (positions[i3 + 2] > 60) {
                    positions[i3 + 2] = -300;
                    const radius = Math.random() * 150 + 50;
                    const angle = Math.random() * Math.PI * 2;
                    positions[i3] = Math.cos(angle) * radius;
                    positions[i3 + 1] = (Math.random() - 0.5) * 250;
                }
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particles.sizes.length}
                    array={particles.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.5}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Nebulosa de fondo
function NebulaCloud() {
    const cloudRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (cloudRef.current) {
            cloudRef.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <mesh ref={cloudRef} position={[0, 0, -100]}>
            <planeGeometry args={[300, 300]} />
            <meshBasicMaterial
                color="#6b21a8"
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// Logo 3D Model
function Logo3DModel() {
    const gltf = useGLTF('/models/logo3d.glb') as any;

    const scene = useMemo(() => {
        const clonedScene = gltf.scene.clone();

        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                const plasticMaterial = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color(0xd946ef),
                    metalness: 0.2,
                    roughness: 0.15,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.05,
                    reflectivity: 1.0,
                    envMapIntensity: 2.0,
                    emissive: new THREE.Color(0xd946ef),
                    emissiveIntensity: 0.3,
                });

                child.material = plasticMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        return clonedScene;
    }, [gltf.scene]);

    return (
        <primitive
            object={scene}
            scale={150}
            position={[0, 10, 0]}
            rotation={[0, Math.PI, 0]}
        />
    );
}

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Fondo void oscuro con gradientes holográficos */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-cyan-950/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(139,92,246,0.1)_50%,_transparent_100%)]"></div>
            </div>

            {/* Grid holográfico */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30"></div>

            {/* Líneas holográficas diagonales */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent"></div>
                <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>

            {/* 3D Canvas con partículas y logo */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 55], fov: 85 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <Suspense fallback={null}>
                        <NebulaCloud />
                        <SpaceParticles />

                        {/* Iluminación holográfica */}
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[5, 5, 5]} intensity={2} color="#06b6d4" />
                        <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#a855f7" />
                        <pointLight position={[10, 10, 10]} intensity={3} color="#06b6d4" />
                        <pointLight position={[-10, -10, -10]} intensity={2} color="#d946ef" />
                        <pointLight position={[0, -10, 5]} intensity={2.5} color="#8b5cf6" />
                        <spotLight
                            position={[0, 15, 0]}
                            angle={0.4}
                            penumbra={1}
                            intensity={3}
                            color="#06b6d4"
                            castShadow
                        />

                        {/* Logo 3D con controles */}
                        <PresentationControls
                            global
                            config={{ mass: 2, tension: 500 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, 0, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                        >
                            <Logo3DModel />
                        </PresentationControls>
                    </Suspense>
                </Canvas>
            </div>

            {/* Efecto de viñeta oscura */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-40 pointer-events-none"></div>

            {/* Content con efectos holográficos */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge holográfico */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block mb-8"
                    >
                        <span className="px-6 py-2 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            ✨ Nueva Generación de Controladores MIDI
                        </span>
                    </motion.div>

                    {/* Subtitle con efecto holográfico */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-3xl md:text-5xl text-gray-400 mb-12 max-w-3xl mx-auto font-bold"
                    >
                        CONTROLADORES MIDI PERSONALIZADOS{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 font-bold">
                        </span>
                    </motion.p>

                    {/* CTA Buttons con efectos holográficos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a
                            href="#productos"
                            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-lg overflow-hidden transition-all hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                            <span className="relative z-10">Explorar Productos</span>
                        </a>
                        <a
                            href="#about"
                            className="px-8 py-4 bg-white/5 border border-cyan-400/30 text-cyan-300 font-bold rounded-lg backdrop-blur-md hover:bg-white/10 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                        >
                            Conocer Más
                        </a>
                    </motion.div>

                    {/* Stats con efectos holográficos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
                    >
                        {[
                            { value: '500+', label: 'Clientes', color: 'from-cyan-400 to-cyan-600' },
                            { value: '100%', label: 'Personalizable', color: 'from-purple-400 to-purple-600' },
                            { value: '24/7', label: 'Soporte', color: 'from-fuchsia-400 to-fuchsia-600' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${stat.color} drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator holográfico */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
