import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

function Logo3D() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                <Center>
                    {/* Logo Text - CREART */}
                    <mesh position={[-2.5, 0, 0]}>
                        <boxGeometry args={[4, 1.5, 0.5]} />
                        <meshStandardMaterial
                            color="#00f5ff"
                            emissive="#00f5ff"
                            emissiveIntensity={0.5}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Logo Text - TECH */}
                    <mesh position={[2.5, 0, 0]}>
                        <boxGeometry args={[4, 1.5, 0.5]} />
                        <meshStandardMaterial
                            color="#a259ff"
                            emissive="#a259ff"
                            emissiveIntensity={0.5}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Center Accent */}
                    <mesh position={[0, 0, 0.3]}>
                        <sphereGeometry args={[0.4, 32, 32]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#ffffff"
                            emissiveIntensity={1}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                </Center>
            </Float>

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#a259ff" />
            <directionalLight position={[0, 5, 5]} intensity={0.8} />
        </group>
    );
}

export default function LogoViewer() {
    return (
        <div className="h-full w-full">
            <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                <Logo3D />
            </Canvas>
        </div>
    );
}
