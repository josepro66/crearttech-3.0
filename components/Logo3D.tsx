import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import * as THREE from 'three';

function Logo3DText({ hover }: { hover: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle rotation animation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

            // Scale on hover
            const targetScale = hover ? 1.1 : 1;
            groupRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <Center>
                    {/* CREART part */}
                    <mesh position={[-1.2, 0, 0]}>
                        <boxGeometry args={[2, 0.6, 0.3]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#00f3ff"
                            emissiveIntensity={0.3}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* TECH part */}
                    <mesh position={[1.2, 0, 0]}>
                        <boxGeometry args={[1.8, 0.6, 0.3]} />
                        <meshStandardMaterial
                            color="#00f3ff"
                            emissive="#00f3ff"
                            emissiveIntensity={0.5}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>

                    {/* Center connector */}
                    <mesh position={[0, 0, 0.2]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial
                            color="#a259ff"
                            emissive="#a259ff"
                            emissiveIntensity={1}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                </Center>
            </Float>

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00f3ff" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a259ff" />
            <directionalLight position={[0, 2, 2]} intensity={0.8} />
        </group>
    );
}

export default function Logo3D() {
    const [hover, setHover] = React.useState(false);

    return (
        <div
            className="w-32 h-12 cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Logo3DText hover={hover} />
            </Canvas>
        </div>
    );
}
