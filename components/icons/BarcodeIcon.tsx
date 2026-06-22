import { cn } from '@/lib/utils/cn';

interface IconProps {
  className?: string;
  size?: number;
}

export function BarcodeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      {/* Outer border corners */}
      <path d="M3 9V5.5A1.5 1.5 0 0 1 4.5 4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 9V5.5A1.5 1.5 0 0 0 19.5 4H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 15v3.5A1.5 1.5 0 0 0 4.5 20H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 15v3.5a1.5 1.5 0 0 1-1.5 1.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Barcode lines */}
      <line x1="6" y1="8" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.5" y1="8" x2="8.5" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="8" x2="11" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="13" y1="8" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="8" x2="15" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="8" x2="17" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
