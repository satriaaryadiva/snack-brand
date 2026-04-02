'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        id: 1,
        text: "GILAAAA! Shogun Chicken Flavour ini renyahnya ga ada obat. Pas banget buat nemenin nugas semalaman!",
        author: "@anakbawang_jkt",
        rating: 5,
        rot: -4,
        x: -30,
        y: 20,
        color: '#00CFFF', // Blue accent
        delay: 0,
        style: 'speech-bubble',
    },
    {
        id: 2,
        text: "Baru nyoba Kaaro yang Original, bumbunya medok banget cuy. Berasa makan langsung di drakor 🤩",
        author: "Budi Santoso",
        rating: 5,
        rot: 6,
        x: 40,
        y: -30,
        color: '#FFFDF5', // White accent
        delay: 0.1,
        style: 'thought-bubble',
    },
    {
        id: 3,
        text: "Udah langganan jadi reseller. Laku keras di kantin sekolah! Untungnya lumayan banget.",
        author: "Ibu Kantin Hits",
        rating: 5,
        rot: -2,
        x: 10,
        y: 40,
        color: '#00C443', // Green accent
        delay: 0.2,
        style: 'panel',
    },
    {
        id: 4,
        text: "POKOKNYA SHRIMP FLAVOUR JUARA 1!! Baunya wangi banget, rasanya gurih nendang. Must buy!",
        author: "@spicylover99",
        rating: 5,
        rot: 8,
        x: -20,
        y: -10,
        color: '#FFFDF5', // White accent
        delay: 0.15,
        style: 'speech-bubble-alt',
    },
    {
        id: 5,
        text: "Iseng beli yang 5in1 Mix, suprise banget rasanya unik-unik. Favorit keluarga sekarang tiap nonton netflix.",
        author: "Keluarga Cemara",
        rating: 5,
        rot: -6,
        x: 30,
        y: 10,
        color: '#FF7A00', // Orange accent
        delay: 0.25,
        style: 'panel-alt',
    }
];

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleGroupRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Bold entrance for title and massive WOW badge
            gsap.fromTo(titleGroupRef.current?.children || [],
                { opacity: 0, scale: 0.2, rotation: -20 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'elastic.out(1, 0.4)',
                    scrollTrigger: {
                        trigger: titleGroupRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // Flashy entrance for cards
            const cards = gsap.utils.toArray('.testi-card');

            cards.forEach((card: any, i) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: (i % 2 === 0) ? -200 : 200, // Slide in from alternating sides
                        rotation: (TESTIMONIALS[i].rot * 5)
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotation: TESTIMONIALS[i].rot,
                        duration: 0.8,
                        delay: TESTIMONIALS[i].delay,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 70%',
                        }
                    }
                );

                // Chaotic float
                gsap.to(card, {
                    y: `+=${Math.random() * 15 + 10}`,
                    rotation: TESTIMONIALS[i].rot + (Math.random() * 6 - 3),
                    duration: 1.5 + Math.random(),
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: Math.random() * 2,
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-48 overflow-hidden comic-section"
            style={{ background: '#FF2D2D' }} // Bold red background
        >
            {/* Sunburst background effect covering everything */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                    background: 'repeating-conic-gradient(from 0deg, #FFE000 0deg, transparent 5deg, transparent 15deg)',
                    backgroundPosition: 'center center',
                    animation: 'spin-slow 60s linear infinite'
                }}
            />

            {/* Huge halftoning overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 3.5px)', backgroundSize: '30px 30px' }}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
      `}} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">

                {/* Giant Comic Header */}
                <div ref={titleGroupRef} className="text-center mb-20 md:mb-32 relative flex flex-col items-center">
                    <div
                        className="inline-block px-10 py-5 border-4 border-[#1A1A1A] bg-[#FFE000] transform -rotate-3"
                        style={{ boxShadow: '12px 12px 0 #1A1A1A' }}
                    >
                        <h2
                            className="text-5xl md:text-7xl text-[#1A1A1A] leading-none tracking-wider"
                            style={{
                                fontFamily: 'var(--font-bangers), Bangers, cursive',
                                WebkitTextStroke: '2px #1A1A1A',
                                textShadow: '5px 5px 0 #FFFDF5'
                            }}
                        >
                            KATA MEREKA!
                        </h2>
                    </div>

                    <div
                        className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-10 transform rotate-12 bg-white px-4 py-1 md:px-6 md:py-2 border-4 border-[#1A1A1A]"
                        style={{
                            fontFamily: 'var(--font-bangers), Bangers, cursive',
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            color: '#FF2D2D',
                            boxShadow: '8px 8px 0 #1A1A1A',
                            zIndex: 20
                        }}
                    >
                        BOOM!
                    </div>
                </div>

                {/* Action-packed Masonry Grid */}
                <div ref={gridRef} className="relative flex flex-wrap justify-center gap-8 md:gap-14">

                    {TESTIMONIALS.map((t, i) => {
                        const basePanelClass = "p-6 md:p-8 border-4 border-[#1A1A1A] w-full max-w-[320px] sm:max-w-sm cursor-pointer hover:z-50 transition-transform duration-300";

                        return (
                            <div
                                key={t.id}
                                className={`testi-card relative flex flex-col justify-between ${basePanelClass} ${i % 2 !== 0 ? 'md:mt-16' : ''}`}
                                style={{
                                    background: t.color,
                                    boxShadow: `10px 10px 0 #1A1A1A`,
                                }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, { scale: 1.1, rotation: 0, duration: 0.3, zIndex: 100 });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, { scale: 1, rotation: t.rot, duration: 0.3, zIndex: 10 });
                                }}
                            >
                                {/* Speech Bubble Tail */}
                                {t.style.includes('speech') && (
                                    <div className="absolute -bottom-5 left-10 w-10 h-10 border-r-4 border-b-4 border-[#1A1A1A] transform rotate-45" style={{ background: t.color, zIndex: -1 }} />
                                )}

                                {/* Comic Ribbon Number */}
                                <div
                                    className="absolute -top-6 -left-6 px-4 py-2 border-4 border-[#1A1A1A] font-bold text-lg transform -rotate-6"
                                    style={{
                                        background: '#FFE000',
                                        fontFamily: 'var(--font-bangers), Bangers, cursive',
                                        letterSpacing: '0.1em',
                                        color: '#1A1A1A',
                                        boxShadow: '4px 4px 0 #1A1A1A'
                                    }}
                                >
                                    #{i + 1}
                                </div>

                                {/* Stars */}
                                <div className="flex gap-2 mb-6 pt-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <svg key={i} className="w-8 h-8 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(2px 2px 0px white)' }}>
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Main Quote */}
                                <p
                                    className="text-[#1A1A1A] text-xl leading-snug mb-8 flex-grow"
                                    style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 800 }}
                                >
                                    "{t.text}"
                                </p>

                                {/* Author Block */}
                                <div className="flex items-center gap-4 pt-4 border-t-4 border-[#1A1A1A]">
                                    <div
                                        className="w-12 h-12 rounded-full border-4 border-[#1A1A1A] flex items-center justify-center text-2xl bg-white"
                                        style={{ filter: 'drop-shadow(3px 3px 0 #1A1A1A)' }}
                                    >
                                        👤
                                    </div>
                                    <div>
                                        <h4
                                            className="text-[#1A1A1A] leading-none text-2xl"
                                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em' }}
                                        >
                                            {t.author}
                                        </h4>
                                        <span className="text-sm font-black font-sans text-white px-2 py-0.5 mt-1 inline-block bg-[#1A1A1A] transform -skew-x-12">
                                            VERIFIED
                                        </span>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
