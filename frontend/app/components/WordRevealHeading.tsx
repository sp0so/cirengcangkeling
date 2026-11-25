'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface WordRevealHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  wordClassName?: string;
  highlightWords?: { [word: string]: string };
  delay?: number;
}

export default function WordRevealHeading({
  text,
  as: Component = 'h2',
  className = '',
  wordClassName = '',
  highlightWords = {},
  delay = 0,
}: WordRevealHeadingProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = text.split(' ').filter(Boolean);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || wordsRef.current.length === 0) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const validWords = wordsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        validWords,
        {
          y: '115%',
          opacity: 0,
          rotateX: -15,
        },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.045,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, text]);

  return (
    // @ts-expect-error dynamic component type
    <Component ref={containerRef} className={`perspective-[800px] ${className}`}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9!?-]/g, '');
        const customColor = highlightWords[word] || highlightWords[cleanWord];

        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden mr-[0.26em] last:mr-0 align-top"
          >
            <span
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className={`inline-block will-change-transform ${customColor || wordClassName}`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
