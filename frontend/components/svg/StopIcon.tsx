interface Props {
  width?: string;
  height?: string;
}

export const StopIcon = ({ width = 'w-6', height = 'h-6' }: Props) => {
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
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  );
};
