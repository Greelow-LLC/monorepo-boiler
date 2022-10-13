import CustomError from 'components/CustomError';
import { ReactElement } from 'react';

export const useError = () => {
  const renderError = (msg: string): ReactElement => (
    <CustomError>{msg}</CustomError>
  );
  return {
    renderError,
  };
};

export default useError;
