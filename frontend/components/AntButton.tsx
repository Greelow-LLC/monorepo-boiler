import { Button } from 'antd';
import { ReactElement, ReactNode } from 'react';

interface Props {
  icon?: ReactElement;
  color?: 'red' | 'green' | 'blue' | 'sky';
  children?: ReactNode;
  size?: 's' | 'm' | 'l';
  shape?: 'circle' | 'default' | 'round';
  className?: string;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
  onClick?: () => void;
  disabled?: boolean;
}

const AntButton: React.FC<Props> = ({
  icon,
  color = 'sky',
  children,
  size = 'm',
  shape = 'round',
  type = 'default',
  className = '',
  disabled = false,
  onClick = () => undefined,
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

  const buttonStyles = `${className} ${buttonColor} ${buttonSize} shadow-xl`;
  return (
    <>
      <Button
        onClick={onClick}
        type={type}
        className={buttonStyles}
        onMouseDown={e => e.preventDefault()}
        disabled={disabled}
        shape={shape}
        icon={icon && icon}
      >
        {children && children}
      </Button>
    </>
  );
};
export default AntButton;
