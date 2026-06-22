import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function CarIcon({ className, size = 24 }: IconProps) {
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
        d="M3 11h18v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Car roof with windshields */}
      <path
        d="M5.5 11l2-5h9l2 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Windshield */}
      <path
        d="M8 11l1.5-3.5h5L16 11"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      {/* Wheels */}
      <circle cx="7.5" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Wheel rims */}
      <circle cx="7.5" cy="17" r="0.5" fill="currentColor" />
      <circle cx="16.5" cy="17" r="0.5" fill="currentColor" />
      {/* Headlights */}
      <path d="M3 13h1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.5 13H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
