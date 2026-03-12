'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MagneticButton from './MagneticButton';

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 0.2 }
        );

        let rafId: number;

        const checkScroll = () => {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;

            // Set scrolled state for background color change
            setScrolled(currentScrollY > 40);

            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY <= 10) {
                setHidden(false); // Make sure it's visible at the very top
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !menuOpen) {
                setHidden(true); // Scrolling down
            } else if (currentScrollY < lastScrollY.current) {
                setHidden(false); // Scrolling up
            }

            lastScrollY.current = currentScrollY;
            rafId = requestAnimationFrame(checkScroll);
        };

        rafId = requestAnimationFrame(checkScroll);

        return () => cancelAnimationFrame(rafId);
    }, [menuOpen]);

    const navLinks = [
        { href: '#shogun', label: 'Shogun' },
        { href: '#kaaro', label: 'Kaaro' },
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-1 group">
                    <span
                        className="font-comic text-2xl text-[#1A1A1A] tracking-wider"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, Impact, cursive' }}
                    >
                        SHOGUN
                    </span>
                    <span className="text-[#FF2D2D] font-black text-xl mx-0.5">×</span>
                    <span
                        className="font-comic text-2xl text-[#006FFF] tracking-wider"
                        style={{ fontFamily: 'var(--font-bangers), Bangers, Impact, cursive' }}
                    >
                        KAARO
                    </span>
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
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
                        href="#products"
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
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#products"
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
