import { LoginData, RegisterUser } from 'types/api';
import { LogInValues } from 'types/forms';
import { postHttp } from 'utils/http';

export const registerUser = async (body: RegisterUser): Promise<LoginData> =>
  await postHttp('register', body);

export const loginUser = async (body: LogInValues): Promise<LoginData> =>
  await postHttp('adminLogin', body);
