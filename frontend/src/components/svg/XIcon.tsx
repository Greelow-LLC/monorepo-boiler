interface Props {
  width?: string;
  height?: string;
}

export const XIcon = ({ width = 'h-6', height = 'w-6' }: Props) => {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
