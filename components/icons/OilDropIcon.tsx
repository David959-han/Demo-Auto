import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function OilDropIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Oil drop shape */}
      <path
        d="M12 3C12 3 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-12-7-12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Shine/highlight inside drop */}
      <path
        d="M9 15.5a3.5 3 0 0 0 3.5 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Oil can spout above */}
      <path
        d="M15 5.5h2.5M17.5 5.5V3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
