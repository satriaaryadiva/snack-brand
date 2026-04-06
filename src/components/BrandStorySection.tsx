'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ShopeeButton from './ShopeeButton';

gsap.registerPlugin(ScrollTrigger);

const galleryImagesGroups = [
    [
        { src: '/new/1.jpeg', alt: 'Shogun product box', tall: true },
        { src: '/new/3.jpeg', alt: 'Kaaro snack' },
        { src: '/new/4.jpeg', alt: 'Shogun arrangement' },
        { src: '/new/5.jpeg', alt: 'Shogun packs' },
        { src: '/new/6.jpeg', alt: 'Kaaro product' },
    ],
    [
        { src: '/new/7.jpeg', alt: 'Shogun variant', tall: true },
        { src: '/new/8.png', alt: 'Snack setup' },
        { src: '/new/9.png', alt: 'Kaaro flavors' },
        { src: '/new/udang.png', alt: 'Shogun Shrimp' },
        { src: '/new/5in1.jpeg', alt: 'Shogun 5in1 Mix' },
    ]
];

export default function BrandStorySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGalleryIdx((prev) => (prev + 1) % galleryImagesGroups.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {

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
            className="comic-section h-[100vh] flex flex-col justify-center py-0 overflow-hidden"
            style={{ background: '#FFFDF5' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



                {/* Two-column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14  items-start">

                    {/* Text */}
                    <div ref={textRef} className='lg:pt-20'>
                        <div
                            className="inline-flex  items-center px-4 py-1 mb-5 border-3 border-[#1A1A1A]"
                            style={{ background: '#FFE000', fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.12em', boxShadow: '3px 3px 0 #1A1A1A', fontSize: '0.85rem' }}
                        >
                            TENTANG KAMI
                        </div>
                        <h2
                            className="text-[clamp(2.5rem,5vw,3.5rem)] text-[#1A1A1A] leading-tight mb-8"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.04em', textShadow: '4px 4px 0 #FFE000' }}
                        >
                            Snack yang{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10" style={{ color: '#FF2D2D', WebkitTextStroke: '2px #1A1A1A', textShadow: '2px 2px 0 #FFF' }}>Disukai</span>
                                <div className="absolute -inset-2 bg-[#FFE000] -z-10 rounded-full transform -rotate-3" style={{ border: '3px solid #1A1A1A' }} />
                            </span>{' '}
                            Semua Kalangan!
                        </h2>

                        <div className="speech-bubble p-5 mb-6">
                            <p style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                                className="text-[#1A1A1A] leading-relaxed">
                                Kami menghadirkan <strong className="text-[#FF7A00]">Shogun</strong> dan{' '}
                                <strong className="text-[#FF2D2D]">Kaaro</strong> — snack berkualitas tinggi
                                untuk semua kalangan di Indonesia. Lahir dari semangat menciptakan camilan yang
                                lezat, terjangkau, dan halal!
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mt-8">
                            <a href="https://s.shopee.co.id/9fGYke5HNI" className="px-4 py-2.5 bg-[#FF2D2D] border-4 border-[#1A1A1A] text-white font-bold transform -rotate-2 hover:rotate-0 transition-transform whitespace-nowrap" style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', fontSize: '1.1rem', boxShadow: '4px 4px 0 #1A1A1A' }}>
                                AYO COBA SEKARANG! 🏃‍♂️💨
                            </a>
                         
                        </div>
                    </div>

                    {/* Gallery Carousel */}
                    <div
                        ref={galleryRef}
                        className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-5 w-full max-w-[280px] sm:max-w-lg lg:max-w-none mx-auto mt-8 lg:mt-0 auto-rows-[100px] sm:auto-rows-[120px] md:auto-rows-[140px] lg:auto-rows-[180px]"
                    >
                        {[0, 1, 2, 3, 4].map((slotIdx) => {
                            const isTall = slotIdx === 0;
                            // Randomize tape position slightly for organic feel
                            const tapeRotation = slotIdx % 2 === 0 ? '-2deg' : '3deg';
                            const tapeLeft = slotIdx % 3 === 0 ? '40%' : '50%';
                            return (
                                <div
                                    key={slotIdx}
                                    className={`g-img relative border-4 border-[#1A1A1A] bg-white p-1 ${isTall ? 'row-span-2' : ''}`}
                                    style={{ boxShadow: '6px 6px 0 #1A1A1A', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '8px 8px 0 #1A1A1A'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0 #1A1A1A'; }}
                                >
                                    {/* Comic Masking Tape */}
                                    <div
                                        className="absolute top-[-10px] z-20 w-16 h-6 bg-[#FFE000] border-2 border-[#1A1A1A] opacity-90"
                                        style={{ left: tapeLeft, transform: `translateX(-50%) rotate(${tapeRotation})`, boxShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
                                    />

                                    <div className="relative w-full h-full overflow-hidden border-2 border-[#1A1A1A]">
                                        {galleryImagesGroups.map((group, groupIdx) => {
                                            const img = group[slotIdx];
                                            const isActive = groupIdx === currentGalleryIdx;
                                            return (
                                                <Image
                                                    key={groupIdx}
                                                    src={img.src}
                                                    alt={img.alt}
                                                    fill
                                                    className={`object-cover transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                                    sizes="(max-width:1024px) 50vw, 25vw"
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
