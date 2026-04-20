import Image from 'next/image';

export default function Footer() {
    const year = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/shogunkaaroofficial?igsh=M2Y3Nnh3M2MyeG14',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/@shokaacrunch?_r=1&_t=ZS-95774ir0Hpd',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            ),
        },
        {
            name: 'Shopee',
            href: 'https://s.shopee.co.id/9fGYke5HNI',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z" />
                </svg>
            ),
        },
    ];

    return (
        <footer
            id="footer"
            className="relative border-t-4 border-[#1A1A1A] py-10 overflow-hidden"
            style={{ background: '#1A1A1A' }}
        >
            {/* Halftone on dark */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,224,0,0.8) 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                            <div className="relative w-[100px] h-[30px] sm:w-[120px] sm:h-[35px]">
                                <Image src="/new/shogun.png" alt="Shogun Logo" fill className="object-contain scale-400" />
                            </div>
                            <span className="text-[#FF2D2D] font-black text-2xl mx-1">×</span>
                            <div className="relative w-[110px] h-[32px] sm:w-[130px] sm:h-[38px]">
                                <Image src="/new/karo.png" alt="Kaaro Logo" fill className="object-contain scale-400" />
                            </div>
                        </div>
                        <p
                            className="text-white/40 text-xs max-w-xs"
                            style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive', fontWeight: 700 }}
                        >
                            Snack renyah favorit Indonesia 🇮🇩 Korean style, local heart.
                        </p>
                    </div>

                    {/* Nav links */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                             
                            { href: '#why', label: 'Why?', color: '#ffee00ff' },
                            { href: '#products', label: 'Produk', color: '#FF2D2D' },
                            { href: '#tentang', label: 'Tentang', color: '#00CFFF' },
                         
                            { href: '#contact', label: 'Kontak', color: '#00C443' },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-bold border-b-2 border-transparent hover:border-current transition-colors pb-0.5"
                                style={{ color: link.color, fontFamily: 'var(--font-bangers), Bangers, cursive', letterSpacing: '0.08em', fontSize: '1rem' }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.name}
                                className="w-10 h-10 flex items-center 
                                bg-yellow-500 justify-center border-2 border-yellow-500  text-white/90 hover:bg-[#FFE000] hover:text-[#1A1A1A] hover:border-[#FFE000] transition-all duration-150"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p
                        className="text-white/25 text-xs"
                        style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                    >
                        © {year} Shogun & Kaaro. Semua hak dilindungi.
                    </p>
                    <div
                        className="text-white/20 text-xs flex items-center gap-1"
                        style={{ fontFamily: 'var(--font-comic-neue), Comic Neue, cursive' }}
                    >
                        Made with <span className="text-[#FFE000]">🍜</span> in Indonesia
                    </div>
                </div>
            </div>
        </footer>
    );
}
