'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    onClick?: () => void;
    strength?: number;
    as?: 'button' | 'a';
    target?: string;
    rel?: string;
}

export default function MagneticButton({
    children,
    className = '',
    style,
    href,
    onClick,
    strength = 0.4,
    as: Tag = href ? 'a' : 'button',
    target,
    rel,
}: MagneticButtonProps) {
    const btnRef = useRef<HTMLElement>(null);
    const innerRef = useRef<HTMLSpanElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = btnRef.current!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;

        gsap.to(btnRef.current, {
            x: dx,
            y: dy,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(innerRef.current, {
            x: dx * 0.5,
            y: dy * 0.5,
            duration: 0.4,
            ease: 'power3.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
        });
        gsap.to(innerRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
        });
    };

    const defaultOnClick = (e: React.MouseEvent) => {
        if (href && href.startsWith('#')) {
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
        }
        if (onClick) onClick();
    };

    const props = {
        ref: btnRef as React.Ref<HTMLElement>,
        className: `magnetic-btn relative overflow-visible ${className}`,
        style,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onClick: defaultOnClick,
        ...(Tag === 'a' && { href, target, rel }),
    };

    return (
        // @ts-expect-error: dynamic tag polymorphism
        <Tag {...props}>
            <span ref={innerRef} className="relative z-10 block">
                {children}
            </span>
        </Tag>
    );
}
