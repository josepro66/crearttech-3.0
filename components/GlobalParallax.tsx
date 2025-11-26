import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function GlobalParallax() {
    const { scrollY } = useScroll();

    // Parallax effects for different layers
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -50]);

    const opacity1 = useTransform(scrollY, [0, 300, 600], [0.6, 0.3, 0.1]);
    const opacity2 = useTransform(scrollY, [0, 400, 800], [0.4, 0.2, 0.05]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Layer 1 - Fastest moving */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="absolute inset-0"
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Layer 2 - Medium speed */}
            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="absolute inset-0"
            >
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-fuchsia-500/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl" />
            </motion.div>

            {/* Layer 3 - Slowest moving */}
            <motion.div
                style={{ y: y3 }}
                className="absolute inset-0 opacity-30"
            >
                <div className="absolute top-2/3 left-1/2 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />
            </motion.div>
        </div>
    );
}
