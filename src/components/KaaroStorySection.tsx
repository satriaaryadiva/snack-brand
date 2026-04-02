'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function KaaroStorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal the text (right side)
            gsap.fromTo(textRef.current,
                { opacity: 0, x: 100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Reveal the image (left side)
            gsap.fromTo(imgRef.current,
                { opacity: 0, x: -100, rotation: -10, scale: 0.8 },
                {
                    opacity: 1,
                    x: 0,
                    rotation: 4,
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Floating animation for the image
            gsap.to(imgRef.current, {
                y: '+=20',
                rotation: 2,
                duration: 3,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden comic-section min-h-[80vh] flex items-center"
            style={{ background: '#FFFDF5' }}
        >
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />

            {/* TORN WRAPPER EFFECT - LEFT (Blue) */}
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 z-20 pointer-events-none">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    <pattern id="torn-left" width="100%" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 0 0 L 100 15 L 20 30 L 100 45 L 0 60 Z" fill="#00CFFF" stroke="#1A1A1A" strokeWidth="4" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#torn-left)" />
                </svg>
            </div>

            {/* TORN WRAPPER EFFECT - RIGHT (Yellow) */}
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 z-20 pointer-events-none">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    <pattern id="torn-right" width="100%" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 15 L 80 30 L 0 45 L 100 60 Z" fill="#FFE000" stroke="#1A1A1A" strokeWidth="4" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#torn-right)" />
                </svg>
            </div>

            {/* MAIN CONTENT (Image Left, Text Right) */}
            <div className="relative z-10 max-w-7xl mx-auto px-12 md:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT: IMAGE */}
                    <div className="relative flex justify-center order-2 lg:order-1" ref={imgRef}>
                        <div
                            className="absolute inset-0 bg-[#00CFFF] border-4 border-[#1A1A1A] transform -rotate-6"
                            style={{ boxShadow: '12px 12px 0 #1A1A1A', zIndex: -1 }}
                        />
                        <div
                            className="relative w-[280px] h-[320px] sm:w-[300px] sm:h-[360px] md:w-[400px] md:h-[480px] border-4 border-[#1A1A1A] bg-white p-4"
                            style={{ boxShadow: '8px 8px 0 #1A1A1A' }}
                        >
                            <Image
                                src="/FOTO PRODUCT/DSC00044.jpg"
                                alt="Kaaro Noodle Story"
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 768px) 300px, 400px"
                            />

                            {/* Comic Action Star */}
                            <div
                                className="absolute -top-10 -left-8 px-4 py-3 bg-[#FF2D2D] border-4 border-[#1A1A1A] transform -rotate-12 z-20"
                                style={{
                                    boxShadow: '4px 4px 0 #1A1A1A',
                                    fontFamily: 'var(--font-bangers), Bangers, cursive',
                                    color: '#FFE000',
                                    fontSize: '2.5rem',
                                    WebkitTextStroke: '1px #1A1A1A'
                                }}
                            >
                                SLURRP!
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: TEXT */}
                    <div className="flex flex-col gap-6 order-1 lg:order-2" ref={textRef}>
                        <div
                            className="inline-flex items-center self-start px-4 py-1.5 border-3 border-[#1A1A1A] bg-[#00CFFF] text-[#1A1A1A]"
                            style={{
                                boxShadow: '4px 4px 0 #1A1A1A',
                                fontFamily: 'var(--font-bangers), Bangers, cursive',
                                letterSpacing: '0.15em',
                                fontSize: '1rem'
                            }}
                        >
                            ★ KAARO STORY ★
                        </div>

                        <h2
                            className="leading-none text-[#1A1A1A]"
                            style={{
                                fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                fontSize: 'clamp(3rem, 5vw, 5rem)',
                                letterSpacing: '0.03em',
                                WebkitTextStroke: '2px #1A1A1A',
                                textShadow: '4px 4px 0 #00CFFF'
                            }}
                        >
                            KOREAN BITE,<br />LOCAL VIBE!
                        </h2>

                        <div className="thought-bubble px-6 py-5 max-w-lg">
                            <p
                                className="text-[#1A1A1A] text-lg leading-relaxed"
                                style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                            >
                                Bosan dengan snack mi yang gitu-gitu aja? <strong className="text-[#006FFF] text-xl">Kaaro</strong> hadir membawa sensasi street-food Korea langsung ke rumahmu.
                                Tinggal buka, remas, kocok bumbunya, langsung hap! 🍜🔥
                            </p>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <a
                                href="#products"
                                className="comic-btn px-6 py-3 border-3 border-[#1A1A1A] bg-[#FFE000] text-[#1A1A1A] font-bold text-xl inline-flex gap-2"
                                style={{
                                    fontFamily: 'var(--font-bangers), Bangers, cursive',
                                    letterSpacing: '0.1em',
                                    boxShadow: '5px 5px 0 #1A1A1A'
                                }}
                            >
                                <span>📦</span> BORONG SEKARANG
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
