'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: '2', label: 'Merek Snack', bg: '#FFE000', icon: '🏷️', textColor: '#020101ff' },
    { value: '5+', label: 'Varian Rasa', bg: '#FF2D2D', icon: '🌶️', textColor: '#000000ff' },
    { value: '100%', label: 'Halal', bg: '#00C443', icon: '✅', textColor: '#020101ff' },
    { value: '4.9★', label: 'Rating Pelanggan', bg: '#FF2D2D', icon: '⭐', textColor: '#fff' },
];

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(statsRef.current?.querySelectorAll('.stat-box') ?? [],
                { opacity: 0, y: 50, scale: 0.8, rotation: -10 },
                {
                    opacity: 1, y: 0, scale: 1, rotation: (i) => (i % 2 === 0 ? 2 : -2),
                    duration: 0.8, ease: 'back.out(1.5)', stagger: 0.15,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="comic-section h-fit flex flex-col justify-center py-0 overflow-hidden relative"
            style={{ background: '#FF7A00' }}
        >
            {/* Halftone background variant */}
            <div className="absolute inset-0 halftone opacity-30 z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      

                {/* Massive Stats Grid */}
                <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="stat-box border-4 border-[#1A1A1A] p-6  flex flex-col items-center justify-center transition-transform hover:scale-110"
                            style={{ background: s.bg, boxShadow: '8px 8px 0 #1A1A1A' }}
                        >
                            <div className="text-6xl md:text-8xl mb-4 drop-shadow-lg filter">{s.icon}</div>
                            <div
                                className="text-7xl md:text-xl lg:text-xl leading-none mb-2"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em', color: s.textColor ?? '#1A1A1A', WebkitTextStroke: s.textColor === '#fff' ? '3px #1A1A1A' : '0px' }}
                            >
                                {s.value}
                            </div>
                            <div
                                className="text-xl md:text-3xl mt-2 font-bold text-center border-t-4 border-[#1A1A1A] pt-4 w-full"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em', color: s.textColor ?? '#1A1A1A' }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
