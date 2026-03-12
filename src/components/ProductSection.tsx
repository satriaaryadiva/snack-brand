"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        name: "Original",
        flavor: "Classic Cream",
        desc: "The iconic original. Chocolate wafers, pure white cream. A timeless masterpiece.",
        image: "/snack.png",
        badge: "Bestseller",
        badgeColor: "bg-blue-500",
        accent: "#4a7aff",
        price: "$3.99",
    },
    {
        id: 2,
        name: "Golden",
        flavor: "Vanilla Dream",
        desc: "Golden wafers with extra-creamy vanilla filling. Sunshine in every bite.",
        image: "/snack2.png",
        badge: "Fan Favorite",
        badgeColor: "bg-yellow-500",
        accent: "#f0c040",
        price: "$4.49",
    },
    {
        id: 3,
        name: "Mint Blast",
        flavor: "Cool Mint Cream",
        desc: "Dark chocolate meets cool mint cream for a refreshing twist on a classic.",
        image: "/snack3.png",
        badge: "New!",
        badgeColor: "bg-emerald-500",
        accent: "#34d399",
        price: "$4.49",
    },
];

export default function ProductSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading fade in
            gsap.fromTo(
                headingRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Cards stagger reveal
            const cards = cardsRef.current?.querySelectorAll(".product-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 80, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="products"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
            style={{ background: "#000d33" }}
        >
            {/* Background accent */}
            <div className="absolute inset-0 dot-bg opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <div ref={headingRef} className="text-center mb-20">
                    <p className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                        Our Flavors
                    </p>
                    <h2
                        className="font-baloo text-5xl md:text-6xl font-black text-white leading-tight"
                        style={{ fontFamily: "'Baloo 2', cursive" }}
                    >
                        Pick Your{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(135deg, #4a7aff, #7aaeff)" }}
                        >
                            Favorite
                        </span>
                    </h2>
                    <p className="text-white/50 text-lg mt-4 max-w-lg mx-auto">
                        Three legendary flavors. One impossible choice.
                    </p>
                </div>

                {/* Cards grid */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="product-card group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                            style={{
                                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(10px)",
                                boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.4)`,
                            }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${product.accent}18, transparent 70%)`,
                                }}
                            />

                            {/* Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span
                                    className={`${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
                                >
                                    {product.badge}
                                </span>
                            </div>

                            {/* Image */}
                            <div className="relative h-56 flex items-center justify-center p-8">
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle, ${product.accent}22, transparent 70%)`,
                                    }}
                                />
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={180}
                                    height={180}
                                    className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-0">
                                <div className="mb-1">
                                    <p
                                        className="text-xs font-semibold tracking-wider uppercase mb-1"
                                        style={{ color: product.accent }}
                                    >
                                        {product.flavor}
                                    </p>
                                    <h3
                                        className="font-baloo text-2xl font-black text-white"
                                        style={{ fontFamily: "'Baloo 2', cursive" }}
                                    >
                                        {product.name}
                                    </h3>
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">{product.desc}</p>

                                <div className="flex items-center justify-between">
                                    <span
                                        className="font-baloo text-2xl font-black"
                                        style={{ fontFamily: "'Baloo 2', cursive", color: product.accent }}
                                    >
                                        {product.price}
                                    </span>
                                    <button
                                        className="text-sm font-bold text-white px-5 py-2.5 rounded-full transition-all duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${product.accent}, ${product.accent}99)`,
                                            boxShadow: `0 4px 20px ${product.accent}40`,
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
