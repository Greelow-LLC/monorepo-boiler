import React from 'react';

interface CustomSelectProps {
  children: React.ReactNode;
  disabled?: boolean;
  id: string;
  otherClassNames?: string;
  placeholder?: string;
  label?: string;
  type?: 'gray' | 'white';
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  children,
  id,
  otherClassNames,
  label,
  type = 'white',
  ...props
}) => {
  const bgColor = {
    gray: 'bg-white-off',
    white: 'bg-white',
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className="text-sm ml-2 mb-2 text-gray-800">
          {label}
        </label>
      )}
      <select
        {...props}
        className={`${bgColor[type]} block w-full py-2 px-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-700 ${otherClassNames}`}
      >
        {children}
      </select>
    </>
  );
};

export default CustomSelect;
