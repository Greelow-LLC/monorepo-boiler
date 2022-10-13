import { ClosedEyeIcon, OpenedEyeIcon } from 'components/svg';
import React, { useCallback, useState } from 'react';
import { IMaskInput } from 'react-imask';

interface CustomInputProps {
  otherClassNames?: string;
  placeholder?: string;
  id: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  type?: string;
  mask?: any;
  isPassWordInput?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  step?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  otherClassNames,
  label,
  id,
  type = 'text',
  mask = null,
  step = '',
  isPassWordInput = false,
  ...props
}) => {
  const [inputType, setInputType] = useState(
    isPassWordInput ? 'password' : type,
  );

  const handleToggleInputType = useCallback(() => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }, [inputType]);

  const PASSWORD = 'password';
  return (
    <>
      {label && (
        <label htmlFor={id} className="text-sm ml-2 mb-2 text-gray-800">
          {label}
        </label>
      )}
      <div
        className={`mr-2 w-full h-[50px] rounded-full bg-white-off border-gray-300 flex items-center justify-between ${otherClassNames}`}>
        <IMaskInput
          {...props}
          autoComplete="off"
          mask={mask}
          step={step}
          type={inputType}
          className="w-full h-full bg-transparent border-transparent focus:border-transparent focus:ring-0"
        />
        {isPassWordInput && (
          <button
            className="px-3"
            onClick={handleToggleInputType}
            type="button">
            {inputType === PASSWORD ? <ClosedEyeIcon /> : <OpenedEyeIcon />}
          </button>
        )}
      </div>
    </>
  );
};

export default CustomInput;
