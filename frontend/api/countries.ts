import { CountriesData, EditCountryKey } from 'types/api';
import { CountriesValues } from 'types/forms';
import { postHttp, getHttp, putHttp, deleteHttp } from 'utils/http';

export const getCountries = async (): Promise<CountriesData[]> =>
  await getHttp('countries');

export const createCountries = async (
  body: CountriesValues,
): Promise<CountriesData> => await postHttp('countries/create', body);

export const deleteCountries = async (
  id: CountriesData['id'],
): Promise<CountriesData> => await deleteHttp('countries/delete', id);

export const editCountries = async ({
  body,
  id,
}: EditCountryKey): Promise<CountriesData> =>
  await putHttp('countries/update', id, body);
