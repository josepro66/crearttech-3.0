import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DViewerProps {
    modelPath: string;
    productName: string;
}

const Model3D = ({ modelPath }: { modelPath: string }) => {
    const { scene } = useGLTF(modelPath);

    React.useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return (
        <Center>
            <primitive
                object={scene}
                scale={20}
                rotation={[0, Math.PI / 4, 0]}
            />
        </Center>
    );
};

const LoadingFallback = () => {
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
    );
};

const Product3DViewer: React.FC<Product3DViewerProps> = ({ modelPath, productName }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="w-full h-[400px] relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative h-full bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
                <Canvas
                    camera={{ position: [0, 3, 6], fov: 50 }}
                    dpr={[1, 2]}
                    shadows
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={<LoadingFallback />}>
                        <ambientLight intensity={1.2} />
                        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                        <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#99ccff" />
                        <pointLight position={[0, 5, 0]} intensity={0.7} />
                        <pointLight position={[5, 0, 5]} intensity={0.5} color="#06b6d4" />

                        <Environment preset="city" />

                        <Model3D modelPath={modelPath} />

                        <OrbitControls
                            enableDamping
                            dampingFactor={0.05}
                            minDistance={3}
                            maxDistance={12}
                            autoRotate
                            autoRotateSpeed={1.5}
                            enablePan={false}
                            target={[0, 0, 0]}
                        />
                    </Suspense>
                </Canvas>

                {/* 3D Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-xs font-bold backdrop-blur-sm">
                    3D INTERACTIVE
                </div>

                {/* Product Name Badge */}
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 border border-white/20 rounded-lg text-white text-sm font-bold backdrop-blur-sm">
                    {productName}
                </div>
            </div>
        </div>
    );
};

export default Product3DViewer;
