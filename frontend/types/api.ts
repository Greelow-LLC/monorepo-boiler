import { CountriesValues } from 'types/forms';

type Base = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  descri: string;
};

export type CountriesData = Base;

export type CurrentUserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
};

export type EditCountryKey = {
  id: number;
  body: CountriesValues;
};

export type LoginData = {
  token: string;
};

export type RegisterUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
