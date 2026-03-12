'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(boxRef.current,
                { opacity: 0, y: 60, scale: 0.93 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)',
                    scrollTrigger: { trigger: boxRef.current, start: 'top 80%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative comic-section py-20 overflow-hidden"
            style={{ background: '#FFE000' }}
        >
            {/* Halftone overlay */}
            <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={boxRef}
                    className="border-4 border-[#1A1A1A] p-10 md:p-16 text-center"
                    style={{ background: '#fff', boxShadow: '10px 10px 0 #1A1A1A' }}
                >
                    {/* Big action word */}
                    <div
                        className="text-7xl md:text-8xl leading-none mb-4"
                        style={{
                            fontFamily: 'var(--font-bangers), Bangers, Impact, cursive',
                            color: '#FFE000',
                            WebkitTextStroke: '4px #1A1A1A',
                            textShadow: '6px 6px 0 #FF2D2D',
                            letterSpacing: '0.06em',
                            animation: 'wobble 2s ease-in-out infinite',
                        }}
                    >
                        JOIN US!
                    </div>

                    <h2
                        className="text-3xl md:text-5xl text-[#1A1A1A] mb-4 leading-tight"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.04em', textShadow: '3px 3px 0 #00CFFF' }}
                    >
                        Jadi Reseller atau Distributor?
                    </h2>

                    <div className="speech-bubble p-5 max-w-lg mx-auto mb-10">
                        <p style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                            className="text-[#1A1A1A] leading-relaxed">
                            Bergabung bersama ratusan reseller <strong className="text-[#FF7A00]">Shogun</strong> &{' '}
                            <strong className="text-[#006FFF]">Kaaro</strong> di seluruh Indonesia! Harga grosir
                            terbaik + dukungan penuh dari tim kami. 🔥
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Shogun%20%26%20Kaaro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="comic-btn comic-btn-yellow px-8 py-4 text-xl gap-3 rounded-none"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em' }}
                        >
                            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                            WhatsApp Kami!
                        </a>
                        <a
                            href="mailto:info@shogunkaaro.id"
                            className="comic-btn comic-btn-blue px-8 py-4 text-xl gap-3 rounded-none"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', color: '#fff' }}
                        >
                            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email Kami!
                        </a>
                    </div>

                    <p
                        className="mt-6 text-[#1A1A1A]/50 text-sm font-bold"
                        style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                    >
                        ⚡ Respon cepat 24/7 • 📦 Pengiriman ke seluruh Indonesia
                    </p>
                </div>
            </div>
        </section>
    );
}
