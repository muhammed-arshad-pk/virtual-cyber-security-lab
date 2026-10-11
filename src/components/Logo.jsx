export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M24 3 6 9.5v12.2c0 11 7.6 20.6 18 23.3 10.4-2.7 18-12.3 18-23.3V9.5L24 3Z" fill="none" stroke="url(#logo-grad)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 10 12 14.3v7.9c0 7.2 5 13.6 12 15.6 7-2 12-8.4 12-15.6v-7.9L24 10Z" fill="url(#logo-grad)" opacity=".22" />
      <rect x="18" y="22" width="12" height="9" rx="2" fill="url(#logo-grad)" />
      <path d="M20.5 22v-2.5a3.5 3.5 0 0 1 7 0V22" fill="none" stroke="url(#logo-grad)" strokeWidth="2.4" />
    </svg>
  );
}
