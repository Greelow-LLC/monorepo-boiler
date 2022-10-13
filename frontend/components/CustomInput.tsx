import { ClosedEyeIcon, OpenedEyeIcon } from 'components/svg';
import { AnyMaskedOptions } from 'imask';
import React, { useCallback, useState, useEffect } from 'react';
import { useIMask } from 'react-imask';

interface Props {
  className?: string;
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
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  className,
  label,
  id,
  type = 'text',
  mask = null,
  isPassWordInput = false,
  ...props
}: Props) => {
  const [inputType, setInputType] = useState(
    isPassWordInput ? 'password' : type,
  );

  const [opts, setOpts] = useState<AnyMaskedOptions | null>(null);

  useEffect(() => {
    setOpts(mask);
  }, []);

  const { ref } = useIMask(opts as AnyMaskedOptions);

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
        className={`mr-2 w-full h-[50px] rounded-full bg-white-off border-gray-300 flex items-center justify-between ${className}`}>
        <input
          {...props}
          autoComplete="off"
          ref={ref}
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
