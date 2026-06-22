import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function CarWashIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Car body */}
      <path
        d="M3 13h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Car roof */}
      <path
        d="M6 13l2.5-4h7l2.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="7" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Water drops */}
      <path d="M8 5v3M8 5l-1 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3v3M12 3l-1 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 5v3M16 5l-1 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
