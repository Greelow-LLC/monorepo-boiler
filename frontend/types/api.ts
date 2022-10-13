import {
  PopularItemsValues,
  CountriesValues,
  StatesValues,
  CategoriesValues,
  MediaTypesValues,
  PaymentMethodsValues,
  MessagesValues,
  PurchaseItemsValues,
} from 'types/forms';

export interface BulkInsertData extends Omit<Base, 'descri'> {
  fileName: string;
  log: {
    countries: CountryBulkInsert[];
    states: StatesBulkInsert[];
    cities: CitiesBulkInsert[];
    locations: LocationsBulkInsert[];
    customers: CustomersBulkInsert[];
    items: ItemsBulkInsert[];
    itemOptions: ItemOptionsBulkInsert[];
    medias: MediasBulkInsert[];
  };
}

export interface BaseBulkInsert {
  error: boolean;
  message?: string;
  row: number;
  sheet: string;
}

interface CountryBulkInsert extends BaseBulkInsert {
  country: CountriesData;
}

interface StatesBulkInsert extends BaseBulkInsert {
  state: StatesData;
}

interface CitiesBulkInsert extends BaseBulkInsert {
  city: CitiesData;
}

interface LocationsBulkInsert extends BaseBulkInsert {
  location: LocationsData;
}

interface CustomersBulkInsert extends BaseBulkInsert {
  customer: CustomersData;
}

interface ItemsBulkInsert extends BaseBulkInsert {
  item: ItemsData;
}

interface ItemOptionsBulkInsert extends BaseBulkInsert {
  itemOption: ItemOptionsData;
}

interface MediasBulkInsert extends Omit<BaseBulkInsert, 'row'> {
  media: MediasData;
}

export interface MediasData extends Omit<Base, 'descri'> {
  url: string;
  value: number;
  entity: string;
  key: string;
  mediaType: MediaTypesData;
}
export type AddMedia = {
  mediaType: number;
  entity: string;
  value: number;
  url: string;
  descri: string;
};

export type LoginData = {
  token: string;
};

type Base = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  descri: string;
};

export interface PurchaseItemsData extends Omit<Base, 'descri'> {
  id: number;
  purchase: PurchaseItemsData;
  itemOption: ItemOptionsData;
  quantity: number;
  price: number;
}

export interface PurchasesData extends Omit<Base, 'descri'> {
  createDate: Date;
  user: CurrentUserData;
  paymentMethod: PaymentMethodsData;
  paymentLogReq: string;
  paymentLogRes: string;
  status: StatusesData;
  purchaseItem: PurchaseItemsData[];
}

export interface PopularItemsData extends Omit<Base, 'descri'> {
  item: ItemsData;
  position: number;
}

export interface CountriesData extends Base {}

export interface CategoriesData extends Base {
  medias: MediasData[];
}

export interface MessagesData extends Base {
  subject: string;
  message: string;
  email: string;
  status: StatusesData;
}

export interface EditCategoryKey {
  id: number;
  body: CategoriesValues;
}

export interface EditPurchaseItemsKey {
  id: number;
  body: PurchaseItemsValues;
}

export interface EditPopularItemsKey {
  id: number;
  body: PopularItemsValues;
}

export interface EditStateKey {
  id: number;
  body: StatesValues;
}

export type EditCountryKey = {
  id: number;
  body: CountriesValues;
};

export type EditMessageKey = {
  id: number;
  body: MessagesValues;
};

export type EditPaymentMethodKey = {
  id: number;
  body: PaymentMethodsValues;
};

export type EditMediaTypeKey = {
  id: number;
  body: MediaTypesValues;
};

export interface StatesData extends Base {
  country: CountriesData;
}
export type AddState = {
  country: number;
  descri: string;
};

export interface ModulesData extends Base {}
export type AddModules = {
  descri: string;
};
export type EditModulesKey = {
  body: AddModules;
  id: number;
};

export interface StatusesData extends Base {
  module: ModulesData;
}
export type AddStatus = {
  descri: string;
  module: number;
};
export type EditStatusKey = {
  id: number;
  body: AddStatus;
};

