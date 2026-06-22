import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function ReceiptIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Receipt paper */}
      <path
        d="M4 4v16l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5 2-1.5V4H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Lines (items) */}
      <path d="M8 9h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Amount */}
      <path d="M8 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Soʻm / price indicator */}
      <path d="M14 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
