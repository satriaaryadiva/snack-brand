'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        img: '/FOTO PRODUCT/DSCF5767.jpg',
        brand: 'SHOGUN',
        name: 'Ramen Snack',
        flavor: 'Chicken Flavour',
        desc: 'Kriuk renyah ala Korea! Rasa ayam gurih bikin nagih di tiap gigitan.',
        tag: '🏆 Best Seller',
        panelBg: '#FFF9E6',
        accent: '#FFE000',
        accentDark: '#FF7A00',
        num: '01',
    },
    {
        img: '/FOTO PRODUCT/DSC04355.jpg',
        brand: 'SHOGUN',
        name: 'Ramen Snack',
        flavor: 'Grilled Shrimp',
        desc: 'Aroma udang bakar autentik dalam kemasan renyah yang menggoda.',
        tag: '🍤 Fan Fave',
        panelBg: '#FFF0E6',
        accent: '#FF7A00',
        accentDark: '#FF2D2D',
        num: '02',
    },
    {
        img: '/FOTO PRODUCT/DSC04424.jpg',
        brand: 'SHOGUN',
        name: '5in1 Mix',
        flavor: 'Campur Kacang',
        desc: 'Lima varian snack dalam satu kemasan. Kejutan rasa di tiap buka!',
        tag: '🎉 Limited',
        panelBg: '#E6FFE6',
        accent: '#00C443',
        accentDark: '#006FFF',
        num: '03',
    },
    {
        img: '/FOTO PRODUCT/DSC00032.jpg',
        brand: 'KAARO',
        name: 'Korean Noodle',
        flavor: 'Original',
        desc: 'Mi goreng ala Korea siap makan langsung. Finger-licking good!',
        tag: '🇰🇷 Original',
        panelBg: '#E0F7FF',
        accent: '#00CFFF',
        accentDark: '#006FFF',
        num: '04',
    },
    {
        img: '/FOTO PRODUCT/DSC00044.jpg',
        brand: 'KAARO',
        name: 'Korean Noodle',
        flavor: 'Special Edition',
        desc: 'Bumbu spesial lebih kaya, rasa yang makin nendang di lidah.',
        tag: '⭐ Special',
        panelBg: '#E6EEFF',
        accent: '#006FFF',
        accentDark: '#FF2D2D',
        num: '05',
    },
];

export default function StickyProductSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const totalWidth = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: () => `+=${totalWidth + 300}`,
                    invalidateOnRefresh: true,
                },
            });

            // Header slide in
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: -20 },
                {
                    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="products"
            className="relative overflow-hidden comic-section"
            style={{ background: '#FFFDF5' }}
        >
            {/* Header bar */}
            <div
                ref={headerRef}
                className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-4 border-b-4 border-[#1A1A1A]"
                style={{ background: '#FFE000' }}
            >
                <div>
                    <p
                        className="text-[#1A1A1A]/60 text-xs font-bold tracking-widest"
                        style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                    >
                        GESER KE KANAN →
                    </p>
                    <h2
                        className="text-2xl md:text-3xl text-[#1A1A1A] leading-none"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em', textShadow: '3px 3px 0 #FF7A00' }}
                    >
                        SEMUA PRODUK
                    </h2>
                </div>
                {/* Dot indicators */}
                <div className="hidden md:flex gap-2">
                    {products.map((p, i) => (
                        <div
                            key={i}
                            className="w-6 h-6 border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-bold"
                            style={{ background: p.accent, fontFamily: 'var(--font-bangers), Bangers, cursive' }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div className="h-screen flex items-center overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex gap-0 will-change-transform"
                    style={{ width: 'max-content' }}
                >
                    {products.map((product, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[340px] md:w-[420px] h-[100vh] md:h-[100vh] relative group border-r-4 border-[#1A1A1A]"
                            style={{ background: product.panelBg }}
                        >
                            {/* Panel number */}
                            <div
                                className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center border-3 border-[#1A1A1A] text-lg"
                                style={{ background: product.accent, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em', boxShadow: '2px 2px 0 #1A1A1A' }}
                            >
                                {product.num}
                            </div>

                            {/* Brand tag */}
                            <div
                                className="absolute top-4 right-4 z-20 px-3 py-1 border-2 border-[#1A1A1A] text-sm"
                                style={{ background: i < 3 ? '#FFE000' : '#00CFFF', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', boxShadow: '2px 2px 0 #1A1A1A' }}
                            >
                                {product.brand}
                            </div>

                            {/* Product image — top 60% of card */}
                            <div className="relative h-[55%] overflow-hidden border-b-4 border-[#1A1A1A]">
                                <Image
                                    src={product.img}
                                    alt={`${product.brand} ${product.flavor}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="420px"
                                />
                                {/* Halftone corner */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-20"
                                    style={{ backgroundImage: `radial-gradient(circle, ${product.accent}99 1.5px, transparent 1.5px)`, backgroundSize: '12px 12px' }}
                                />
                                {/* Action tag */}
                                <div
                                    className="absolute bottom-3 left-3 px-3 py-1 border-2 border-[#1A1A1A] text-xs"
                                    style={{ background: product.accentDark, color: '#fff', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', boxShadow: '2px 2px 0 #1A1A1A' }}
                                >
                                    {product.tag}
                                </div>
                            </div>

                            {/* Content — bottom 45% */}
                            <div className="p-6 flex flex-col gap-2">
                                <div
                                    className="text-sm"
                                    style={{ color: product.accentDark, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em' }}
                                >
                                    {product.flavor}
                                </div>
                                <h3
                                    className="text-2xl md:text-3xl text-[#1A1A1A] leading-none"
                                    style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.04em', textShadow: `3px 3px 0 ${product.accent}` }}
                                >
                                    {product.name}
                                </h3>
                                <p
                                    className="text-sm text-[#1A1A1A]/70 leading-relaxed"
                                    style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                                >
                                    {product.desc}
                                </p>
                                <a
                                    href="#contact"
                                    className="comic-btn mt-auto self-start px-5 py-2 text-base rounded-none"
                                    style={{ background: product.accent, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', color: '#1A1A1A', border: '2px solid #1A1A1A', boxShadow: '3px 3px 0 #1A1A1A' }}
                                >
                                    PESAN SEKARANG →
                                </a>
                            </div>
                        </div>
                    ))}

                    {/* End card */}
                    <div
                        className="flex-shrink-0 w-[280px] md:w-[360px] h-[100vh] md:h-[100vh] flex flex-col items-center justify-center gap-5 text-center p-8 border-r-4 border-[#1A1A1A]"
                        style={{ background: '#1A1A1A' }}
                    >
                        <div
                            className="text-5xl"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', color: '#FFE000', WebkitTextStroke: '2px #FFE000' }}
                        >
                            🛒
                        </div>
                        <h3
                            className="text-2xl text-[#FFE000]"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em', textShadow: '3px 3px 0 #FF7A00' }}
                        >
                            Jadi Reseller?
                        </h3>
                        <p
                            className="text-white  text-sm leading-relaxed"
                            style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                        >
                            Hubungi kami untuk harga grosir dan info distribusi.
                        </p>
                        <a
                            href="#contact"
                            className="comic-btn comic-btn-yellow px-6 py-2.5 text-base rounded-none"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em' }}
                        >
                            HUBUNGI KAMI!
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
