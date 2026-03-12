"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRotateSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textLeftRef = useRef<HTMLDivElement>(null);
    const textRightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Rotate image on scroll
            gsap.to(imageRef.current, {
                rotation: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            // Fade in text blocks
            gsap.fromTo(
                textLeftRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                textRightRef.current,
                { x: 80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { value: "100+", label: "Countries" },
        { value: "50B+", label: "Cookies Sold" },
        { value: "111", label: "Years of Joy" },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #000d33 0%, #001647 50%, #000d33 100%)" }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-16">
                    {/* Left text */}
                    <div ref={textLeftRef} className="space-y-6">
                        <p className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase">The Science of Delight</p>
                        <h2
                            className="font-baloo text-4xl md:text-5xl font-black text-white leading-tight"
                            style={{ fontFamily: "'Baloo 2', cursive" }}
                        >
                            Every layer, perfectly crafted.
                        </h2>
                        <p className="text-white/60 leading-relaxed text-base">
                            From the first crunch to the last creamy lick — every Crumbo cookie is engineered for maximum satisfaction.
                        </p>
                    </div>

                    {/* Rotating cookie */}
                    <div className="flex flex-col items-center gap-8">
                        <div ref={imageRef} className="relative w-56 h-56 md:w-72 md:h-72">
                            <div
                                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                                style={{ background: "radial-gradient(circle, #4a7aff, transparent)" }}
                            />
                            <Image
                                src="/cookie.png"
                                alt="Rotating Cookie"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8">
                            {stats.map((s) => (
                                <div key={s.label} className="text-center">
                                    <div
                                        className="font-baloo text-3xl font-black text-white"
                                        style={{ fontFamily: "'Baloo 2', cursive" }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="text-white/50 text-xs tracking-wider uppercase mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right text */}
                    <div ref={textRightRef} className="space-y-6">
                        <p className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase">The Ritual</p>
                        <h2
                            className="font-baloo text-4xl md:text-5xl font-black text-white leading-tight"
                            style={{ fontFamily: "'Baloo 2', cursive" }}
                        >
                            Your way to enjoy it.
                        </h2>
                        <p className="text-white/60 leading-relaxed text-base">
                            Twist the top off. Lick the cream. Dunk in milk until perfect. There's no wrong way — only your way.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
