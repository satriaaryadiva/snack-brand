'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const shogunImgRef = useRef<HTMLDivElement>(null);
    const kaaroImgRef = useRef<HTMLDivElement>(null);
    const panelTopRef = useRef<HTMLDivElement>(null);
    const powRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.4 });

        tl.fromTo(panelTopRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
            .fromTo(
                headlineRef.current?.querySelectorAll('.hero-word') ?? [],
                { opacity: 0, y: 60, skewY: 5 },
                { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: 'power4.out', stagger: 0.12 },
                '-=0.1'
            )
            .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
            .fromTo(ctaRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
            .fromTo(shogunImgRef.current, { opacity: 0, x: -60, rotation: -15 }, { opacity: 1, x: 0, rotation: -6, duration: 0.9, ease: 'power3.out' }, '-=0.5')
            .fromTo(kaaroImgRef.current, { opacity: 0, x: 60, rotation: 15 }, { opacity: 1, x: 0, rotation: 6, duration: 0.9, ease: 'power3.out' }, '-=0.8')
            .fromTo(powRef.current, { opacity: 0, scale: 0, rotation: -30 }, { opacity: 1, scale: 1, rotation: -12, duration: 0.6, ease: 'back.out(2)' }, '-=0.3');

        // Float loops
        gsap.to(shogunImgRef.current, { y: -14, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
        gsap.to(kaaroImgRef.current, { y: -18, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    }, []);

    return (
        <section ref={sectionRef} id="home" className="relative h-[100vh] comic-section flex items-center justify-center overflow-hidden" style={{ background: '#FFFDF5' }}>
            {/* Top panel stripe */}
            <div
                ref={panelTopRef}
                className="absolute top-10 left-0 right-0 h-2 bg-[#1A1A1A] opacity-0"
            />

            {/* Halftone background */}
            <div className="absolute inset-0 halftone opacity-50 z-0" />

            {/* Yellow speed-lines burst, top-right */}
            <div
                className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 z-0"
                style={{
                    background: 'conic-gradient(from 0deg at 100% 0%, #FFE000 0deg, transparent 20deg, #FFE000 40deg, transparent 60deg, #FFE000 80deg, transparent)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Comic panel grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    {/* LEFT: Text panel */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1">
                        {/* "EPISODE 1" ribbon */}
                        <div
                            className="inline-flex items-center gap-3 self-start px-4 py-2 border-3 border-[#1A1A1A] bg-[#FF2D2D]"
                            style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
                        >
                            <span
                                className="text-white font-comic text-sm tracking-widest"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.15em' }}
                            >
                                ★ EDISI SPESIAL ★
                            </span>
                        </div>

                        {/* Main headline */}
                        <div ref={headlineRef} className="overflow-hidden">
                            <h1 style={{ fontFamily: 'var(--font-bangers), Bangers, Impact, cursive', lineHeight: 0.9 }}>
                                <span className="hero-word block text-[clamp(3.5rem,15vw,5rem)] md:text-7xl lg:text-8xl text-[#FFE000] opacity-0"
                                    style={{ WebkitTextStroke: 'max(2px, 0.5vw) #1A1A1A', textShadow: 'min(5px, 1.2vw) min(5px, 1.2vw) 0 #00C443', letterSpacing: '0.04em' }}>
                                    SHOGUN
                                </span>
                                <span className="hero-word block text-xl md:text-2xl text-[#1A1A1A] opacity-0 my-2"
                                    style={{ letterSpacing: '0.4em' }}>
                                    — & —
                                </span>
                                <span className="hero-word block text-[clamp(3.5rem,15vw,5rem)] md:text-7xl lg:text-8xl text-[#FF2D2D] opacity-0"
                                    style={{ WebkitTextStroke: 'max(2px, 0.5vw) #1A1A1A', textShadow: 'min(5px, 1.2vw) min(5px, 1.2vw) 0 #1A1A1A', letterSpacing: '0.04em' }}>
                                    KAARO
                                </span>
                            </h1>
                        </div>

                        {/* Speech bubble subtitle */}
                        <div ref={subRef} className="speech-bubble px-5 py-4 max-w-md self-start opacity-0">
                            <p className="text-[#1A1A1A] text-base leading-relaxed font-bold"
                                style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}>
                                Snack ramen renyah <strong className="text-[#FF7A00]">Shogun</strong> bertemu mi goreng
                                Korea autentik <strong className="text-[#FF2D2D]">Kaaro</strong>. Dua merek, satu
                                sensasi — <em>bikin nagih!</em>
                            </p>
                        </div>

                        {/* CTA row */}
                        <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
                            <MagneticButton
                                href="#shogun"
                                as="a"
                                className="comic-btn bg-yellow-500   px-7 py-3 text-xl rounded-none"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em' } as React.CSSProperties}
                            >
                                🍜 SHOGUN!
                            </MagneticButton>
                            <MagneticButton
                                href="#kaaro"
                                as="a"
                                className="comic-btn bg-red-500  px-7 py-3 text-xl rounded-none"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em' } as React.CSSProperties}
                            >
                                KAARO!
                            </MagneticButton>
                            <MagneticButton
                                href="#products"
                                as="a"
                                className="comic-btn comic-btn-outline px-7 py-3 text-xl rounded-none"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em' } as React.CSSProperties}
                            >
                                Lihat Produk ↓
                            </MagneticButton>
                        </div>
                    </div>

                    {/* RIGHT: Products panel */}
                    <div className="relative w-full flex flex-col items-center justify-center gap-8 lg:gap-8 mt-4 lg:mt-0 order-1 lg:order-2">

                        {/* POW! action word */}
                 
 

                        {/* Kaaro product image */}
                        <div
                            ref={kaaroImgRef}
                            className="w-full flex justify-center lg:justify-end lg:pr-12 relative z-20"
                            style={{ filter: 'drop-shadow(8px 8px 0 rgba(0,0,0,0.15))' }}
                        >
                            <div className="relative">
                                {/* Decorative Background Blob/Splash */}
                                <div className="absolute inset-0 bg-[#FF2D2D] rounded-3xl transform rotate-6 scale-110 -z-10 border-4 border-[#1A1A1A]" />
                                <div className="absolute inset-0 halftone opacity-40 rounded-3xl transform rotate-6  -z-10" />

                                {/* Mascot Top Left Corner */}

                                <Image src="/MONSTER BRANDING/KARO 1.png" alt="Kaaro Mascot" width={200} height={200} priority className="absolute -top-12 -left-4 md:-top-15 md:-left-10 lg:top-30 lg:-left-32 overflow-hidden float-y-alt z-30 bg-transparent w-[20vw] max-w-[140px] sm:max-w-[180px] h-auto lg:scale-125" />


                                {/* Product Image Box */}
                                <div className="border-4 border-[#1A1A1A] rounded-2xl overflow-hidden bg-white relative w-[65vw] max-w-[200px] sm:max-w-[200px] md:max-w-[240px] aspect-square transition-transform duration-300 hover:scale-105" style={{ boxShadow: '8px 8px 0 #1A1A1A' }}>
                                    <div className="absolute inset-0 p-4">
                                        <Image
                                            src="/FOTO PRODUCT/bagkaro.png"
                                            alt="Kaaro Korean Fried Noodle"
                                            fill
                                            sizes="(max-width: 768px) 300px, 400px"
                                            className="object-cover"
                                            style={{ transform: 'rotate(8deg) scale(1.1)' }}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shogun product image */}
                        <div
                            ref={shogunImgRef}
                            className="w-full flex justify-center lg:justify-start lg:pl-12 relative z-10"
                            style={{ filter: 'drop-shadow(8px 8px 0 rgba(229, 255, 0, 1))' }}
                        >
                            <div className="relative">
                                {/* Decorative Background Blob/Splash */}
                                <div className="absolute inset-0 bg-[#00C443] rounded-3xl transform -rotate-6 scale-110 -z-10 border-4 border-[#1A1A1A]" />
                                <div className="absolute inset-0 halftone opacity-40 rounded-3xl transform -rotate-6 scale-110 -z-10" />

                                {/* Mascot Bottom Right Corner */}

                                <Image src="/MONSTER BRANDING/Shogun.png" alt="Shogun Mascot" width={120} height={120} priority className="absolute -bottom-8 -right-4 md:-bottom-10 md:-right-10 lg:-bottom-2 lg:-right-32 overflow-hidden float-y z-30 bg-transparent w-[25vw] max-w-[110px] sm:max-w-[160px] h-auto" />


                                {/* Product Image Box */}
                                <div className="border-4 border-[#1A1A1A] rounded-2xl overflow-hidden bg-white relative w-[65vw] max-w-[200px] sm:max-w-[240px] md:max-w-[240px] aspect-square transition-transform duration-300 hover:scale-105" style={{ boxShadow: '8px 8px 0 #1A1A1A' }}>
                                    <div className="absolute top-0 right-0 w-full h-full p-4">
                                        <Image
                                            src="/FOTO PRODUCT/hero-shogun.png"
                                            alt="Shogun Chicken Ramen Snack"
                                            fill
                                            sizes="(max-width: 768px) 400px, 500px"
                                            className="object-cover"
                                            style={{ transform: 'rotate(-5deg) scale(1.15) translateY(10px)' }}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
