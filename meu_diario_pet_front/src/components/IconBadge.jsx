const iconMap = {
  paw: (
    <path d="M12 17.5c1.6 0 3.6 1.2 4.9 2.7.5.6 1.4.6 1.9 0 1.3-1.5 3.3-2.7 4.9-2.7 2.3 0 4.1 1.8 4.1 4 0 4.3-5.8 8.5-9.9 10.3-4.1-1.8-9.9-6-9.9-10.3 0-2.2 1.8-4 4.1-4z" />
  ),
  search: (
    <path d="M20.5 20.5L16 16m1-5a6 6 0 11-12 0 6 6 0 0112 0z" />
  ),
  diary: (
    <path d="M8 4h13a2 2 0 012 2v20a2 2 0 01-2 2H8V4zm0 0H5a2 2 0 00-2 2v20a2 2 0 002 2h3M11 10h8M11 15h8M11 20h6" />
  ),
  tip: (
    <path d="M16 4a8 8 0 00-5.5 13.8c.8.7 1.5 1.8 1.5 3V22h8v-1.2c0-1.2.7-2.3 1.5-3A8 8 0 0016 4zm-3 21h6M14 28h4" />
  ),
};

function IconBadge({ icon = "paw", label }) {
  return (
    <span className="icon-badge" aria-label={label || icon} title={label || icon}>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
        {iconMap[icon] || iconMap.paw}
      </svg>
    </span>
  );
}

export default IconBadge;