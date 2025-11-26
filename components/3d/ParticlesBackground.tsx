import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);

    const particlesCount = 2000;

    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#00f5ff"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticlesBackground() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <Particles />
            </Canvas>
        </div>
    );
}
