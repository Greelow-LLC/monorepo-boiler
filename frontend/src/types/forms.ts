export interface CountriesValues {
  descri: string;
}

export interface LogInValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormValues = CountriesValues | LogInValues | SignUpValues;
