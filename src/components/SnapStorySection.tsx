'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Story panels — each is a full-screen snap stop
const STORY_PANELS = [
    {
        id: 'panel-1',
        brand: 'shogun',
        accentBg: '#FFE000', // Shogun Yellow
        textBg: '#FFFDF5',
        badge: '★ CHAPTER 01 ★',
        badgeBg: '#00C443', // Shogun Green
        headline: 'Ayam Gurih\nBikin Nagih.',
        subhead: 'Shogun Chicken Flavour! Sensasi ramen kriuk dengan bumbu ayam autentik yang pas banget buat ngemil santai.',
        img: '/FOTO PRODUCT/DSCF5767.jpg',
        imgRotate: '-6deg',
        actionWord: 'CRUNCH!',
        actionColor: '#FFE000',
        actionShadow: '#00C443',
        floatEmoji: ['🍜', '⭐', '🔥'],
    },
    {
        id: 'panel-2',
        brand: 'kaaro',
        accentBg: '#FF2D2D', // Kaaro Red
        textBg: '#FFF5F5',
        badge: '★ CHAPTER 02 ★',
        badgeBg: '#1A1A1A', // Kaaro Black
        headline: 'The Crunchy Kaaro',
        subhead: '  Snack mie remes renyah dengan rasa bold, yang bikin setiap gigitan terasa lebih seru dan makin nagih.',
        img: '/FOTO PRODUCT/DSC00032.jpg',
        imgRotate: '8deg',
        actionWord: 'YUM!',
        actionColor: '#FF2D2D',
        actionShadow: '#1A1A1A',
        floatEmoji: ['😋', '🇰🇷', '❗'],
        darkTheme: false,
    },
    {
        id: 'panel-3',
        brand: 'shogun',
        accentBg: '#00C443', // Shogun Green
        textBg: '#F0FFF4',
        badge: '★ CHAPTER 03 ★',
        badgeBg: '#FFE000', // Shogun Yellow
        headline: 'Shogun Grilled Shrimp! ',
        subhead: ' Sensasi snack renyah dengan cita rasa udang bakar yang gurih dan menggoda di setiap genggaman.',
        img: '/FOTO PRODUCT/DSC04355.jpg',
        imgRotate: '-4deg',
        actionWord: 'BOOM!',
        actionColor: '#00C443',
        actionShadow: '#1A1A1A',
        floatEmoji: ['🍤', '🦐', '💥'],
    },
    {
        id: 'panel-4',
        brand: 'shogun',
        accentBg: '#FFE000', // Shogun Yellow
        textBg: '#FFF9E6',
        badge: '★ CHAPTER 04 ★',
        badgeBg: '#00C443', // Shogun Green
        headline: '5 Rasa\nDalam 1 Buka.',
        subhead: 'Shogun 5in1 Mix! Lima varian rasa legendaris dalam satu kemasan besar. Siap dibagi-bagi!',
        img: '/FOTO PRODUCT/DSC04424.jpg',
        imgRotate: '-5deg',
        actionWord: 'POW!',
        actionColor: '#FFE000',
        actionShadow: '#00C443',
        floatEmoji: ['🎉', '✨', '⚡'],
    },
    {
        id: 'panel-5',
        brand: 'kaaro',
        accentBg: '#1A1A1A', // Kaaro Black
        textBg: '#1A1A1A', // Dark panel
        badge: '★ CHAPTER 05 ★',
        badgeBg: '#FF2D2D', // Kaaro Red
        headline: 'Si Paling\nPremium.',
        subhead: 'Kaaro Premium Blend! Perpaduan sempurna antara cita rasa mi instan Korea yang otentik dengan sentuhan rempah khas Nusantara. Hadir dalam kemasan praktis yang siap dinikmati kapan saja.',
        img: '/FOTO PRODUCT/DSC00033.jpg',
        imgRotate: '5deg',
        actionWord: 'HOT!',
        actionColor: '#FF2D2D',
        actionShadow: '#FFF',
        floatEmoji: ['🌶️', '🔥', '🏆'],
        darkTheme: true,
    },
];

