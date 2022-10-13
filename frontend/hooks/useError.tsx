import { ReactElement } from 'react';
import CustomError from 'components/CustomError';

export const useError = () => {
  const renderError = (msg: string): ReactElement => (
    <CustomError>{msg}</CustomError>
  );
  return {
    renderError,
  };
};

export default useError;
