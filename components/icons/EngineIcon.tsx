import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function EngineIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Engine block */}
      <rect x="3" y="8" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Pistons */}
      <rect x="6" y="5" width="2.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="5" width="2.5" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Exhaust pipe */}
      <path d="M17 11.5h2.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Intake */}
      <path d="M3 10.5H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 14.5H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Oil cap */}
      <circle cx="9" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Valve cover bolts */}
      <circle cx="5.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="12.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
