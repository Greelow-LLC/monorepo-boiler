import React from "react";

interface CustomTextareaProps {
  otherClassNames?: string;
  placeholder?: string;
  id: string;
  rows?: number;
  label?: string;
  mask?: any;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  otherClassNames,
  id,
  label,
  rows = 3,
  mask = null,
  ...props
}) => {
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
        className={`p-3 w-full rounded-3xl bg-white-off border-gray-300 ${otherClassNames}`}
      />
    </div>
  );
};

export default CustomTextarea;
