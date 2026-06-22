import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function SpeedometerIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Speedometer arc */}
      <path
        d="M5 17A7 7 0 0 1 19 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Tick marks */}
      <path d="M5.5 14l-1-1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 11l-.7-1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.5 11l.7-1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 14l1-1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Needle pointing to 80% (fast) */}
      <path
        d="M12 17L16.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Center pivot */}
      <circle cx="12" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}
