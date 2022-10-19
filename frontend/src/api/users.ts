import { LoginData, RegisterUser } from '@/src/types/api';
import { LogInValues } from '@/src/types/forms';
import { postHttp } from '@/src/utils/http';

export const registerUser = async (body: RegisterUser): Promise<LoginData> =>
  await postHttp('users/register', body);

export const loginUser = async (body: LogInValues): Promise<LoginData> =>
  await postHttp('users/login', body);
