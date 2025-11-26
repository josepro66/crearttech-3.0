import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import { Product } from '../types';
import { GLBModel, CyberStage } from './ThreeElements';
import { motion } from 'framer-motion';

interface ProductCard3DProps {
  product: Product;
  onClick: (p: Product) => void;
}

// Simple loader to show while environment/assets load
const LoaderFallback = () => {
  const meshRef = useRef<any>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00f3ff" wireframe opacity={0.3} transparent />
    </mesh>
  );
};

const ProductCard3D: React.FC<ProductCard3DProps> = ({ product, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[480px] rounded-2xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{
        y: -15,
        rotateY: 5,
        rotateX: -5,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(product)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Holographic Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

      {/* Main Card Background - Dark with stars */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Animated Stars Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                           radial-gradient(2px 2px at 60% 70%, white, transparent),
                           radial-gradient(1px 1px at 50% 50%, white, transparent),
                           radial-gradient(1px 1px at 80% 10%, white, transparent),
                           radial-gradient(2px 2px at 90% 60%, white, transparent),
                           radial-gradient(1px 1px at 33% 80%, white, transparent)`,
          backgroundSize: '200% 200%',
          animation: 'twinkle 8s ease-in-out infinite'
        }}></div>
      </div>

      {/* Glowing Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/30 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"></div>

      {/* Top Section - Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-md border border-cyan-400/50 shadow-lg shadow-cyan-500/50">
          <span className="text-white text-xs font-['Orbitron'] font-bold uppercase tracking-widest">
            {product.category}
          </span>
        </div>
      </div>

      {/* Top Right - Price Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className="px-4 py-2 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 rounded-full border-2 border-pink-400/50 shadow-lg shadow-pink-500/50">
          <span className="text-white text-lg font-bold font-['Orbitron']">${product.price}</span>
        </div>
      </div>

      {/* 3D Model Section */}
      <div className="absolute inset-0 top-16 bottom-36 z-10">
        <Canvas camera={{ position: [0, 3, 3], fov: 50 }} dpr={[1, 2]}>
          <Suspense fallback={<LoaderFallback />}>
            <CyberStage />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <GLBModel path={product.modelPath} hover={hovered} scale={(product.scale || 8) * 1.5} />
            </Float>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} color={product.color} />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Info Card */}
      <div className="absolute bottom-0 left-0 w-full p-5 z-20 bg-gradient-to-t from-black/95 via-black/90 to-transparent border-t border-cyan-500/20">
        {/* Product Name with Glow */}
        <h3 className="text-2xl font-['Orbitron'] font-black text-white mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-xs mb-3 line-clamp-2 font-mono">
          {product.description}
        </p>

        {/* Specs - Holographic Tags */}
        <div className="flex flex-wrap gap-2">
          {product.specs.slice(0, 3).map((spec, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-400/40 text-[10px] text-cyan-300 rounded-md font-['Orbitron'] font-bold uppercase tracking-wider backdrop-blur-sm"
              whileHover={{ scale: 1.1, borderColor: 'rgba(34, 211, 238, 0.8)' }}
            >
              {spec}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Holographic Corner Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400/60 rounded-tl-2xl shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-400/60 rounded-br-2xl shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>

      {/* Diagonal Accent Lines */}
      <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 rotate-45 origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 -rotate-45 origin-bottom-left"></div>

      {/* Rarity Indicator (bottom left corner) */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          ></div>
        ))}
      </div>

      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none"
        animate={{
          y: ['-100%', '200%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      ></motion.div>
    </motion.div>
  );
};

export default ProductCard3D;

// Add keyframes for star animation
const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;
document.head.appendChild(style);