'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const shogunProducts = [
    {
        img: '/FOTO PRODUCT/DSCF5767.jpg',
        name: 'Ramen Snack',
        flavor: 'Chicken Flavour',
        desc: 'Kriuk renyah ala Korea! Rasa ayam gurih bikin nagih di tiap gigitan.',
        weight: '18g / sachet',
        tag: '🏆 Best Seller',
        color: '#FFE000',
        accent: '#FF7A00',
    },
    {
        img: '/FOTO PRODUCT/DSC04355.jpg',
        name: 'Ramen Snack',
        flavor: 'Grilled Shrimp',
        desc: 'Aroma udang bakar autentik dalam kemasan renyah yang menggoda.',
        weight: '15g × 30 pcs',
        tag: '🍤 Fan Fave',
        color: '#FF7A00',
        accent: '#FF2D2D',
    },
    {
        img: '/FOTO PRODUCT/DSC04424.jpg',
        name: '5in1 Mix Snack',
        flavor: 'Campur Kacang',
        desc: 'Lima varian snack dalam satu kemasan. Kejutan rasa di tiap buka!',
        weight: '15g / sachet',
        tag: '🎉 Limited',
        color: '#00C443',
        accent: '#006FFF',
    },
];

export default function ShogunSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, x: -60 },
                {
                    opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
                }
            );
            const cards = cardsRef.current?.querySelectorAll('.s-card');
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 50, rotation: -3 },
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
            id="shogun"
            className="comic-section py-20 overflow-hidden"
            style={{ background: '#FFFDF5' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header — comic panel style */}
                <div ref={headingRef} className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
                    <div className="flex-1">
                        {/* Brand number badge */}
                        <div
                            className="inline-flex items-center px-4 py-1 mb-3 bg-[#FF2D2D] border-3 border-[#1A1A1A]"
                            style={{ boxShadow: '3px 3px 0 #1A1A1A', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em', color: '#fff', fontSize: '0.85rem' }}
                        >
                            BRAND 01
                        </div>
                        <h2
                            className="text-6xl md:text-7xl text-[#1A1A1A] leading-none"
                            style={{
                                fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                letterSpacing: '0.04em',
                                WebkitTextStroke: '2px #1A1A1A',
                                textShadow: '5px 5px 0 #FFE000',
                            }}
                        >
                            SHOGUN
                        </h2>
                        <p style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                            className="text-[#1A1A1A]/60 mt-2 text-lg">
                            Snack Ramen Renyah • 바삭바삭 맛있는 스낵
                        </p>
                    </div>
                    {/* Mascot with speech bubble */}
                    <div className="relative flex-shrink-0 mt-8 md:mt-0 self-end md:self-auto transform scale-75 md:scale-100 origin-right md:origin-center">
                        <div className="thought-bubble px-4 py-2 absolute -top-8 md:-top-12 -left-16 md:-left-24 z-10 text-sm md:text-base font-bold whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}>
                            Kriuk kriuk! 😋
                        </div>
                        <div className="border-4 border-[#1A1A1A] rounded-full overflow-hidden float-y bg-white"
                            style={{ boxShadow: '5px 5px 0 #FFE000, 5px 5px 0 2px #1A1A1A' }}>
                            <Image src="/shogun_mascot.png" alt="Shogun Mascot" width={120} height={120} className="object-contain scale-125 md:w-[140px] md:h-[140px]" />
                        </div>
                    </div>
                </div>

                {/* Product cards */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shogunProducts.map((product, i) => (
                        <div
                            key={i}
                            className="s-card comic-panel rounded-none overflow-hidden group"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden border-b-3 border-[#1A1A1A] bg-[#FFF9E6]">
                                <Image
                                    src={product.img}
                                    alt={`${product.name} ${product.flavor}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                                />
                                {/* Halftone corner overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 halftone-yellow opacity-60" />
                                {/* Tag */}
                                <div
                                    className="absolute top-3 left-3 px-3 py-1 bg-[#FF2D2D] text-white text-xs font-bold border-2 border-[#1A1A1A]"
                                    style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', boxShadow: '2px 2px 0 #1A1A1A' }}
                                >
                                    {product.tag}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5" style={{ background: product.color + '22' }}>
                                <div
                                    className="text-xs font-bold mb-0.5"
                                    style={{ color: product.accent, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em', fontSize: '0.9rem' }}
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
                                        style={{ background: product.color, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', boxShadow: '2px 2px 0 #1A1A1A' }}
                                    >
                                        {product.weight}
                                    </span>
                                    <a
                                        href="#contact"
                                        className="comic-btn comic-btn-yellow px-4 py-1.5 text-sm rounded-none"
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
