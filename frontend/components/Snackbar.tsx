import { CloseOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import React, { useEffect } from 'react';

export interface Props {
  closeSnack: () => void;
  type: string;
  message: string | null;
}

const Snackbar = ({ closeSnack, type, message }: Props) => {
  useEffect(() => {
    if (message != null)
      setTimeout(() => {
        closeSnack();
      }, 5000);
  }, [message]);

  return (
    <div
      className={
        type +
        ' fixed top-[20px] right-[30px] rounded space-x-2 shadow min-w-[300px] min-h-[50px] px-2 py-1 text-white flex justify-between items-center'
      }>
      <div>{message && <span>{message}</span>}</div>
      <div>
        <Button icon={<CloseOutlined />} onClick={closeSnack} />
      </div>
    </div>
  );
};
export default Snackbar;
