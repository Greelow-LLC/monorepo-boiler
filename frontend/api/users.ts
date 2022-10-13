import { LoginData, RegisterUser } from 'types/api';
import { LogInValues } from 'types/forms';
import { postHttp } from 'utils/http';

export const registerUser = async (body: RegisterUser): Promise<LoginData> =>
  await postHttp('users/register', body);

export const loginUser = async (body: LogInValues): Promise<LoginData> =>
  await postHttp('users/login', body);
