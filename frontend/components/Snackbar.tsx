import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface props {
  closeSnack: () => void;
  type: string;
  message: string | null;
}

const Snackbar: React.FC<props> = ({ closeSnack, type, message }) => {
  const [color, setColor] = useState('bg-green-600');
  useEffect(() => {
    if (message != null)
      setTimeout(() => {
        closeSnack();
      }, 5000);
  }, [message]);

  useEffect(() => {
    type == 'success' ? setColor('bg-green-600') : setColor('bg-red-600');
  }, [type]);
  return (
    <div
      className={
        type +
        ' fixed top-[20px] right-[30px] rounded space-x-2 shadow min-w-[300px] min-h-[50px] px-2 py-1 text-white flex justify-between items-center'
      }
    >
      <div>{message && <span>{message}</span>}</div>
      <div>
        <FontAwesomeIcon
          className="w-[10px] text-sm mr-4 cursor-pointer active:w-[9px]"
          icon={'fa-solid fa-close' as IconProp}
          onClick={() => closeSnack()}
        />
      </div>
    </div>
  );
};
export default Snackbar;
