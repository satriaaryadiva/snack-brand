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

    const props = {
        ref: btnRef as React.Ref<HTMLElement>,
        className: `magnetic-btn relative overflow-visible ${className}`,
        style,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onClick,
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
