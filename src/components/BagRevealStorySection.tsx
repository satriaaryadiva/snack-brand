'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
    { type: 'noodle', size: 80, x: -100, y: -150, rot: -45 },
    { type: 'crumb-red', size: 20, x: 80, y: -180, rot: 30 },
    { type: 'noodle-short', size: 60, x: -50, y: -200, rot: 15 },
    { type: 'crumb-yellow', size: 25, x: 0, y: -120, rot: 80 },
    { type: 'noodle', size: 70, x: 100, y: -130, rot: 120 },
    { type: 'crumb-green', size: 15, x: -80, y: -90, rot: 40 },
    { type: 'noodle-short', size: 50, x: 50, y: -220, rot: -20 },
];

const renderIngredient = (type: string, size: number) => {
    if (type === 'noodle' || type === 'noodle-short') {
        return (
            <div style={{ width: size, height: size, position: 'relative' }}>
                <Image src="/noodle_fragment.png" alt="Noodle Fragment" fill className="object-contain z-50 drop-shadow-xl" />
            </div>
        );
    }
    if (type.startsWith('crumb')) {
        return (
            <div style={{ width: size, height: size, position: 'relative' }}>
                <Image src="/noodle_crumb.png" alt="Noodle Crumb" fill className="object-contain z-50 drop-shadow-md" />
            </div>
        );
    }
    return null;
};

