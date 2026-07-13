'use client';

import { useEffect, useRef } from 'react';

export function SpotlightCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const spot = spotRef.current;
    if (!dot || !ring || !spot) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      spot.style.transform = `translate(${mouseX - 300}px, ${mouseY - 300}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-magnetic]')
      ) {
        ring.classList.add('hovering');
      }
    };

    const onLeave = () => {
      ring.classList.remove('hovering');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Amber dot */}
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ top: 0, left: 0 }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ top: 0, left: 0 }}
      />
      {/* Large spotlight glow */}
      <div
        ref={spotRef}
        className="spotlight hidden md:block"
        style={{ top: 0, left: 0, width: 600, height: 600 }}
      />
    </>
  );
}
