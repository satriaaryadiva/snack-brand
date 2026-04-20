'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import MagneticButton from './MagneticButton';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const scrolledRef = useRef(false);
    const hiddenRef = useRef(false);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 0.2 }
        );

        const handleScroll = () => {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;

            // Set scrolled state for background color change
            const isScrolled = currentScrollY > 40;
            if (scrolledRef.current !== isScrolled) {
                scrolledRef.current = isScrolled;
                setScrolled(isScrolled);
            }

            // Hide navbar when scrolling down, show when scrolling up
            let isHidden = hiddenRef.current;
            if (currentScrollY <= 10) {
                isHidden = false; // Make sure it's visible at the very top
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !menuOpen) {
                isHidden = true; // Scrolling down
            } else if (currentScrollY < lastScrollY.current) {
                isHidden = false; // Scrolling up
            }

            if (hiddenRef.current !== isHidden) {
                hiddenRef.current = isHidden;
                setHidden(isHidden);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href === '#' ? 'body' : href;
            const target = targetId === 'body' ? document.body : document.querySelector(targetId);
            
            if (target) {
                if ((window as any).lenis) {
                    (window as any).lenis.scrollTo(target, { offset: -80 });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            setMenuOpen(false);
        }
    };

    const navLinks = [
        { href: '#why', label: 'Why?' },
        { href: '#products', label: 'Produk' },
        { href: '#story', label: 'Tentang' },
        { href: '#contact', label: 'Kontak' },
    ];

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${hidden ? '-translate-y-full' : 'translate-y-0'
                } ${scrolled
                    ? 'bg-[#FFF9E6] border-b-4 border-[#1A1A1A] py-2 shadow-[0_4px_0_#1A1A1A]'
                    : 'bg-[#FFE000] border-b-4 border-[#1A1A1A] py-3'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4   flex items-center justify-between">
                {/* Logo */}
                <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center   group">
                    <div className="relative w-[120px] h-[36px] sm:w-[150px] sm:h-[45px] md:w-[100px] md:h-[54px] lg:w-[120px] lg:h-[60px]">
                        <Image src="/new/shogun.png" alt="Shogun Logo" fill className="object-contain scale-200" priority sizes="120px" />
                    </div>
                     <span className="text-[#FF2D2D] font-black text-4xl  ">×</span>
                    <div className="relative w-[130px] h-[39px] sm:w-[165px] sm:h-[48px] md:w-[200px] md:h-[58px] lg:w-[120px] lg:h-[60px]">
                        <Image src="/new/karo.png" alt="Kaaro Logo" fill className="object-contain scale-200" priority sizes="130px" />
                    </div>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="px-4 py-1.5 text-sm font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFE000] transition-colors duration-150 border-2 border-transparent hover:border-[#1A1A1A] rounded-none"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, Impact, cursive', letterSpacing: '0.08em', fontSize: '1rem' }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <MagneticButton
                        href="https://s.shopee.co.id/9fGYke5HNI"
                        className="inline-flex items-center px-5 py-2 rounded-none text-sm font-bold text-[#1A1A1A] bg-[#FF2D2D] comic-btn comic-btn-red"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em', fontSize: '1rem', color: '#fff' }}
                    >
                        🔥 BELI SEKARANG!
                    </MagneticButton>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2 "
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
                <div className="bg-[#FFF9E6] border-t-4 border-[#1A1A1A] px-6 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="py-2 px-3 text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A]/20 hover:bg-[#FFE000] transition-colors"
                            style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', fontSize: '1.1rem' }}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://s.shopee.co.id/9fGYke5HNI"
                        className="mt-3 text-center py-2.5 bg-[#FF2D2D] text-white font-bold border-3 border-[#1A1A1A] comic-btn"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.1em', fontSize: '1.1rem' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        🔥 BELI SEKARANG!
                    </a>
                </div>
            </div>
        </nav>
    );
}
