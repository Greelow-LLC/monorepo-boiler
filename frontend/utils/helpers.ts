import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { decode } from 'jsonwebtoken';

export const decodeToken = (token: string) => decode(token) ?? null;

export const getExpireDate = (token: string) => {
  const decodedToken = decodeToken(token) as { exp: number };
  return new Date(decodedToken?.exp * 1000) ?? null;
};

export const isExpired = (exp: Date) => {
  const expMinus10Minutes = dayjs(exp).subtract(10, 'minutes').unix() * 1000;

  return expMinus10Minutes <= new Date().getTime();
};

export const errorMessage = (errorKey: AxiosError<Error, any> | null) => {
  const msg = errorKey?.response?.data?.message ?? errorKey?.message;
  return typeof msg === 'string' ? msg : msg && msg[0];
};
