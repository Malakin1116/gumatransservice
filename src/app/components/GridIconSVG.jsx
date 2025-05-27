export default function GridIconSVG({ className = '' }) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="4" width="8" height="8" strokeWidth={2} fill="none" />
        <rect x="12" y="4" width="8" height="8" strokeWidth={2} fill="none" />
        <rect x="4" y="12" width="8" height="8" strokeWidth={2} fill="none" />
        <rect x="12" y="12" width="8" height="8" strokeWidth={2} fill="none" />
      </svg>
    );
  }