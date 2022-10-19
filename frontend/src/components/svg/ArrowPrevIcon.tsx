interface Props {
  width?: string;
  height?: string;
}

export const ArrowPrevIcon = ({ width = 'w-6', height = 'h-6' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${width} ${height}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 17l-5-5m0 0l5-5m-5 5h12"
      />
    </svg>
  );
};
