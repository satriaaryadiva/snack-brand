'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: '2', label: 'Merek Snack', bg: '#FFE000', icon: '🏷️' },
    { value: '5+', label: 'Varian Rasa', bg: '#FF2D2D', icon: '🌶️', textColor: '#fff' },
    { value: '100%', label: 'Halal', bg: '#00C443', icon: '✅', textColor: '#fff' },
    { value: '4.9★', label: 'Rating Pelanggan', bg: '#00CFFF', icon: '⭐' },
];

const galleryImages = [
    { src: '/FOTO PRODUCT/DSCF5838.jpg', alt: 'Shogun box stack', tall: true },
    { src: '/FOTO PRODUCT/DSC00044.jpg', alt: 'Kaaro product' },
    { src: '/FOTO PRODUCT/DSC04373.jpg', alt: 'Shogun lineup' },
    { src: '/FOTO PRODUCT/DSC04386.jpg', alt: 'Shogun open bag' },
    { src: '/FOTO PRODUCT/DSC00048.jpg', alt: 'Kaaro noodle pack' },
];

export default function BrandStorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(statsRef.current?.querySelectorAll('.stat-box') ?? [],
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.1,
                    scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
                }
            );
            gsap.fromTo(textRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
                }
            );
            gsap.fromTo(galleryRef.current?.querySelectorAll('.g-img') ?? [],
                { opacity: 0, scale: 0.85, rotation: -4 },
                {
                    opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
                    scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="story"
            className="comic-section py-20 overflow-hidden"
            style={{ background: '#FFFDF5' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats bar */}
                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="stat-box border-4 border-[#1A1A1A] p-5 text-center"
                            style={{ background: s.bg, boxShadow: '5px 5px 0 #1A1A1A' }}
                        >
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div
                                className="text-3xl leading-none"
                                style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.05em', color: s.textColor ?? '#1A1A1A' }}
                            >
                                {s.value}
                            </div>
                            <div
                                className="text-xs mt-1 font-bold"
                                style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', color: s.textColor ?? '#1A1A1A', opacity: 0.8 }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two-column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                    {/* Text */}
                    <div ref={textRef}>
                        <div
                            className="inline-flex items-center px-4 py-1 mb-5 border-3 border-[#1A1A1A]"
                            style={{ background: '#FFE000', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.12em', boxShadow: '3px 3px 0 #1A1A1A', fontSize: '0.85rem' }}
                        >
                            TENTANG KAMI
                        </div>
                        <h2
                            className="text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.04em', textShadow: '4px 4px 0 #FFE000' }}
                        >
                            Snack yang{' '}
                            <span style={{ color: '#FF2D2D', WebkitTextStroke: '1px #1A1A1A' }}>Disukai</span>{' '}
                            Semua Kalangan!
                        </h2>

                        <div className="speech-bubble p-5 mb-6">
                            <p style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                                className="text-[#1A1A1A] leading-relaxed">
                                Kami menghadirkan <strong className="text-[#FF7A00]">Shogun</strong> dan{' '}
                                <strong className="text-[#006FFF]">Kaaro</strong> — snack berkualitas tinggi
                                untuk semua kalangan di Indonesia. Lahir dari semangat menciptakan camilan yang
                                lezat, terjangkau, dan halal!
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {[
                                { icon: '🍜', text: 'Bahan baku berkualitas pilihan' },
                                { icon: '✅', text: 'Bersertifikat Halal MUI' },
                                { icon: '🇰🇷', text: 'Terinspirasi cita rasa autentik Korea' },
                                { icon: '📦', text: 'Berbagai ukuran kemasan tersedia' },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 px-4 py-2.5 border-2 border-[#1A1A1A]"
                                    style={{ background: i % 2 === 0 ? '#FFF9E6' : '#E0F7FF', boxShadow: '3px 3px 0 #1A1A1A' }}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span
                                        className="text-sm font-bold text-[#1A1A1A]"
                                        style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                                    >
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div ref={galleryRef} className="grid grid-cols-2 gap-3" style={{ gridAutoRows: '160px' }}>
                        {galleryImages.map((img, i) => (
                            <div
                                key={i}
                                className={`g-img relative overflow-hidden border-4 border-[#1A1A1A] ${img.tall ? 'row-span-2' : ''}`}
                                style={{ boxShadow: '4px 4px 0 #1A1A1A', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #1A1A1A'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #1A1A1A'; }}
                            >
                                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:1024px) 50vw, 25vw" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
