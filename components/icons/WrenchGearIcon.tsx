import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function WrenchGearIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Gear */}
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.1 12a7.1 7.1 0 0 0-.1-1.1l1.9-1.5-1.8-3.1-2.3.8A7 7 0 0 0 15 6.1L14.6 4h-3.2L11 6.1a7 7 0 0 0-1.8.9l-2.3-.8-1.8 3.1 1.9 1.5a7.1 7.1 0 0 0 0 2.2L4.9 14.5l1.8 3.1 2.3-.8c.5.4 1.1.7 1.8.9l.4 2.2h3.2l.4-2.2a7 7 0 0 0 1.8-.9l2.3.8 1.8-3.1-1.9-1.5c.1-.4.1-.7.1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