export default function SnapStorySection() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            panelRefs.current.forEach((panel, i) => {
                if (!panel) return;

                const textEl = panel.querySelector('.story-text');
                const imageEl = panel.querySelector('.story-image');
                const actionEl = panel.querySelector('.story-action');
                const headlineEl = panel.querySelector('.story-headline');
                const floatEls = panel.querySelectorAll('.story-float');
                const badgeEl = panel.querySelector('.story-badge');
                const subEl = panel.querySelector('.story-sub');

                // ── Entrance timeline (triggered when panel scrolls into view) ──
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });

                // Badge pop in
                tl.fromTo(
                    badgeEl,
                    { opacity: 0, scale: 0, rotation: -20 },
                    { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }
                );

                // Headline words split
                const words = headlineEl?.querySelectorAll('.word') ?? [];
                tl.fromTo(
                    words,
                    { opacity: 0, y: 60, skewY: 8 },
                    { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: 'power4.out', stagger: 0.1 },
                    '-=0.2'
                );

                // Subtext fade
                tl.fromTo(
                    subEl,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                );

                // Image swing in (bag-opening effect)
                tl.fromTo(
                    imageEl,
                    { opacity: 0, x: 80, rotation: 20, scale: 0.8 },
                    {
                        opacity: 1,
                        x: 0,
                        rotation: parseFloat(STORY_PANELS[i].imgRotate),
                        scale: 1,
                        duration: 0.9,
                        ease: 'back.out(1.4)',
                    },
                    '-=0.5'
                );

                // Action word stamp
                tl.fromTo(
                    actionEl,
                    { opacity: 0, scale: 3, rotation: -30 },
                    { opacity: 1, scale: 1, rotation: -12, duration: 0.5, ease: 'back.out(2)' },
                    '-=0.4'
                );

                // Floating emojis burst
                tl.fromTo(
                    floatEls,
                    { opacity: 0, scale: 0, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.08 },
                    '-=0.3'
                );

                // ── Parallax: image moves as you scroll through panel ──
                gsap.to(imageEl, {
                    y: -40,
                    rotation: parseFloat(STORY_PANELS[i].imgRotate) + 4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                });

                // ── Continuous float for image ──
                gsap.to(imageEl, {
                    y: '+=18',
                    duration: 2.8 + i * 0.3,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: i * 0.5,
                });

                // ── Float emojis loop ──
                floatEls.forEach((el, j) => {
                    gsap.to(el, {
                        y: `-=${12 + j * 5}`,
                        rotation: `+=${20 + j * 10}`,
                        duration: 2 + j * 0.6,
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1,
                        delay: j * 0.4 + i * 0.3,
                    });
                });

                // ── Action word wobble ──
                gsap.to(actionEl, {
                    rotation: -8,
                    duration: 0.8,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: 1,
                });
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="relative"
            style={{ scrollSnapType: 'y mandatory' }}
        >
            {STORY_PANELS.map((panel, i) => (
                <div
                    key={panel.id}
                    ref={(el) => { panelRefs.current[i] = el; }}
                    className="relative w-full h-screen overflow-hidden comic-section"
                    style={{

                        scrollSnapAlign: 'start',
                        background: panel.textBg,
                    }}
                >
                    {/* Accent side stripe — left on even, right on odd */}


                    {/* Halftone bg */}


                    {/* Speed lines burst — corner */}


                    {/* Chapter number watermark */}
                    <div
                        className="absolute bottom-4 right-6 md:bottom-8 md:right-10 select-none pointer-events-none opacity-[0.06]"
                        style={{
                            fontFamily: 'var(--font-bangers), Bangers, cursive',
                            fontSize: 'clamp(80px, 15vw, 200px)',
                            color: panel.darkTheme ? '#FFF' : '#1A1A1A',
                            lineHeight: 1,
                            letterSpacing: '0.02em',
                        }}
                    >
                        0{i + 1}
                    </div>

                    {/* ─── Main grid layout ─── */}
                    <div className="relative z-10 max-w-7xl mx-auto px-5 pr-14 md:px-12 py-10 lg:py-12 min-h-[100dvh] flex items-center">
                        <div
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full ${i % 2 !== 0 ? 'lg:[&>:first-child]:order-2 lg:[&>:last-child]:order-1' : ''
                                }`}
                        >
                            {/* ── LEFT: Text panel ── */}
                            <div className="story-text flex flex-col gap-3 lg:gap-4 w-full">
                                {/* Chapter badge */}
                                <div
                                    className="story-badge inline-flex items-center self-start px-4 py-1.5 border-3 border-[#1A1A1A] text-sm font-bold opacity-0"
                                    style={{
                                        background: panel.badgeBg,
                                        boxShadow: '3px 3px 0 #1A1A1A',
                                        fontFamily: 'var(--font-bangers), Bangers, cursive',
                                        letterSpacing: '0.15em',
                                        color: (panel.badgeBg === '#FFE000' || panel.badgeBg === '#00C443') ? '#1A1A1A' : '#fff',
                                    }}
                                >
                                    {panel.badge}
                                </div>

                                {/* Headline — split into words for animation */}
                                <div className="story-headline overflow-hidden">
                                    <h2
                                        className="leading-[1.1]"
                                        style={{
                                            fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                                            letterSpacing: '0.03em',
                                        }}
                                    >
                                        {panel.headline.split('\n').map((line, li) => (
                                            <span key={li} className="block overflow-hidden">
                                                {line.split(' ').map((w, wi) => (
                                                    <span
                                                        key={wi}
                                                        className="word inline-block opacity-0 mr-3"
                                                        style={{
                                                            color: panel.id === 'panel-2' || panel.id === 'panel-4' ? '#FF2D2D' : (panel.darkTheme ? '#FFF' : '#1A1A1A'),
                                                            WebkitTextStroke: panel.darkTheme ? '1.5px #1A1A1A' : '1.5px #1A1A1A',
                                                            textShadow: `4px 4px 0 ${panel.id === 'panel-2' || panel.id === 'panel-4' ? '#1A1A1A' : panel.accentBg}`,
                                                        }}
                                                    >
                                                        {w}
                                                    </span>
                                                ))}
                                            </span>
                                        ))}
                                    </h2>
                                </div>

                                {/* Subtext in speech bubble */}
                                <div className="speech-bubble story-sub px-4 py-3 md:px-5 md:py-4 self-start max-w-[90%] md:max-w-md opacity-0 border-3 border-[#1A1A1A]">
                                    <p
                                        className={`text-sm md:text-lg leading-relaxed ${panel.darkTheme ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]'}`}
                                        style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                                    >
                                        {panel.subhead}
                                    </p>
                                </div>

                                {/* Floating emojis row */}
                                <div className="flex gap-4 mt-2">
                                    {panel.floatEmoji.map((emoji, j) => (
                                        <span
                                            key={j}
                                            className="story-float inline-block select-none opacity-0"
                                            style={{
                                                fontSize: `${j === 0 ? 36 : j === 1 ? 28 : 22}px`,
                                                filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.25))',
                                                transformOrigin: 'center',
                                            }}
                                        >
                                            {emoji}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ── RIGHT: Image panel ── */}
                            <div className="story-image relative flex items-center justify-center opacity-0 mt-16 md:mt-0">
                                {/* Accent square behind image */}
                                <div
                                    className="absolute w-[220px] h-[260px] md:w-[320px] md:h-[380px] border-3 md:border-4 border-[#1A1A1A]"
                                    style={{
                                        background: panel.accentBg,
                                        transform: `rotate(${i % 2 === 0 ? '4deg' : '-4deg'})`,
                                        boxShadow: '6px 6px 0 #1A1A1A',
                                        zIndex: 0,
                                    }}
                                />

                                {/* Product photo */}
                                <div
                                    className="relative w-[200px] h-[240px] md:w-[300px] md:h-[360px] border-3 md:border-4 border-[#1A1A1A] overflow-hidden z-10"
                                    style={{
                                        boxShadow: '4px 4px 0 #1A1A1A',
                                        background: '#fff',
                                    }}
                                >
                                    <Image
                                        src={panel.img}
                                        alt={panel.headline.replace('\n', ' ')}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 200px, 320px"
                                    />
                                </div>

                                {/* ACTION WORD stamp — top right overlapping */}
                                <div
                                    className="story-action absolute -top-4 -right-2 md:-top-10 md:-right-6 opacity-0 z-20"
                                    style={{
                                        fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                        fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                                        color: panel.actionColor,
                                        WebkitTextStroke: '3px #1A1A1A',
                                        textShadow: `5px 5px 0 ${panel.actionShadow}`,
                                        letterSpacing: '0.05em',
                                        lineHeight: 1,
                                        transformOrigin: 'bottom left',
                                        transform: 'rotate(-12deg)',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {panel.actionWord}
                                </div>

                                {/* Halftone corner accent */}
                                <div
                                    className="absolute -bottom-4 -left-4 w-20 h-20 border-4 border-[#1A1A1A] z-20"
                                    style={{ background: panel.accentBg }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Panel divider line (except last) */}
                    {i < STORY_PANELS.length - 1 && (
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#1A1A1A]" />
                    )}
                </div>
            ))}
        </div>
    );
}
