import React, { useState, Suspense, useEffect, useRef, useCallback } from 'react';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import Swal from 'sweetalert2';
import { Product } from '../types';

interface ProductConfiguratorProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

// --- Types & Constants ---

interface PaletteColor {
    hex: string;
}

interface Palettes {
    chasis: Record<string, PaletteColor>;
    buttons: Record<string, PaletteColor>;
    knobs: Record<string, PaletteColor>;
}

const PALETTES: Palettes = {
    chasis: {
        'Verde': { hex: '#7CBA40' },
        'Amarillo': { hex: '#F3E600' },
        'Azul': { hex: '#325EB7' },
        'Blanco': { hex: '#F5F5F5' },
        'Naranja': { hex: '#F47119' },
        'Morado': { hex: '#7B217E' },
        'Rojo': { hex: '#E52421' },
        'Negro': { hex: '#1C1C1C' },
        'Rosa': { hex: '#FF007F' },
        'Gris': { hex: '#808080' },
    },
    buttons: {
        'Verde': { hex: '#7CBA40' },
        'Amarillo': { hex: '#F3E600' },
        'Azul': { hex: '#325EB7' },
        'Blanco': { hex: '#F5F5F5' },
        'Naranja': { hex: '#F47119' },
        'Morado': { hex: '#7B217E' },
        'Rojo': { hex: '#E52421' },
        'Negro': { hex: '#1C1C1C' },
        'Rosa': { hex: '#FF007F' },
        'Gris': { hex: '#808080' },
    },
    knobs: {
        'Verde': { hex: '#7CBA40' },
        'Amarillo': { hex: '#F3E600' },
        'Azul': { hex: '#325EB7' },
        'Blanco': { hex: '#F5F5F5' },
        'Naranja': { hex: '#F47119' },
        'Morado': { hex: '#7B217E' },
        'Rojo': { hex: '#E52421' },
        'Negro': { hex: '#1C1C1C' },
        'Rosa': { hex: '#FF007F' },
        'Gris': { hex: '#808080' },
    }
};

interface ChosenColors {
    chasis: string;
    buttons: Record<string, string>;
    knobs: Record<string, string>;
}

// --- Scene Component ---

