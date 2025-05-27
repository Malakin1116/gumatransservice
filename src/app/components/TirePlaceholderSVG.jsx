export default function TirePlaceholderSVG({ width = 200, height = 200, className = '' }) {
    return (
      <svg width={width} height={height} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Зовнішня шина (товста) */}
        <circle cx="100" cy="100" r="90" stroke="#1F2937" strokeWidth="30" fill="none"/>
        {/* Обід (диск) */}
        <circle cx="100" cy="100" r="60" fill="#4B5563"/>
        {/* Центральний диск */}
        <circle cx="100" cy="100" r="30" fill="#6B7280"/>
        {/* Протектор (масивні блоки) */}
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(0 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(45 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(90 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(135 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(180 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(225 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(270 100 100)"/>
        <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(315 100 100)"/>
        {/* Отвори в диску */}
        <circle cx="80" cy="60" r="6" fill="#D1D5DB"/>
        <circle cx="120" cy="60" r="6" fill="#D1D5DB"/>
        <circle cx="60" cy="100" r="6" fill="#D1D5DB"/>
        <circle cx="140" cy="100" r="6" fill="#D1D5DB"/>
        <circle cx="80" cy="140" r="6" fill="#D1D5DB"/>
        <circle cx="120" cy="140" r="6" fill="#D1D5DB"/>
      </svg>
    );
  }