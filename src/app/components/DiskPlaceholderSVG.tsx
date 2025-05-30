// Прибрано зайвий імпорт React
interface DiskPlaceholderSVGProps {
    className?: string;
  }
  
  const DiskPlaceholderSVG: React.FC<DiskPlaceholderSVGProps> = ({ className }) => {
    return (
      <svg
        className={className}
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="48" cy="48" r="29" fill="#4B5563" stroke="#1F2937" strokeWidth="2" />
        <circle cx="48" cy="48" r="14" fill="#6B7280" />
        <circle cx="38" cy="29" r="3" fill="#D1D5DB" />
        <circle cx="58" cy="29" r="3" fill="#D1D5DB" />
        <circle cx="29" cy="48" r="3" fill="#D1D5DB" />
        <circle cx="67" cy="48" r="3" fill="#D1D5DB" />
        <circle cx="38" cy="67" r="3" fill="#D1D5DB" />
        <circle cx="58" cy="67" r="3" fill="#D1D5DB" />
      </svg>
    );
  };
  
  export default DiskPlaceholderSVG;