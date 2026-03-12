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
        accentBg: '#FFE000',
        textBg: '#FFFDF5',
        badge: '★ CHAPTER 01 ★',
        badgeBg: '#FF2D2D',
        headline: 'Ada yang\nBerani Beda.',
        subhead: 'Dari dapur semangat anak bangsa,\nlahirlah dua snack yang beda dari yang lain.',
        img: '/FOTO PRODUCT/DSCF5783.jpg',
        imgRotate: '-6deg',
        actionWord: 'CRUNCH!',
        actionColor: '#FFE000',
        actionShadow: '#FF2D2D',
        floatEmoji: ['🍜', '⭐', '🔥'],
    },
    {
        id: 'panel-2',
        accentBg: '#00CFFF',
        textBg: '#F0FAFF',
        badge: '★ CHAPTER 02 ★',
        badgeBg: '#006FFF',
        headline: 'Korea, Tapi\nAsli Indo.',
        subhead: 'Terinspirasi cita rasa autentik Korea,\ndihadirkan untuk lidah Indonesia.',
        img: '/FOTO PRODUCT/DSC00050.jpg',
        imgRotate: '5deg',
        actionWord: 'BOOM!',
        actionColor: '#00CFFF',
        actionShadow: '#006FFF',
        floatEmoji: ['🦖', '💫', '🌶️'],
    },
    {
        id: 'panel-3',
        accentBg: '#00C443',
        textBg: '#F0FFF4',
        badge: '★ CHAPTER 03 ★',
        badgeBg: '#1A1A1A',
        headline: '5 Rasa\nDalam 1 Buka.',
        subhead: 'Shogun 5in1 hadir dengan kejutan rasa\ndi setiap kemasan. Siap dibuka!',
        img: '/FOTO PRODUCT/DSC04424.jpg',
        imgRotate: '-4deg',
        actionWord: 'POW!',
        actionColor: '#00C443',
        actionShadow: '#1A1A1A',
        floatEmoji: ['🎉', '✨', '💥'],
    },
    {
        id: 'panel-4',
        accentBg: '#FF2D2D',
        textBg: '#FFF5F5',
        badge: '★ CHAPTER 04 ★',
        badgeBg: '#FFE000',
        headline: 'Kriuk!\nNagih.\nLagi.',
        subhead: 'Kaaro mi goreng Korea — kriuk langsung doang,\ntanpa masak. Mau lagi, mau lagi!',
        img: '/FOTO PRODUCT/DSC00051.jpg',
        imgRotate: '8deg',
        actionWord: 'YUM!',
        actionColor: '#FF2D2D',
        actionShadow: '#1A1A1A',
        floatEmoji: ['😋', '🍜', '❗'],
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
                    className="relative w-full overflow-hidden comic-section"
                    style={{
                        minHeight: '100vh',
                        scrollSnapAlign: 'start',
                        background: panel.textBg,
                    }}
                >
                    {/* Accent side stripe — left on even, right on odd */}
                    <div
                        className={`absolute top-0 bottom-0 ${i % 2 === 0 ? 'left-0' : 'right-0'} w-2 md:w-3`}
                        style={{ background: panel.accentBg, zIndex: 1 }}
                    />

                    {/* Halftone bg */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${panel.accentBg}99 1.5px, transparent 1.5px)`,
                            backgroundSize: '16px 16px',
                        }}
                    />

                    {/* Speed lines burst — corner */}
                    <div
                        className={`absolute ${i % 2 === 0 ? 'top-0 right-0' : 'top-0 left-0'} w-64 h-64 opacity-10 pointer-events-none`}
                        style={{
                            background: `conic-gradient(from ${i % 2 === 0 ? '180' : '0'}deg at ${i % 2 === 0 ? '100% 0%' : '0% 0%'}, ${panel.accentBg} 0deg, transparent 20deg, ${panel.accentBg} 40deg, transparent 60deg, ${panel.accentBg} 80deg, transparent)`,
                        }}
                    />

                    {/* Chapter number watermark */}
                    <div
                        className="absolute bottom-4 right-6 md:bottom-8 md:right-10 select-none pointer-events-none opacity-[0.06]"
                        style={{
                            fontFamily: 'var(--font-bangers), Bangers, cursive',
                            fontSize: 'clamp(80px, 15vw, 200px)',
                            color: '#1A1A1A',
                            lineHeight: 1,
                            letterSpacing: '0.02em',
                        }}
                    >
                        0{i + 1}
                    </div>

                    {/* ─── Main grid layout ─── */}
                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 min-h-screen flex items-center">
                        <div
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center w-full ${i % 2 !== 0 ? 'lg:[&>:first-child]:order-2 lg:[&>:last-child]:order-1' : ''
                                }`}
                        >
                            {/* ── LEFT: Text panel ── */}
                            <div className="story-text flex flex-col gap-4 md:gap-6">
                                {/* Chapter badge */}
                                <div
                                    className="story-badge inline-flex items-center self-start px-4 py-1.5 border-3 border-[#1A1A1A] text-sm font-bold opacity-0"
                                    style={{
                                        background: panel.badgeBg,
                                        boxShadow: '3px 3px 0 #1A1A1A',
                                        fontFamily: 'var(--font-bangers), Bangers, cursive',
                                        letterSpacing: '0.15em',
                                        color: panel.badgeBg === '#FFE000' ? '#1A1A1A' : '#fff',
                                    }}
                                >
                                    {panel.badge}
                                </div>

                                {/* Headline — split into words for animation */}
                                <div className="story-headline overflow-hidden">
                                    <h2
                                        className="leading-none"
                                        style={{
                                            fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                            fontSize: 'clamp(3rem, 8vw, 7rem)',
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
                                                            color: '#1A1A1A',
                                                            WebkitTextStroke: '1.5px #1A1A1A',
                                                            textShadow: `4px 4px 0 ${panel.accentBg}`,
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
                                <div className="speech-bubble story-sub px-5 py-4 self-start max-w-md opacity-0">
                                    <p
                                        className="text-[#1A1A1A] text-base md:text-lg leading-relaxed"
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
                                    className="absolute w-[260px] h-[300px] md:w-[320px] md:h-[380px] border-4 border-[#1A1A1A]"
                                    style={{
                                        background: panel.accentBg,
                                        transform: `rotate(${i % 2 === 0 ? '4deg' : '-4deg'})`,
                                        boxShadow: '8px 8px 0 #1A1A1A',
                                        zIndex: 0,
                                    }}
                                />

                                {/* Product photo */}
                                <div
                                    className="relative w-[240px] h-[280px] md:w-[300px] md:h-[360px] border-4 border-[#1A1A1A] overflow-hidden z-10"
                                    style={{
                                        boxShadow: '6px 6px 0 #1A1A1A',
                                        background: '#fff',
                                    }}
                                >
                                    <Image
                                        src={panel.img}
                                        alt={panel.headline.replace('\n', ' ')}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 260px, 320px"
                                    />
                                </div>

                                {/* ACTION WORD stamp — top right overlapping */}
                                <div
                                    className="story-action absolute -top-8 -right-4 md:-top-10 md:-right-6 opacity-0 z-20"
                                    style={{
                                        fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
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
