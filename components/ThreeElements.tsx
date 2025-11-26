import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Procedural Models to replace external GLBs for reliability ---

export const GLBModel = ({ path, hover, scale = 1, position = [0, 0, 0] }: { path: string; hover: boolean; scale?: number; position?: [number, number, number] }) => {
  const { scene } = useGLTF(path);
  const ref = useRef<THREE.Group>(null);

  // Clone scene to avoid shared state issues if multiple instances exist
  const clone = React.useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (ref.current) {
      if (hover) {
        ref.current.rotation.y += delta * 1.5;
      } else {
        ref.current.rotation.y += delta * 0.2;
      }
    }
  });

  return (
    <group ref={ref} scale={scale} position={position}>
      <Center top>
        <primitive object={clone} />
      </Center>
    </group>
  );
};

// Preload models to avoid stutter
useGLTF.preload('/models/KNOBO.glb');
useGLTF.preload('/models/LOOPO.glb');
useGLTF.preload('/models/FADO.glb');
useGLTF.preload('/models/BEATO.glb');
useGLTF.preload('/models/MIXO.glb');
useGLTF.preload('/models/BEATO16.glb');

// --- Lighting & Environment ---

export const CyberStage = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 7]} intensity={2} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4c1d95" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#00f3ff" />
      <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
    </>
  );
};