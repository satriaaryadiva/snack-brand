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
                className={`fixed right-4 md:right-8 top-2/3 -translate-y-1/2 z-[100] flex flex-col items-center gap-4 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-50 pointer-events-none'
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
                            src="/LOGO/logoscrol.jpg"
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

                <div className="w-8 h-[2px]  opacity-20     rounded-full"></div>

                {/* Shopee Button */}
                <a
                    href="https://s.shopee.co.id/9fGYke5HNI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[52px] h-[52px] bg-[#ee4d2d] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto"
                    aria-label="Shop on Shopee"
                >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8  h-8 fill-current"><title>Shopee</title><path d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/></svg>
                </a>

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/6282165101085?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Shogun%20%26%20Kaaro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[52px] h-[52px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto"
                    aria-label="Chat on WhatsApp"
                >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
            </div>
        </>
    );
}
