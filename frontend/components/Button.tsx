import { ReactElement } from 'react';

interface Props {
  label?: string | ReactElement;
  color?: string;
  size?: string;
  hasBg?: boolean;
  otherClassNames?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  label = 'Button',
  color = 'sky',
  size = 'full',
  type = 'button',
  hasBg = true,
  otherClassNames = '',
  disabled = false,
  onClick = () => undefined,
}: Props) => {
  const buttonColor = {
    red: `${
      disabled ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700'
    } focus:ring-red-500`,
    green: `bg-custom-green hover:bg-custom-green-dark focus:ring-green-500`,
    blue: `bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`,
    sky: `bg-sky-600 hover:bg-sky-700 focus:ring-sky-500`,
  };

  const buttonSize = {
    xxs: 'w-[3rem]  text-xs',
    xs: 'w-[5rem] text-xs',
    sm: 'w-[7rem] text-sm',
    md: 'w-[10rem] text-base',
    lg: 'w-[12rem] text-lg',
    xl: 'w-[15rem] text-xl',
    full: 'w-full h-[3.2rem] p-0 text-xl',
  };

  const dynamicStyles = `${otherClassNames} ${
    hasBg && buttonColor[color as keyof typeof buttonColor]
  } ${hasBg && 'text-white shadow-sm focus:ring-2'} ${
    buttonSize[size as keyof typeof buttonSize]
  } 
  `;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${dynamicStyles} h-[3rem] p-3 border-none border-transparent font-medium rounded-full focus:outline-none  focus:ring-offset-2`}
      disabled={disabled}>
      {label}
    </button>
  );
};
export default Button;
