import { StatesData, CountriesData, AddCustomer } from 'types/api';

export enum Country {
  US = 'US',
  CA = 'CA',
  MX = 'MX',
}

export interface ProfileValues {
  companyWebsite: string;
  about: string;
}

export interface BulkInsertValues {
  excel: FormData | string;
  zip: FormData | string;
}

export interface PersonalValues {
  firstName: string;
  lastName: string;
  email: string;
  country: Country | 'phrase';
  street: string;
  city: string;
  state: string;
  zip: '';
}

export interface PopularItemsValues {
  item: number | string;
  position: number | string;
}

export interface PurchaseItemsValues {
  item: number | string;
  purchase: number | string;
}

export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface MessagesValues {
  status: number | string;
  subject: string;
  message: string;
  email: string;
}

export interface LogInValues {
  email: string;
  password: string;
}

export interface UserValues {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | number;
  password: string | null;
  confirmPassword: string | null;
  phone: number | string | null;
  address: string | null;
  city: number | string | null;
  status: number | string | null;
  isAdmin: boolean | string;
}

export interface UserPassValues {
  id: number | string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PostsValues {
  title: string;
  author: string;
}

export interface PurchasesValues {
  status: number;
}

export interface StatesValues {
  descri: string;
  country: number | string | CountriesData;
}

export interface StatusesValues {
  descri: string;
  module: number | string;
}

export interface LocationsValues {
  descri: string;
  latitude: number | string;
  longitude: number | string;
  city: number | string;
  status: number | string;
  position: number | string;
}

export interface CategoriesValues {
  descri: string;
}

export interface MediaTypesValues {
  descri: string;
}

export interface ModulesValues {
  descri: string;
}

export interface CitiesValues {
  descri: string;
  latitude: number | string;
  longitude: number | string;
  state: string | StatesData | number;
}

export interface CountriesValues {
  descri: string;
}

export interface NotificationValues {}

export interface CustomersValues
  extends Omit<AddCustomer, 'city' | 'status' | 'medias' | 'images'> {
  city: string | number;
  status: string | number;
}

export interface ItemOptionsValues {
  title: string;
  price: number | string;
  quantity: number | string;
  duration: number | string;
  startDate: Date | number;
  item: number | string;
}

export interface ItemsValues {
  title: string;
  descri: string;
  location: string | number;
  category: string | number;
  customer: string | number;
  expireDate: Date;
  policy: string;
  terms: string;
  tags?: string[];
}
export interface PaymentMethodsValues {
  descri: string | null;
  appKey: string | null;
  secretKey: string | null;
  publicData1: string | null;
  privateData1: string | null;
  status: any;
}

export type FormValues =
  | ProfileValues
  | PersonalValues
  | SignUpValues
  | LogInValues
  | PostsValues
  | StatesValues
  | LocationsValues
  | ModulesValues
  | CitiesValues
  | CountriesValues
  | NotificationValues
  | CategoriesValues
  | CustomersValues
  | ItemOptionsValues
  | ItemsValues
  | PaymentMethodsValues
  | PurchasesValues
  | MessagesValues
  | UserValues
  | PurchaseItemsValues
  | UserPassValues
  | BulkInsertValues;
