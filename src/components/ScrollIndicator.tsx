'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const upBtnRef = useRef<HTMLButtonElement>(null);
    const downBtnRef = useRef<HTMLButtonElement>(null);
    const upInnerRef = useRef<HTMLDivElement>(null);
    const downInnerRef = useRef<HTMLDivElement>(null);
    const mascotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Magnetic Effect Logic
    const handleMouseMove = (e: React.MouseEvent, btnRef: React.RefObject<HTMLElement | null>, innerRef: React.RefObject<HTMLElement | null>) => {
        if (!btnRef.current || !innerRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.5;
        const dy = (e.clientY - cy) * 0.5;

        gsap.to(btnRef.current, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
        gsap.to(innerRef.current, { x: dx * 0.4, y: dy * 0.4, duration: 0.4, ease: 'power3.out' });
    };

    const handleMouseLeave = (btnRef: React.RefObject<HTMLElement | null>, innerRef: React.RefObject<HTMLElement | null>) => {
        if (!btnRef.current || !innerRef.current) return;
        gsap.to([btnRef.current, innerRef.current], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    };

    const createBurst = (e: React.MouseEvent) => {
        const id = Date.now();
        setBursts(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
            setBursts(prev => prev.filter(b => b.id !== id));
        }, 600);
    };

    const scrollUp = (e: React.MouseEvent) => {
        createBurst(e);
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    };

    const scrollDown = (e: React.MouseEvent) => {
        createBurst(e);
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollProgress / 100) * circumference;

    return (
        <>
            {/* Starburst Layer */}
            <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
                {bursts.map(burst => (
                    <div
                        key={burst.id}
                        className="absolute"
                        style={{ left: burst.x, top: burst.y, transform: 'translate(-50%, -50%)' }}
                    >
                        <svg width="140" height="140" viewBox="0 0 100 100" className="animate-[pop-in_0.5s_ease-out_forwards]">
                            <path
                                d="M50 0 L60 30 L95 20 L75 50 L100 70 L65 70 L50 100 L35 70 L0 70 L25 50 L5 20 L40 30 Z"
                                fill="#FF2D2D"
                                stroke="#1A1A1A"
                                strokeWidth="4"
                            />
                            <text x="50" y="60" textAnchor="middle" className="font-comic text-2xl fill-white" style={{ WebkitTextStroke: '1px #1A1A1A' }}>BAM!</text>
                        </svg>
                    </div>
                ))}
            </div>

            <div
                ref={containerRef}
                className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-4 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-50 pointer-events-none'
                    }`}
            >
                {/* Scroll Up + Magnetic */}
                <div className="relative group">
                    <button
                        ref={upBtnRef}
                        onMouseMove={(e) => handleMouseMove(e, upBtnRef, upInnerRef)}
                        onMouseLeave={() => handleMouseLeave(upBtnRef, upInnerRef)}
                        onClick={scrollUp}
                        className="relative z-10 cursor-pointer bg-[#FF7A00] border-4 border-[#1A1A1A] p-2 rounded-2xl group transition-all active:scale-90 active:translate-y-1"
                        style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
                        aria-label="Scroll Up"
                    >
                        <div ref={upInnerRef}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </div>
                        <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity" />
                    </button>
                </div>

                {/* Mascot Center Hub */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Sketchy Progress Ring */}
                    <svg className="absolute -rotate-90 w-full h-full pointer-events-none overflow-visible">
                        <circle
                            cx="40" cy="40" r={radius} stroke="#1A1A1A" strokeWidth="12" fill="transparent" className="opacity-10"
                        />
                        <circle
                            cx="40" cy="40" r={radius}
                            stroke="#00ececff" strokeWidth="8"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round" fill="transparent"
                            className="transition-all duration-500 ease-out"
                            style={{ filter: 'drop-shadow(0 0 4px rgba(8, 228, 0, 0.6))' }}
                        />
                    </svg>

                    {/* Rotating Mascot Head */}
                    <div
                        ref={mascotRef}
                        className="relative w-14 h-14 bg-transparent border-4 border-[#1A1A1A] rounded-full overflow-hidden shadow-[4px 4px 0 #1A1A1A] flex items-center justify-center group cursor-help transition-transform duration-500 ease-out"
                        style={{ transform: `rotate(${scrollProgress * 3.6}deg)` }}
                    >
                        <div className="absolute inset-0 bg-green-500 opacity-10 group-hover:opacity-30 transition-opacity" />
                        <Image
                            src="/MONSTER BRANDING/KARO.png"
                            alt="Progress"
                            width={40}
                            height={40}
                            className="relative z-10 scale-110"
                        />

                        {/* Percentage Overlay on Hover */}
                        <div className="absolute inset-0 bg-[#1A1A1A] opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                            <span className="text-white font-comic text-xs -rotate-[inherit]">
                                {Math.round(scrollProgress)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scroll Down + Magnetic */}
                <div className="relative group">
                    <button
                        ref={downBtnRef}
                        onMouseMove={(e) => handleMouseMove(e, downBtnRef, downInnerRef)}
                        onMouseLeave={() => handleMouseLeave(downBtnRef, downInnerRef)}
                        onClick={scrollDown}
                        className="relative z-10 cursor-pointer bg-[#00C443] border-4 border-[#1A1A1A] p-2 rounded-2xl group transition-all active:scale-90 active:translate-y-1"
                        style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
                        aria-label="Scroll Down"
                    >
                        <div ref={downInnerRef}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                        <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity" />
                    </button>
                </div>
            </div>
        </>
    );
}
