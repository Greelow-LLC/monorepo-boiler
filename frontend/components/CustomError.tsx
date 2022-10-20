import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CustomError: React.FC<Props> = ({ children }) => {
  return <span className="text-red-600">{children}</span>;
};

export default CustomError;
