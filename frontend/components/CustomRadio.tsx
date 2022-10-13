interface Props {
  name: string;
  id: string;
  className?: string;
  label: string;
}

const CustomRadio = ({ id, className, label, ...props }: Props) => {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="radio"
        className={`focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 ${className}`}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CustomRadio;
