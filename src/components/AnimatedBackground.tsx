'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Light comic theme animated background — moving halftone sections, colored panels
export default function AnimatedBackground() {
    const blob1 = useRef<HTMLDivElement>(null);
    const blob2 = useRef<HTMLDivElement>(null);
    const blob3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to(blob1.current, {
            x: 80, y: 60, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1,
        });
        gsap.to(blob2.current, {
            x: -60, y: -80, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2,
        });
        gsap.to(blob3.current, {
            x: 50, y: -50, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
        });
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {/* Halftone base layer */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1.2px, transparent 1.2px)',
                    backgroundSize: '16px 16px',
                }}
            />

            {/* Yellow blob */}
            <div
                ref={blob1}
                className="absolute rounded-full opacity-40"
                style={{
                    top: '-5%', left: '-5%',
                    width: '500px', height: '500px',
                    background: '#FFE000',
                    filter: 'blur(80px)',
                }}
            />
            {/* Cyan blob */}
            <div
                ref={blob2}
                className="absolute rounded-full opacity-30"
                style={{
                    bottom: '-5%', right: '-5%',
                    width: '600px', height: '600px',
                    background: '#00CFFF',
                    filter: 'blur(100px)',
                }}
            />
            {/* Red blob */}
            <div
                ref={blob3}
                className="absolute rounded-full opacity-20"
                style={{
                    top: '40%', left: '40%',
                    width: '400px', height: '400px',
                    background: '#FF2D2D',
                    filter: 'blur(80px)',
                }}
            />

            {/* Speed lines decorative (subtle) */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'repeating-conic-gradient(#000 0deg, transparent 0.5deg, transparent 6deg)',
                    backgroundPosition: 'center center',
                }}
            />
        </div>
    );
}
