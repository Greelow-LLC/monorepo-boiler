interface Props {
  width?: string;
  height?: string;
}

const CheckIcon: React.FC<Props> = ({
  width = 'w-6',
  height = 'h-6',
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${width} ${height}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};

export default CheckIcon;
