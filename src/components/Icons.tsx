import type { SVGProps } from "react";

type IconProps = { className?: string };

const svgProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

export function IconDownload({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M12 3v13m0 0l-4-4m4 4l4-4" />
      <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </svg>
  );
}

export function IconGithub({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function IconTerminal({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function IconCopy({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export function IconCheck({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconSearch({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconExternal({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function IconLayers({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function IconCode({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function IconShield({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function IconKeyboard({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="6" y1="8" x2="6" y2="8.01" />
      <line x1="10" y1="8" x2="10" y2="8.01" />
      <line x1="14" y1="8" x2="14" y2="8.01" />
      <line x1="18" y1="8" x2="18" y2="8.01" />
      <line x1="6" y1="12" x2="6" y2="12.01" />
      <line x1="10" y1="12" x2="10" y2="12.01" />
      <line x1="14" y1="12" x2="14" y2="12.01" />
      <line x1="18" y1="12" x2="18" y2="12.01" />
      <line x1="8" y1="16" x2="16" y2="16" />
    </svg>
  );
}

export function IconVolume({ className = "w-3.5 h-3.5" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  );
}

export function IconWifi({ className = "w-3.5 h-3.5" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth={2} />
    </svg>
  );
}

export function IconCpu({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  );
}

export function IconMenu({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function IconClose({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function IconX({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function IconArrowUp({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="6 11 12 5 18 11" />
    </svg>
  );
}

export function IconArrowRight({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export type { IconProps };
