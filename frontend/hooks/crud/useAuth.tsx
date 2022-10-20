import { registerUser, loginUser } from 'api/users';
import { AxiosError } from 'axios';
import { UserContext } from 'contexts/userContext';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { RegisterUser, LoginData } from 'types/api';
import { UserContextType } from 'types/context';
import { FormValues, LogInValues, SignUpValues } from 'types/forms';

const useAuth = () => {
  const { login } = useContext(UserContext) as UserContextType;

  const {
    mutateAsync: signIn,
    isLoading: isLoadingLogin,
    error: errorLogin,
    isError: isErrorLogin,
  } = useMutation<LoginData, AxiosError<Error, any> | null, LogInValues>(
    loginUser,
  );

  const {
    mutateAsync: register,
    isLoading: isLoadingRegister,
    isError: isErrorRegister,
    error: errorRegister,
  } = useMutation<LoginData, AxiosError<Error, any> | null, RegisterUser>(
    registerUser,
  );

  const handleRegister = async (values: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...valuesToSend } = values as SignUpValues;
    await register(valuesToSend as RegisterUser);
  };

  const handleLogin = async (values: FormValues) => {
    const valuesToSend = values as LogInValues;
    const { token }: LoginData = await signIn(valuesToSend);
    login(token);
  };

  return {
    handleLogin,
    handleRegister,
    isLoadingLogin,
    isLoadingRegister,
    errorLogin,
    errorRegister,
    isErrorLogin,
    isErrorRegister,
  };
};

export default useAuth;
