import React from "react";

interface CustomRadioProps {
  name: string;
  id: string;
  otherClassNames?: string;
  label: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  id,
  otherClassNames,
  label,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="radio"
        className={`focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 ${otherClassNames}`}
      />
      <label
        htmlFor={id}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomRadio;