const ConfiguratorScene = ({
    product,
    currentView,
    onPartsFound,
    selectedButtons,
    selectedKnobs,
    selectedChasis,
    onPartClick
}: {
    product: Product;
    currentView: string;
    onPartsFound: (parts: { chasis: THREE.Mesh[], buttons: THREE.Mesh[], knobs: THREE.Mesh[] }) => void;
    selectedButtons: THREE.Mesh[];
    selectedKnobs: THREE.Mesh[];
    selectedChasis: THREE.Mesh | null;
    onPartClick: (mesh: THREE.Mesh) => void;
}) => {
    const { scene } = useGLTF(product.modelPath);
    const { camera, gl } = useThree();
    const controlsRef = useRef<any>(null);
    const [modelReady, setModelReady] = useState(false);

    // Camera Views
    const CAMERA_VIEWS = {
        normal: { pos: new THREE.Vector3(0, 5, 5), target: new THREE.Vector3(0, 0, 0) },
        top: { pos: new THREE.Vector3(0, 8, 0), target: new THREE.Vector3(0, 0, 0) },
    };

    const envMap = useLoader(THREE.TextureLoader, '/textures/blackhole.jpg.avif');
    useEffect(() => {
        envMap.mapping = THREE.EquirectangularReflectionMapping;
    }, [envMap]);

    // Setup Lighting & Environment
    useEffect(() => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }, [gl]);

    // Prepare Model Materials
    useEffect(() => {
        if (!scene) return;

        const chasis: THREE.Mesh[] = [];
        const buttons: THREE.Mesh[] = [];
        const knobs: THREE.Mesh[] = [];

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                const name = child.name.toLowerCase();

                if (name.includes('cubechasis') || name.includes('chasis')) {
                    child.material = new THREE.MeshPhysicalMaterial({
                        color: PALETTES.chasis['Gris'].hex,
                        metalness: 0.8,
                        roughness: 0.35,
                        clearcoat: 0.85,
                        clearcoatRoughness: 0.1
                    });
                    chasis.push(child);
                } else if (name.includes('boton')) {
                    child.material = new THREE.MeshPhysicalMaterial({
                        color: PALETTES.buttons['Negro'].hex,
                        metalness: 0.4,
                        roughness: 0.68,
                        clearcoat: 0.85,
                        clearcoatRoughness: 0.08,
                        reflectivity: 0.3,
                        sheen: 0.5,
                        sheenColor: new THREE.Color(0x1C1C1C)
                    });
                    buttons.push(child);
                } else if (name.includes('knob')) {
                    const mat = child.material as THREE.MeshStandardMaterial;
                    if (mat && mat.color) {
                        const lightness = (mat.color.r + mat.color.g + mat.color.b) / 3;
                        if (lightness < 0.5) {
                            child.material = new THREE.MeshStandardMaterial({
                                color: PALETTES.knobs['Negro'].hex,
                                metalness: 0,
                                roughness: 1
                            });
                            knobs.push(child);
                        }
                    }
                } else if (name.includes('aro')) {
                    child.material = new THREE.MeshPhysicalMaterial({
                        color: 0x000000,
                        metalness: 0.0,
                        roughness: 0.2,
                        clearcoat: 0.8,
                        clearcoatRoughness: 0.1,
                        transmission: 0.3,
                        thickness: 0.5,
                        transparent: true,
                        opacity: 0.7
                    });
                }
            }
        });

        onPartsFound({ chasis, buttons, knobs });
        setModelReady(true);
    }, [scene, onPartsFound]);

    // Handle Selection Highlights
    useEffect(() => {
        if (!modelReady) return;

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh && (child.material as THREE.MeshStandardMaterial).emissive) {
                (child.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
            }
        });

        const highlight = (mesh: THREE.Mesh) => {
            if (mesh && (mesh.material as THREE.MeshStandardMaterial).emissive) {
                (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x444444);
            }
        };

        selectedButtons.forEach(highlight);
        selectedKnobs.forEach(highlight);
        if (selectedChasis) highlight(selectedChasis);

    }, [selectedButtons, selectedKnobs, selectedChasis, modelReady, scene]);

    // Camera Animation
    useEffect(() => {
        if (!controlsRef.current) return;

        const targetView = currentView === 'normal' ? CAMERA_VIEWS.normal : CAMERA_VIEWS.top;

        gsap.to(camera.position, {
            duration: 1.2,
            ease: 'power3.inOut',
            x: targetView.pos.x,
            y: targetView.pos.y,
            z: targetView.pos.z
        });

        gsap.to(controlsRef.current.target, {
            duration: 1.2,
            ease: 'power3.inOut',
            x: targetView.target.x,
            y: targetView.target.y,
            z: targetView.target.z,
            onUpdate: () => controlsRef.current.update()
        });

    }, [currentView, camera]);

    return (
        <>
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 4, -1]} intensity={1.2} castShadow />
            <directionalLight position={[-8, 3, -9]} intensity={1.0} color="#99ccff" />
            <directionalLight position={[-8, 3, 15]} intensity={1.0} color="#99ccff" />
            <pointLight position={[0, 5, 5]} intensity={0.7} />
            <directionalLight position={[-5, 30, 0]} intensity={1.2} castShadow />

            <Environment map={envMap} background={false} />

            <Center position={[0, 1, 0]}>
                <primitive
                    object={scene}
                    scale={22}
                    rotation={[0, -Math.PI / 2, 0]}
                    onPointerDown={(e: any) => {
                        e.stopPropagation();
                        onPartClick(e.object);
                    }}
                />
            </Center>

            <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.05}
                minDistance={2}
                maxDistance={10}
                enabled={currentView === 'normal'}
            />
        </>
    );
};