export default function BagRevealStorySection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Shogun (Left)
    const bag1WrapperRef = useRef<HTMLDivElement>(null);
    const bag1TopRef = useRef<HTMLDivElement>(null);
    const bag1BottomRef = useRef<HTMLDivElement>(null);
    const char1Ref = useRef<HTMLDivElement>(null);
    const burst1Ref = useRef<HTMLDivElement>(null);

    // Kaaro (Right)
    const bag2WrapperRef = useRef<HTMLDivElement>(null);
    const bag2TopRef = useRef<HTMLDivElement>(null);
    const bag2BottomRef = useRef<HTMLDivElement>(null);
    const char2Ref = useRef<HTMLDivElement>(null);
    const burst2Ref = useRef<HTMLDivElement>(null);

    // Logos
    const logo1Ref = useRef<HTMLDivElement>(null);
    const logo2Ref = useRef<HTMLDivElement>(null);

    // Story (Phase 4)
    const splitLayoutRef = useRef<HTMLDivElement>(null);
    const textColRef = useRef<HTMLDivElement>(null);
    const imgColRef = useRef<HTMLDivElement>(null);
    // Background Parallax Layers
    const bgDistantRef = useRef<HTMLDivElement>(null);
    const bgMidRef = useRef<HTMLDivElement>(null);
    const bgCloseRef = useRef<HTMLDivElement>(null);

    // Intro Elements
    const introHeadlineRef = useRef<HTMLDivElement>(null);
    const leftCaptionRef = useRef<HTMLDivElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%', // 4 screens of scrolling
                    pin: true,
                    scrub: 2, // Increased from 1 for smoother interpolation
                },
            });

            // ── Background 3D Parallax Effect ──
            gsap.to(bgDistantRef.current, {
                y: '30%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5 // Smoother parallax
                }
            });

            gsap.to(bgMidRef.current, {
                y: '-20%',
                rotation: 5,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2 // Smoother parallax
                }
            });

            gsap.to(bgCloseRef.current, {
                y: '-40%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5 // Smoother parallax
                }
            });

            // ── Phase 1: Bags & Logos Enter, Intro Fades Out, Characters Enter ──
            const startLabel = 'start';
            tl.add(startLabel, 0);

            tl.fromTo([bag1WrapperRef.current, bag2WrapperRef.current, logo1Ref.current, logo2Ref.current],
                { y: '50vh', scale: 0.6, rotation: (i) => i % 2 === 0 ? -15 : 15 },
                { y: '0%', scale: 1, rotation: 0, duration: 1, ease: 'power2.out' },
                startLabel
            );

            // Intro elements fade out early as characters fly in
            tl.to([introHeadlineRef.current, leftCaptionRef.current], {
                opacity: 0,
                scale: 0.8,
                y: -20,
                duration: 0.6,
                ease: 'power2.in',
            }, `${startLabel}+=0.1`); // slightly after bags start moving

            tl.fromTo(char1Ref.current,
                { opacity: 0, x: -50, y: 100, scale: 0 },
                { opacity: 1, x: 0, y: 0, scale: 1, rotation: -10, duration: 1, ease: 'back.out(2)' },
                `${startLabel}+=0.3`
            );

            tl.fromTo(char2Ref.current,
                { opacity: 0, x: 50, y: 100, scale: 0 },
                { opacity: 1, x: 0, y: 0, scale: 1, rotation: 10, duration: 1, ease: 'back.out(2)' },
                `${startLabel}+=0.3`
            );

            tl.to({}, { duration: 0.3 }); // Pause

            // ── Phase 1.5: Fade out Scroll Hint Elements ──
            tl.to(scrollHintRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                ease: 'power2.in',
            }, '-=0.3');

            // ── Phase 2: Tear Open Animation ──
            tl.to([bag1TopRef.current, bag2TopRef.current], {
                y: '-15%',
                rotation: (i) => i === 0 ? -8 : 8,
                x: (i) => i === 0 ? '-2%' : '2%',
                duration: 0.8,
                ease: 'power2.inOut',
            }, 'tear');

            tl.to([bag1BottomRef.current, bag2BottomRef.current], {
                y: '5%',
                rotation: (i) => i === 0 ? 2 : -2,
                duration: 0.8,
                ease: 'power2.inOut',
            }, 'tear');

            // ── Phase 3: Contents Burst ──
            const emojis1 = burst1Ref.current?.querySelectorAll('.ingredient');
            const emojis2 = burst2Ref.current?.querySelectorAll('.ingredient');

            if (emojis1 && emojis2) {
                tl.fromTo([...Array.from(emojis1), ...Array.from(emojis2)],
                    { opacity: 0, scale: 0, x: 0, y: 0, rotation: 0 },
                    {
                        opacity: 1, scale: 1,
                        x: (i) => INGREDIENTS[i % INGREDIENTS.length].x * (i >= INGREDIENTS.length ? -1 : 1), // Kaaro bursts right slightly
                        y: (i) => INGREDIENTS[i % INGREDIENTS.length].y,
                        rotation: (i) => INGREDIENTS[i % INGREDIENTS.length].rot,
                        duration: 1,
                        stagger: 0.05,
                        ease: 'back.out(1.5)',
                    },
                    'tear+=0.2'
                );
            }

            tl.to({}, { duration: 0.5 }); // Pause

            // ── Phase 4: Transition to Split Layout ──
            tl.to([bag1WrapperRef.current, bag2WrapperRef.current, char1Ref.current, char2Ref.current, burst1Ref.current, burst2Ref.current, logo1Ref.current, logo2Ref.current], {
                opacity: 0,
                scale: 1.5,
                duration: 0.8,
                ease: 'power2.in',
            }, 'reveal');

            tl.fromTo(splitLayoutRef.current,
                { opacity: 0, zIndex: -1 },
                { opacity: 1, zIndex: 10, duration: 0.1 },
                'reveal+=0.6'
            );

            tl.fromTo(textColRef.current,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
                'reveal+=0.7'
            );

            tl.fromTo(imgColRef.current,
                { opacity: 0, x: 100, rotation: 10, scale: 0.8 },
                { opacity: 1, x: 0, rotation: -4, scale: 1, duration: 1, ease: 'back.out(1.2)' },
                'reveal+=0.8'
            );

            tl.to(imgColRef.current, {
                y: -30, rotation: -2, duration: 1, ease: 'none',
            });

            // Continuous float for characters during phase 1-3
            gsap.to(char1Ref.current, { y: '+=15', rotation: '-=5', duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
            gsap.to(char2Ref.current, { y: '+=15', rotation: '+=5', duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden comic-section"
            style={{ background: '#FFFDF5' }}
        >
            {/* Background Layers for 3D Parallax */}
            <div ref={bgDistantRef} className="absolute inset-[-20%] w-[140%] h-[140%] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 2px )', backgroundSize: '40px 40px' }} />

            {/* Glowing Color Orbs */}


            <div
                ref={bgCloseRef}
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ background: 'repeating-conic-gradient(from 0deg, #1A1A1A 0deg, transparent 5deg, transparent 15deg)' }}
            />

            {/* Lightning bolt decorators */}


            {/* Top Introductory Quote / Headline */}
            <div ref={introHeadlineRef} className="absolute top-16 md:top-24 left-0 right-0 w-full flex justify-center z-10 pointer-events-none px-4">
                <div className="text-center flex flex-col items-center">
                    <div className="inline-block bg-[#1A1A1A] text-[#FFE000] px-3 py-1 mb-3 font-bold" style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '2px', transform: 'rotate(-2deg)' }}>
                        ★ DISCOVER THE MAGIC ★
                    </div>
                    <h2
                        className="text-[#1A1A1A] leading-[1.1]"
                        style={{
                            fontFamily: 'var(--font-bangers), Bangers, cursive',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            textShadow: '3px 3px 0 #FFF, 5px 5px 0 #00CFFF',
                            WebkitTextStroke: '1px #1A1A1A'
                        }}
                    >
                        APA YANG BIKIN MEREKA <br className="hidden md:block" />
                        <span className="text-[#FF2D2D]" style={{ WebkitTextStroke: '2px #1A1A1A' }}>BEGITU SPESIAL?</span>
                    </h2>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">

                {/* === THE BAGS & CHARACTERS (Phases 1-3) === */}
                <div className="relative z-20 w-full max-w-5xl mx-auto px-2 md:px-4 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 h-full pointer-events-none transform scale-75 sm:scale-90 md:scale-100 mt-12 md:mt-0">

                    {/* SHOGUN (LEFT) */}
                    <div className="relative flex items-center justify-center pointer-events-none">
                        {/* Mascot */}
                        <div ref={char1Ref} className="absolute -left-20 md:-left-32 -top-10 w-32 h-32 md:w-48 md:h-48 z-30">
                            <Image src="/MONSTER BRANDING/SHOGUN.png" alt="Shogun Mascot" fill className="object-contain" />
                            <div className="absolute -top-6 -left-4 px-3 py-1 bg-white border-2 border-yellow-500 rounded-2xl font-bold font-sans text-xs" style={{ boxShadow: '2px 2px 0 #ff0000ff' }}>YUM!</div>
                        </div>

                        <div ref={bag1WrapperRef} className="relative z-20 w-[180px] h-[220px] md:w-[280px] b md:h-[350px]">
                            <div ref={burst1Ref} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                {INGREDIENTS.map((item, i) => (
                                    <div key={`s-${i}`} className="ingredient absolute" style={{ transformOrigin: 'center' }}>
                                        {renderIngredient(item.type, item.size)}
                                    </div>
                                ))}
                            </div>
                            <div ref={bag1TopRef} className="border-4 border-yellow-500 absolute inset-0 z-20" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 25%, 90% 20%, 80% 28%, 70% 18%, 60% 30%, 50% 20%, 40% 30%, 30% 18%, 20% 28%, 10% 20%, 0% 25%)', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}>
                                <Image src="/FOTO PRODUCT/DSCF5767.jpg" alt="Shogun Snack Top" fill className="object-cover scale-160 " style={{ borderRadius: '16px' }} />
                            </div>
                            <div ref={bag1BottomRef} className="border-4 border-yellow-500 absolute inset-0 z-20" style={{ clipPath: 'polygon(0% 25%, 10% 20%, 20% 28%, 30% 18%, 40% 30%, 50% 20%, 60% 30%, 70% 18%, 80% 28%, 90% 20%, 100% 25%, 100% 100%, 0% 100%)', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}>
                                <Image src="/FOTO PRODUCT/DSCF5767.jpg" alt="Shogun Snack Bottom" fill className="object-cover scale-160 border-4 border-[#1A1A1A]" style={{ borderRadius: '16px' }} />
                            </div>
                        </div>

                        {/* Shogun Logo */}
                        <div ref={logo1Ref} className="absolute -bottom-20 md:-bottom-24 w-56 h-20 md:w-80 md:h-38 z-30 border-4 border-[#1A1A1A]" style={{ boxShadow: '6px 6px 0 #faab00ff', transform: 'rotate(-4deg)' }}>
                            <Image src="/LOGO/LOGO SHOGUN.jpg" alt="Shogun Logo" fill className="object-cover   " />
                        </div>
                    </div>

                    {/* KAARO (RIGHT) */}
                    <div className="relative flex  items-center justify-center pointer-events-none mt-16 md:mt-0">
                        {/* Mascot */}
                        <div ref={char2Ref} className="absolute -right-20 md:-right-32 -top-10 w-32 h-32 md:w-48 md:h-48 z-30">
                            <Image src="/MONSTER BRANDING/KARO.png" alt="Kaaro Mascot" fill className="object-contain scale-125" />
                            <div className="absolute -top-6 -right-4 px-3 py-1 bg-white border-2 border-[#1A1A1A] rounded-2xl font-bold font-sans text-xs" style={{ boxShadow: '2px 2px 0 #1A1A1A' }}>WOW!</div>
                        </div>

                        <div ref={bag2WrapperRef} className="relative z-20 w-[180px] h-[220px] md:w-[280px] md:h-[350px]">
                            <div ref={burst2Ref} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                {INGREDIENTS.map((item, i) => (
                                    <div key={`k-${i}`} className="ingredient absolute" style={{ transformOrigin: 'center' }}>
                                        {renderIngredient(item.type, item.size)}
                                    </div>
                                ))}
                            </div>
                            <div ref={bag2TopRef} className="bg-transparent absolute inset-0 z-20" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 25%, 90% 20%, 80% 28%, 70% 18%, 60% 30%, 50% 20%, 40% 30%, 30% 18%, 20% 28%, 10% 20%, 0% 25%)', }}>
                                <Image src="/FOTO PRODUCT/bagkaro.png" alt="Kaaro Snack Top" fill className="object-cover scale-140 border-4 border-[#1A1A1A]" style={{ borderRadius: '16px' }} />
                            </div>
                            <div ref={bag2BottomRef} className="absolute inset-0 z-20" style={{ clipPath: 'polygon(0% 25%, 10% 20%, 20% 28%, 30% 18%, 40% 30%, 50% 20%, 60% 30%, 70% 18%, 80% 28%, 90% 20%, 100% 25%, 100% 100%, 0% 100%)' }}>
                                <Image src="/FOTO PRODUCT/bagkaro.png" alt="Kaaro Snack Bottom" fill className="object-cover scale-140 border-4 border-[#1A1A1A]" style={{ borderRadius: '16px' }} />
                            </div>
                        </div>

                        {/* Kaaro Logo */}
                        <div ref={logo2Ref} className="absolute -bottom-24 md:-bottom-32 w-64 h-24 md:w-96 md:h-36 z-30   border-4 border-[#1A1A1A]" style={{ boxShadow: '6px 6px 0 #00ebfcff', transform: 'rotate(4deg)' }}>
                            <Image src="/LOGO/LOGO KAROO.png" alt="Kaaro Logo" fill className="object-cover  " />
                        </div>
                    </div>

                </div>

                {/* === BRAND STORY REVEAL (Phase 4) === */}
                <div
                    ref={splitLayoutRef}
                    className="absolute inset-0 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-center opacity-0 pointer-events-none"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full pointer-events-auto">
                        {/* TEXT LEFT */}
                        <div ref={textColRef} className="flex flex-col gap-4 md:gap-6 mt-16 md:mt-10">
                            <div className="inline-flex items-center self-start px-4 py-1.5 border-3 border-[#1A1A1A] bg-[#FFE000]" style={{ boxShadow: '4px 4px 0 #1A1A1A', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.15em', fontSize: '0.9rem' }}>
                                ★ THE STORY ★
                            </div>
                            <h2 className="leading-none text-[#1A1A1A]" style={{ fontFamily: 'var(--font-bangers), Bangers, Impact, cursive', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', letterSpacing: '0.03em', WebkitTextStroke: '2px #1A1A1A', textShadow: '5px 5px 0 #00CFFF' }}>
                                RAHASIA DI BALIK<br />KRIUKNYA SHOGUN
                            </h2>
                            <div className="speech-bubble px-6 py-5 max-w-lg border-4 border-[#1A1A1A]" style={{ boxShadow: '6px 6px 0 #1A1A1A' }}>
                                <p className="text-[#1A1A1A] text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}>
                                    Kami menggunakan resep autentik Korea, dipadukan dengan rempah pilihan Nusantara. Hasilnya? Snack ramen yang <strong className="text-[#FF2D2D]">super renyah</strong> dan bikin nagih sejak gigitan pertama! 😋
                                </p>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <div className="comic-panel px-4 py-2 border-3 border-[#1A1A1A] bg-[#00C443] text-black font-bold" style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', fontSize: '1.2rem', boxShadow: '3px 3px 0 #1A1A1A' }}>✅ 100% HALAL</div>
                                <div className="comic-panel px-4 py-2 border-3 border-[#1A1A1A] bg-[#FF7A00] text-black font-bold" style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', fontSize: '1.2rem', boxShadow: '3px 3px 0 #1A1A1A' }}>🔥 SUPER KRIUK</div>
                            </div>
                        </div>

                        {/* IMAGE RIGHT */}
                        <div className="relative flex justify-center items-center">
                            <div ref={imgColRef} className="relative w-[320px] h-[400px] md:w-[450px] md:h-[550px] border-4 border-[#1A1A1A] bg-[#FFF9E6]" style={{ boxShadow: '10px 10px 0 #1A1A1A' }}>
                                <Image src="/FOTO PRODUCT/DSCF5838.jpg" alt="Shogun Product Spread" fill className="object-cover" />
                                <div className="absolute -bottom-6 -left-6 z-20 px-4 py-2 bg-[#FFE000] border-4 border-[#1A1A1A]" style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', fontSize: '2rem', WebkitTextStroke: '1px #1A1A1A', color: '#FF2D2D', boxShadow: '4px 4px 0 #1A1A1A', transform: 'rotate(-10deg)' }}>WOW!</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Side Caption / Callout */}
                <div
                    ref={leftCaptionRef}
                    className="absolute left-4 md:left-8 top-[40%] md:top-1/2 -translate-y-1/2 z-40 flex flex-col pointer-events-none float-y"
                    style={{ transform: 'rotate(-5deg)' }}
                >
                    <div
                        className="bg-white border-3 border-[#1A1A1A] px-3 py-2 md:px-5 md:py-3 rounded-2xl relative"
                        style={{ boxShadow: '4px 4px 0 #FF2D2D' }}
                    >
                        <p
                            className="text-[#1A1A1A] font-bold text-xs md:text-sm text-center leading-tight whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                        >
                            Tarik terus <br /> ke bawah! 👇
                        </p>
                        {/* Little tail pointing to the center */}
                        <div
                            className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white border-r-3 border-b-3 border-[#1A1A1A] transform -translate-y-1/2 rotate-[-45deg]"
                            style={{ boxShadow: '2px 2px 0 #FF2D2D' }}
                        ></div>
                    </div>
                </div>

                {/* Scroll Hint Indicators (Right Side) */}
                <div ref={scrollHintRef} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
                    <button
                        className="float-y-alt cursor-pointer hover:scale-110 hover:rotate-180 transition-transform bg-transparent border-none appearance-none"
                        style={{ filter: 'drop-shadow(4px 4px 0 #1A1A1A)' }}
                        onClick={() => window.scrollBy({ top: -400, behavior: 'smooth' })}
                        aria-label="Scroll Up"
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#00C443" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3l8 10h-5v8H9v-8H4z" />
                        </svg>
                    </button>

                    <div
                        className="py-4 px-1 bg-[#FFE000] border-3 border-[#1A1A1A] rounded-full text-[#1A1A1A] flex items-center justify-center font-bold pointer-events-none"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '-2px', boxShadow: '4px 4px 0 #1A1A1A', fontSize: '1.25rem' }}
                    >
                        SCROLL
                    </div>

                    <button
                        className="float-y cursor-pointer hover:scale-110 transition-transform bg-transparent border-none appearance-none"
                        style={{ filter: 'drop-shadow(4px 4px 0 #1A1A1A)' }}
                        onClick={() => window.scrollBy({ top: 400, behavior: 'smooth' })}
                        aria-label="Scroll Down"
                    >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#00C443" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 21l-8-10h5V3h6v8h5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </section >
    );
}
