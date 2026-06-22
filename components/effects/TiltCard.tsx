'use client';

import { useRef, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const glowX = useSpring(50, { stiffness: 150, damping: 20 });
  const glowY = useSpring(50, { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateX.set((py - 0.5) * -maxTilt);
    rotateY.set((px - 0.5) * maxTilt);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={cn('tilt-card relative', className)}
    >
      {/* Inner glow that follows mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(245,158,11,0.12) 0%, transparent 60%)`,
        }}
      />
      <div className="tilt-card-inner relative z-10">{children}</div>
    </motion.div>
  );
}
