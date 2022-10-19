import { Button as AntButton } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  color?: 'red' | 'green' | 'blue' | 'sky';
  disabled?: boolean;
  icon?: ReactElement;
  onClick?: () => void;
  shape?: 'circle' | 'default' | 'round';
  size?: 's' | 'm' | 'l';
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
}

const Button: React.FC<Props> = ({
  children,
  className = '',
  color = 'sky',
  disabled = false,
  icon,
  onClick = () => undefined,
  shape = 'round',
  size = 'm',
  type = 'default',
}) => {
  const buttonColor = {
    red: `${
      disabled ? 'bg-red-300' : 'bg-red-600 hover:bg-red-500'
    }`,
    green: `bg-custom-green hover:bg-custom-green-dark`,
    blue: `bg-blue-600 hover:bg-blue-500`,
    sky: `bg-sky-600 hover:bg-sky-500`,
  }[color];

  const buttonSize = {
    s: 'small',
    m: 'default',
    l: 'large',
  }[size];

  // const buttonSize = {
  //   xxs: 'w-[3rem]  text-xs',
  //   xs: 'w-[5rem] text-xs',
  //   sm: 'w-[7rem] text-sm',
  //   md: 'w-[10rem] text-base',
  //   lg: 'w-[12rem] text-lg',
  //   xl: 'w-[15rem] text-xl',
  //   full: 'w-full h-[3.2rem] p-0 text-xl',
  // };

  const buttonStyles = `${className} ${buttonColor} shadow-xl`;
  return (
    <AntButton
      onClick={onClick}
      type={type}
      size={buttonSize as SizeType}
      className={buttonStyles}
      onMouseDown={e => e.preventDefault()}
      disabled={disabled}
      shape={shape}
      icon={icon && icon}
    >
      {children && children}
    </AntButton>
  );
};
export default Button;
