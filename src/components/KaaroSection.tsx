'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const kaaroProducts = [
    {
        img: '/FOTO PRODUCT/DSC00032.jpg',
        name: 'Korean Noodle',
        flavor: 'Original',
        desc: 'Mi goreng ala Korea yang bisa dimakan langsung! Finger-licking good!',
        weight: '90g',
        tag: '🇰🇷 Original',
        color: '#00CFFF',
    },
    {
        img: '/FOTO PRODUCT/DSC00033.jpg',
        name: 'Korean Noodle',
        flavor: 'Premium Blend',
        desc: 'Bumbu spesial lebih kaya, rasa yang makin nendang di lidah.',
        weight: '90g',
        tag: '⭐ Premium',
        color: '#006FFF',
    },
    {
        img: '/FOTO PRODUCT/DSC00035.jpg',
        name: 'Korean Noodle',
        flavor: 'Siap Dimakan',
        desc: 'Praktis! Buka, makan, kriuk. Tanpa masak, tanpa ribet.',
        weight: '90g',
        tag: '⚡ Instan',
        color: '#FF7A00',
    },
];

const features = ['🇰🇷 Korean Style', '⚡ Ready-to-Eat', '✅ Halal MUI', '😋 Finger-licking Good'];

export default function KaaroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, x: 60 },
                {
                    opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            );
            const cards = cardsRef.current?.querySelectorAll('.k-card');
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 50, rotation: 3 },
                    {
                        opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12,
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="kaaro"
            className="comic-section py-20 overflow-hidden"
            style={{ background: '#F0FAFF' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <div ref={headingRef} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
                    {/* Mascot */}
                    <div className="relative flex-shrink-0 order-2 md:order-1 mt-8 md:mt-0 self-end md:self-auto transform scale-75 md:scale-100 origin-left md:origin-center">
                        <div className="speech-bubble px-4 py-2 absolute -top-8 md:-top-12 -right-12 md:-right-16 z-10 text-sm md:text-base font-bold whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}>
                            Makan yuk! 🦖
                        </div>
                        <div className="border-4 border-[#1A1A1A] rounded-full overflow-hidden float-y-alt bg-white"
                            style={{ boxShadow: '5px 5px 0 #00CFFF, 5px 5px 0 2px #1A1A1A' }}>
                            <Image src="/kaaro_mascot.png" alt="Kaaro Mascot" width={120} height={120} className="object-contain scale-125 md:w-[140px] md:h-[140px]" />
                        </div>
                    </div>

                    <div className="order-1 md:order-2 md:text-right flex-1">
                        <div
                            className="inline-flex items-center px-4 py-1 mb-3 bg-[#006FFF] border-3 border-[#1A1A1A]"
                            style={{ boxShadow: '3px 3px 0 #1A1A1A', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em', color: '#fff', fontSize: '0.85rem' }}
                        >
                            BRAND 02
                        </div>
                        <h2
                            className="text-6xl md:text-7xl text-[#1A1A1A] leading-none block"
                            style={{
                                fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                letterSpacing: '0.04em',
                                WebkitTextStroke: '2px #1A1A1A',
                                textShadow: '5px 5px 0 #00CFFF',
                            }}
                        >
                            KAARO
                        </h2>
                        <p style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                            className="text-[#1A1A1A]/60 mt-2 text-lg">
                            Mi Goreng Korea • 윈래의 Original
                        </p>
                    </div>
                </div>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {features.map((f, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center px-4 py-2 border-3 border-[#1A1A1A] text-sm font-bold"
                            style={{
                                background: i % 2 === 0 ? '#00CFFF' : '#FFE000',
                                fontFamily: 'var(--font-bangers), Bangers, cursive',
                                letterSpacing: '0.08em',
                                boxShadow: '3px 3px 0 #1A1A1A',
                                fontSize: '0.95rem',
                            }}
                        >
                            {f}
                        </span>
                    ))}
                </div>

                {/* Product cards */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {kaaroProducts.map((product, i) => (
                        <div key={i} className="k-card comic-panel rounded-none overflow-hidden group">
                            <div className="relative h-56 overflow-hidden border-b-3 border-[#1A1A1A] bg-[#E0F7FF]">
                                <Image
                                    src={product.img}
                                    alt={`Kaaro ${product.flavor}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-16 halftone-blue opacity-60" />
                                <div
                                    className="absolute top-3 left-3 px-3 py-1 text-[#1A1A1A] text-xs font-bold border-2 border-[#1A1A1A]"
                                    style={{ background: product.color, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', boxShadow: '2px 2px 0 #1A1A1A' }}
                                >
                                    {product.tag}
                                </div>
                            </div>
                            <div className="p-5" style={{ background: '#E0F7FF' }}>
                                <div
                                    className="text-xs font-bold mb-0.5"
                                    style={{ color: '#006FFF', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em', fontSize: '0.9rem' }}
                                >
                                    {product.flavor}
                                </div>
                                <h3
                                    className="text-2xl text-[#1A1A1A] mb-1"
                                    style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em' }}
                                >
                                    {product.name}
                                </h3>
                                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed mb-4"
                                    style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}>
                                    {product.desc}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-xs font-bold px-3 py-1 border-2 border-[#1A1A1A]"
                                        style={{ background: '#00CFFF', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', boxShadow: '2px 2px 0 #1A1A1A' }}
                                    >
                                        {product.weight}
                                    </span>
                                    <a
                                        href="#contact"
                                        className="comic-btn comic-btn-cyan px-4 py-1.5 text-sm rounded-none"
                                        style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em' }}
                                    >
                                        PESAN →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
