'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
    {
        id: 'halal',
        icon: '✅',
        title: '100% HALAL MUI',
        desc: 'Sertifikasi Halal resmi dari Majelis Ulama Indonesia. Menjamin kehalalan dan kebersihan seluruh bahan baku serta proses produksi kami.',
        color: '#00C443',
        rotation: -4,
    },
    {
        id: 'bpom',
        icon: '🛡️',
        title: 'BPOM RI',
        desc: 'Terdaftar resmi di Badan Pengawas Obat dan Makanan (BPOM) Republik Indonesia. Aman, higienis, dan sesuai standar keamanan pangan.',
        color: '#FF7A00',
        rotation: 3,
    },
    {
        id: 'topbrand',
        icon: '🏆',
        title: 'TOP BRAND 2024',
        desc: 'Dipercaya oleh jutaan keluarga Indonesia sebagai salah satu merek snack favorit terbaik tahun ini.',
        color: '#00CFFF',
        rotation: -2,
    },
    {
        id: 'award',
        icon: '⭐',
        title: 'BEST SNACK AWARD',
        desc: 'Pemenang penghargaan Snack Paling Inovatif dengan cita rasa unik paduan Korea dan Nusantara.',
        color: '#FF2D2D',
        rotation: 5,
    }
];
 

export default function CertificationSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

 

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50, scale: 0.9, rotation: -5 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // Cards Animation
            const cards = gsap.utils.toArray('.cert-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 100, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Continuous Floating
            cards.forEach((card: any, i) => {
                gsap.to(card, {
                    y: `+=${Math.random() * 10 + 5}`,
                    rotation: CERTIFICATIONS[i].rotation + (Math.random() * 2 - 1),
                    duration: 2 + Math.random(),
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: Math.random() * 1,
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32  overflow-hidden comic-section"
            style={{ background: '#FFE000' }}
        >
            {/* Comic Halftone Background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #FF7A00 3px, transparent 3.5px)',
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-16 md:mb-24 flex flex-col items-center">
                    <div
                        className="inline-block px-8 py-4 border-4 border-[#1A1A1A] bg-white transform -rotate-2"
                        style={{ boxShadow: '10px 10px 0 #1A1A1A' }}
                    >
                        <h2
                            className="text-4xl md:text-6xl text-[#1A1A1A] leading-none"
                            style={{
                                fontFamily: 'var(--font-bangers), Bangers, cursive',
                                letterSpacing: '0.05em',
                                WebkitTextStroke: '2px #1A1A1A',
                                textShadow: '4px 4px 0 #FF2D2D'
                            }}
                        >
                            OUR CERTIFICATIONS
                        </h2>
                    </div>
                    <div
                        className="mt-6 speech-bubble p-4 max-w-2xl mx-auto"
                        style={{ boxShadow: '5px 5px 0 #1A1A1A' }}
                    >
                        <p
                            className="text-[#1A1A1A] text-lg md:text-xl font-bold"
                            style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                        >
                            Komitmen kami memberikan yang terbaik dan teraman untuk Anda! Semuanya dibuktikan dengan sertifikasi resmi. 🏆✨
                        </p>
                    </div>
                </div>

                {/* Content Layout: Text/Certs (Left) & Carousel (Right) */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* Left Side: Certifications */}
                    <div ref={gridRef} className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
                        {CERTIFICATIONS.map((cert) => (
                            <div
                                key={cert.id}
                                className="cert-card relative bg-white border-4 border-[#1A1A1A] p-6 flex flex-col items-center text-center cursor-pointer transition-transform duration-300"
                                style={{
                                    boxShadow: `8px 8px 0 #1A1A1A`,
                                    transform: `rotate(${cert.rotation}deg)`,
                                }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, { scale: 1.05, rotation: 0, duration: 0.3, zIndex: 50 });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, { scale: 1, rotation: cert.rotation, duration: 0.3, zIndex: 10 });
                                }}
                            >
                                {/* Decorative Tape */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-[#FF2D2D]/80 border-2 border-[#1A1A1A] rotate-3" />

                                {/* Badge Icon */}
                                <div
                                    className="w-20 h-20 rounded-full border-4 border-[#1A1A1A] flex items-center justify-center text-4xl mb-4 bg-white z-10"
                                    style={{
                                        background: cert.color,
                                        boxShadow: '4px 4px 0 #1A1A1A',
                                        filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.2))'
                                    }}
                                >
                                    <span style={{ filter: 'drop-shadow(2px 2px 0 #1A1A1A)' }}>{cert.icon}</span>
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-xl text-[#1A1A1A] mb-2"
                                    style={{
                                        fontFamily: 'var(--font-bangers), Bangers, cursive',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {cert.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-sm text-[#1A1A1A] leading-relaxed flex-grow"
                                    style={{
                                        fontFamily: 'var(--font-comic-neue), Comic Neue, cursive',
                                        fontWeight: 700
                                    }}
                                >
                                    {cert.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Collage Carousel */}
                 
                </div>
            </div>
        </section>
    );
}
