'use client';

interface LogoMarkProps {
  size?: number;
}

export function LogoMark({ size = 44 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bg-grad" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#3D1F10" />
          <stop offset="100%" stopColor="#1A0C06" />
        </radialGradient>
        <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c060" />
          <stop offset="55%" stopColor="#C8963E" />
          <stop offset="100%" stopColor="#A67A2E" />
        </linearGradient>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0c060" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C8963E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A67A2E" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="22" cy="22" r="22" fill="url(#bg-grad)" />

      {/* Outer gold ring */}
      <circle cx="22" cy="22" r="20.5" stroke="url(#ring-grad)" strokeWidth="1.2" fill="none" />

      {/* Inner thin ring */}
      <circle cx="22" cy="22" r="18" stroke="rgba(200,150,62,0.2)" strokeWidth="0.6" fill="none" />

      {/* 8-point star — drawn as two overlaid squares rotated 45° */}
      {/* Outer star polygon */}
      <polygon
        points="22,7 24.2,15.5 33,14 26.5,19.5 30,28 22,23.5 14,28 17.5,19.5 11,14 19.8,15.5"
        fill="url(#star-grad)"
        filter="url(#glow)"
      />
      {/* Inner highlight facet */}
      <polygon
        points="22,10.5 23.4,16.8 29.5,16 24.8,19.6 27.2,25.5 22,22 16.8,25.5 19.2,19.6 14.5,16 20.6,16.8"
        fill="#f0c060"
        opacity="0.28"
      />

      {/* Small center dot */}
      <circle cx="22" cy="22" r="1.6" fill="#1A0C06" opacity="0.7" />

      {/* Bottom arc text area — decorative line */}
      <path
        d="M 11 33 Q 22 38 33 33"
        stroke="rgba(200,150,62,0.35)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
