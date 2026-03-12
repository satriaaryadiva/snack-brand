'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PARTICLES = [
    { emoji: '💥', size: 32, delay: 0, duration: 6, x: 5, y: 20 },
    { emoji: '⭐', size: 24, delay: 1, duration: 8, x: 88, y: 15 },
    { emoji: '💫', size: 20, delay: 0.5, duration: 7, x: 12, y: 72 },
    { emoji: '🍜', size: 26, delay: 2, duration: 5.5, x: 80, y: 65 },
    { emoji: '🔥', size: 22, delay: 1.5, duration: 9, x: 92, y: 40 },
    { emoji: '❗', size: 28, delay: 3, duration: 6.5, x: 3, y: 48 },
    { emoji: '✨', size: 18, delay: 0.8, duration: 8, x: 55, y: 8 },
    { emoji: '💢', size: 24, delay: 2.5, duration: 7, x: 65, y: 85 },
    { emoji: '🦖', size: 26, delay: 1.2, duration: 6, x: 30, y: 88 },
    { emoji: '❕', size: 20, delay: 3.5, duration: 8.5, x: 75, y: 10 },
];

export default function FloatingParticles() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = containerRef.current?.querySelectorAll('.particle');
        if (!elements) return;

        elements.forEach((el, i) => {
            const p = PARTICLES[i];
            gsap.to(el, {
                y: '-=30',
                x: `+=${Math.random() > 0.5 ? 18 : -18}`,
                rotation: Math.random() * 40 - 20,
                duration: p.duration,
                delay: p.delay,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
            gsap.fromTo(
                el,
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.8, delay: p.delay + 0.3, ease: 'back.out(2)' }
            );
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden z-0"
            aria-hidden="true"
        >
            {PARTICLES.map((p, i) => (
                <div
                    key={i}
                    className="particle absolute opacity-0 select-none"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        fontSize: `${p.size}px`,
                        filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.3))',
                    }}
                >
                    {p.emoji}
                </div>
            ))}
        </div>
    );
}
