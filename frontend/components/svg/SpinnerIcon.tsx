export const SpinnerIcon = ({ height = '', width = '' }) => {
  return (
    <svg
      className={`${'spinner'} h-${height} w-${width}`}
      style={{
        background: 'none',
        shapeRendering: 'auto',
      }}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="32"
        stroke="#28da2b"
        strokeDasharray="50.26548245743669 50.26548245743669"
        strokeLinecap="round"
        strokeWidth="8"
      />
    </svg>
  );
};
