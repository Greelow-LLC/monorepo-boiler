interface Props {
  width?: string;
  height?: string;
}

export const WorldIcon = ({ width = 'w-6', height = 'h-6' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${width} ${height} mr-4`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={0.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};