// --- Main Component ---

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ product, onClose, onAddToCart }) => {
    const [currentView, setCurrentView] = useState<'normal' | 'chasis' | 'buttons' | 'knobs'>('normal');
    const [selectable, setSelectable] = useState<{ chasis: THREE.Mesh[], buttons: THREE.Mesh[], knobs: THREE.Mesh[] }>({ chasis: [], buttons: [], knobs: [] });

    const [selectedChasis, setSelectedChasis] = useState<THREE.Mesh | null>(null);
    const [selectedButtons, setSelectedButtons] = useState<THREE.Mesh[]>([]);
    const [selectedKnobs, setSelectedKnobs] = useState<THREE.Mesh[]>([]);

    const [chosenColors, setChosenColors] = useState<ChosenColors>({
        chasis: 'Gris',
        buttons: {},
        knobs: {}
    });

    const handlePartsFound = useCallback((parts: { chasis: THREE.Mesh[], buttons: THREE.Mesh[], knobs: THREE.Mesh[] }) => {
        setSelectable(parts);
    }, []);

    const handlePartClick = useCallback((mesh: THREE.Mesh) => {
        if (currentView === 'normal') return;

        const name = mesh.name.toLowerCase();

        if (currentView === 'chasis' && (name.includes('chasis') || name.includes('cubechasis'))) {
            setSelectedChasis(mesh);
        } else if (currentView === 'buttons' && name.includes('boton')) {
            setSelectedButtons(prev => {
                const exists = prev.find(b => b.uuid === mesh.uuid);
                if (exists) return prev.filter(b => b.uuid !== mesh.uuid);
                return [...prev, mesh];
            });
        } else if (currentView === 'knobs' && name.includes('knob')) {
            setSelectedKnobs(prev => {
                const exists = prev.find(k => k.uuid === mesh.uuid);
                if (exists) return prev.filter(k => k.uuid !== mesh.uuid);
                return [...prev, mesh];
            });
        }
    }, [currentView]);

    const applyColor = (colorName: string, colorHex: string) => {
        if (currentView === 'chasis' && selectedChasis) {
            (selectedChasis.material as THREE.MeshPhysicalMaterial).color.set(colorHex);
            setChosenColors(prev => ({ ...prev, chasis: colorName }));
        } else if (currentView === 'buttons') {
            selectedButtons.forEach(btn => {
                (btn.material as THREE.MeshPhysicalMaterial).color.set(colorHex);
                setChosenColors(prev => ({
                    ...prev,
                    buttons: { ...prev.buttons, [btn.name]: colorName }
                }));
            });
        } else if (currentView === 'knobs') {
            selectedKnobs.forEach(knob => {
                (knob.material as THREE.MeshStandardMaterial).color.set(colorHex);
                setChosenColors(prev => ({
                    ...prev,
                    knobs: { ...prev.knobs, [knob.name]: colorName }
                }));
            });
        }
    };

    const handlePurchase = async () => {
        const result = await Swal.fire({
            title: '¿Confirmar Compra?',
            html: `
                <div style="text-align:left;">
                  <p><strong>Producto:</strong> ${product.name}</p>
                  <p><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
                  <p><strong>Configuración:</strong></p>
                  <ul style="font-size: 0.9em; color: #aaa;">
                    <li>Chasis: ${chosenColors.chasis}</li>
                    <li>Botones Personalizados: ${Object.keys(chosenColors.buttons).length}</li>
                    <li>Knobs Personalizados: ${Object.keys(chosenColors.knobs).length}</li>
                  </ul>
                </div>
            `,
            width: 600,
            background: '#1a1a2e',
            color: '#e5e7eb',
            showCancelButton: true,
            confirmButtonText: 'Añadir al Carrito',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#a259ff'
        });

        if (result.isConfirmed) {
            onAddToCart(product);
            await Swal.fire({
                title: '¡Producto Añadido!',
                html: `<p>${product.name} ha sido añadido al carrito.</p>`,
                icon: 'success',
                background: '#1a1a2e',
                color: '#e5e7eb',
                confirmButtonColor: '#a259ff',
                confirmButtonText: 'Continuar'
            });
            onClose();
        }
    };

    const getTitle = () => {
        switch (currentView) {
            case 'chasis': return 'CHOOSE THE CHASSIS COLOR';
            case 'buttons': return 'CHOOSE THE BUTTONS COLOR';
            case 'knobs': return 'CHOOSE THE KNOBS COLOR';
            default: return 'PERSONALIZA TU CONTROLADOR';
        }
    };

    const getCurrentColors = () => {
        switch (currentView) {
            case 'chasis': return PALETTES.chasis;
            case 'buttons': return PALETTES.buttons;
            case 'knobs': return PALETTES.knobs;
            default: return {};
        }
    };

    const toolIcons = [
        { id: 'normal', icon: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z', title: 'View' },
        { id: 'chasis', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z', title: 'Chassis' },
        { id: 'buttons', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z', title: 'Buttons' },
        { id: 'knobs', icon: 'M15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-3-9C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', title: 'Knobs' }
    ];

    const productIcons = [
        { id: 'beato8', label: 'BEATO8', img: '/textures/beato.png' },
        { id: 'beato16', label: 'BEATO16', img: '/textures/beato16.png' },
        { id: 'knobo', label: 'KNOBO', img: '/textures/knobo.png' },
        { id: 'mixo', label: 'MIXO', img: '/textures/mixo.png' },
        { id: 'loopo', label: 'LOOPO', img: '/textures/loopo.png' },
        { id: 'fado', label: 'FADO', img: '/textures/fado.png' }
    ];

    useEffect(() => {
        setSelectedChasis(null);
        setSelectedButtons([]);
        setSelectedKnobs([]);

        if (currentView === 'chasis' && selectable.chasis.length > 0) {
            setSelectedChasis(selectable.chasis[0]);
        }
    }, [currentView, selectable]);

    return (
        <div className="fixed inset-0 z-50 flex bg-[#120f24] text-white font-['Orbitron'] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/40 via-cyan-900/20 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"></div>
            </div>

            {/* LEFT SIDEBAR - Product Switcher */}
            <div className="w-20 z-20 flex flex-col items-center py-6 gap-6 bg-black/40 backdrop-blur-md border-r border-white/10">
                {productIcons.map((item) => (
                    <button
                        key={item.id}
                        className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center transition-all duration-300 group
                            ${product.name.toLowerCase().includes(item.id.replace(/\d+/g, ''))
                                ? 'bg-cyan-500/20 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                : 'bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10'
                            }`}
                        title={item.label}
                    >
                        <img
                            src={item.img}
                            alt={item.label}
                            className={`w-10 h-10 mb-1 object-contain transition-all duration-300 ${product.name.toLowerCase().includes(item.id.replace(/\d+/g, '')) ? 'opacity-100 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'opacity-50 group-hover:opacity-100'}`}
                        />
                        <span className="text-[7px] font-bold tracking-wider text-gray-400 group-hover:text-white">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 relative z-10 flex flex-col">
                {/* Top Navigation Bar */}
                <div className="h-20 flex items-center justify-between px-8 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-black/40 border border-white/20 rounded hover:bg-cyan-900/30 hover:border-cyan-400 transition-all text-sm font-bold tracking-wider flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                            HOME
                        </button>
                        <button className="px-6 py-2 bg-black/40 border border-white/20 rounded hover:bg-purple-900/30 hover:border-purple-400 transition-all text-sm font-bold tracking-wider flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            USUARIO
                        </button>
                    </div>

                    <h1 className="text-4xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        {product.name.toUpperCase()}
                    </h1>

                    <div className="w-40"></div>
                </div>

                {/* 3D Canvas Area */}
                <div className="flex-1 relative">
                    <Canvas camera={{ position: [3, 4, 3], fov: 45 }} dpr={[1, 2]}>
                        <Suspense fallback={null}>
                            <ConfiguratorScene
                                product={product}
                                currentView={currentView}
                                onPartsFound={handlePartsFound}
                                selectedButtons={selectedButtons}
                                selectedKnobs={selectedKnobs}
                                selectedChasis={selectedChasis}
                                onPartClick={handlePartClick}
                            />
                        </Suspense>
                    </Canvas>

                    {/* Bottom Action Button */}
                    {currentView === 'normal' && (
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                            <button
                                onClick={handlePurchase}
                                className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-full"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 w-full h-full border-2 border-white/50 rounded-full blur-[2px]"></div>
                                <span className="relative text-white font-bold tracking-[0.2em] text-lg drop-shadow-md">
                                    FINISH & ORDER
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SIDEBAR - Tools & Palette */}
            <div className={`fixed right-0 top-0 bottom-0 z-20 flex bg-transparent transition-transform duration-500 ease-in-out ${currentView === 'normal' ? 'translate-x-[calc(100%-4rem)]' : 'translate-x-0'}`}>
                {/* Tools Strip */}
                <div className="w-16 flex flex-col items-center justify-center py-6 gap-4 border-r border-white/5 bg-black/20 backdrop-blur-md border-l border-white/10">
                    {toolIcons.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentView(item.id as any)}
                            className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 relative
                                ${currentView === item.id
                                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-110'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            title={item.title}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-9 h-9 fill-current"
                            >
                                <path d={item.icon} />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Palette Area */}
                <div className="w-80 flex flex-col bg-[#0a0a16]/95 backdrop-blur-xl shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
                    {/* Header */}
                    <div className="h-20 flex items-center justify-center border-b border-white/10 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50 mr-3 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                            <span className="text-cyan-400 font-bold text-xl">C</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {currentView !== 'normal' ? (
                            <>
                                <h2 className="text-white font-bold text-sm tracking-widest mb-6 border-l-4 border-cyan-500 pl-3">
                                    {getTitle()}
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(getCurrentColors()).map(([name, colorData]) => (
                                        <button
                                            key={name}
                                            onClick={() => applyColor(name, colorData.hex)}
                                            className="group relative w-full aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                        >
                                            <div
                                                className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: colorData.hex }}
                                            ></div>

                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-50"></div>

                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-white block text-center">
                                                    {name}
                                                </span>
                                            </div>

                                            {(
                                                (currentView === 'chasis' && chosenColors.chasis === name) ||
                                                (currentView === 'buttons' && Object.values(chosenColors.buttons).includes(name)) ||
                                                (currentView === 'knobs' && Object.values(chosenColors.knobs).includes(name))
                                            ) && (
                                                    <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-black"></div>
                                                )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center mb-4 animate-spin-slow">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-light tracking-wide">SELECT A COMPONENT<br />TO CUSTOMIZE</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductConfigurator;
