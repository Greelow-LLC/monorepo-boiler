interface Props {
  className?: string;
  placeholder?: string;
  id: string;
  rows?: number;
  label?: string;
}

const CustomTextarea = ({
  className,
  id,
  label,
  rows = 3,
  ...props
}: Props) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm mb-2 text-gray-800">
          {label}
        </label>
      )}
      <textarea
        {...props}
        rows={rows}
        className={`p-3 w-full rounded-3xl bg-white-off border-gray-300 ${className}`}
      />
    </div>
  );
};

export default CustomTextarea;