export interface CitiesData extends Base {
  latitude: number;
  longitude: number;
  state: StatesData;
}
export type AddCity = {
  state: number;
  descri: string;
  latitude: number;
  longitude: number;
};
export type EditCityKey = {
  id: number;
  body: AddCity;
};

export interface LocationsData extends Base {
  latitude: number;
  longitude: number;
  position: number;
  city: CitiesData;
  status: StatusesData;
  medias: Array<Omit<MediasData, 'mediaType'>>;
}
export type AddLocations = Omit<LocationsData, 'city' | 'status' | 'medias'> & {
  city: number;
  status: number;
  images: string[];
};

export interface PaymentMethodsData extends Base {
  appKey: string | null;
  secretKey: string | null;
  publicData1: string | null;
  privateData1: string | null;
  status: StatusesData;
}

export interface MediaTypesData extends Base {}

export interface ModulesData extends Base {}

export type CurrentUserData = {
  id: number;
  email: string;
  dateOfBirth: Date | string;
  socialId: string;
  loginType: loginTypeData;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: string | null;
  deviceToken: string | null;
  isAdmin: boolean;
  status: StatusesData | null;
  city: CitiesData | null;
  medias: Array<Omit<MediasData, 'mediaType'>>;
};

export interface UsersData extends CurrentUserData {
  password: string | null;
  confirmPassword: string | null;
  status: StatusesData;
  city: CitiesData;
  medias: MediasData[];
  lastPurchase: number | Date | null;
}

export type EditUserKey = {
  id: number;
  body: {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | number;
    phone: string;
    address: string;
    city: number | null | string;
    status: number | null | string;
    isAdmin: boolean;
  };
};

export type loginTypeData = {
  id: number;
  typeCode: string;
  descri: string;
};

export type EditUserPassKey = {
  id: number;
  body: {
    oldPassword: string;
    newPassword: string;
  };
};

export type RegisterUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export interface CustomersData extends Omit<Base, 'descri'> {
  fantasyName: string;
  legalName: string;
  email: string;
  fiscalNumber: string;
  address: string;
  phone: string;
  contactName: string;
  emailPurchase: string;
  zipCode: string;
  city: CitiesData;
  status: StatusesData;
  medias: Array<Omit<MediasData, 'mediaType'>>;
}
export type AddCustomer = Omit<
  CustomersData,
  'city' | 'status' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'id'
> & {
  city: number;
  status: number;
  images: Array<AddMedia['url']>;
};
export type EditCustomerKey = {
  body: AddCustomer;
  id: number;
};

export type EditPurchaseKey = {
  id: number;
  body: {
    status: number;
    user: number;
    paymentMethod: number;
    paymentLogReq: string;
    paymentLogRes: string;
  };
};

export interface ItemOptionsData extends Omit<Base, 'descri'> {
  title: string;
  price: number;
  quantity: number;
  duration: number;
  startDate: Date | number;
  item: ItemsData;
}

export type AddItemOptions = Omit<ItemOptionsData, 'item'> & { item: number };
export type EditItemOptionsKey = {
  id: number;
  body: AddItemOptions;
};

export interface ItemsData extends Base {
  title: string;
  expireDate: Date;
  location: LocationsData;
  category: CategoriesData;
  customer: CustomersData;
  itemOptions: ItemOptionsData[];
  tags: {
    content: string[];
  };
  medias: Array<Omit<MediasData, 'mediaType'>>;
}
export type AddItems = {
  item: {
    title: string;
    descri: string;
    location: number;
    category: number;
    customer: number;
    expireDate: number | Date;
    tags: {
      content: string[];
    };
  };
  itemOptions: AddItemOptions[];
  images: Array<AddMedia['url']>;
  terms: string;
  policy: string;
};
export type EditItems = AddItems['item'];
export type EditItemsKey = {
  id: number;
  body: EditItems;
};

export interface NotificationsData {
  id: number;
  email: string;
  template: string;
  value: number;
  status: StatusesData;
}
export type EditNotificationsKey = {
  id: number;
  body: {
    email: string;
    status: number;
    template: string;
    value: number;
  };
};
