import { createCountries, editCountries } from 'api/countries';
import { deleteCountries, getCountries } from 'api/countries';
import { AxiosError } from 'axios';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { CountriesData, EditCountryKey } from 'types/api';
import { CountriesValues } from 'types/forms';

const useCountry = () => {
  const queryClient = useQueryClient();

  const key = 'countries';

  //get
  const {
    data: countries,
    isError: isErrorGet,
    isLoading: isLoadingGet,
    error: errorGet,
  } = useQuery<CountriesData[], AxiosError<Error, any> | null>(
    key,
    getCountries,
  );

  //create
  const {
    mutateAsync: addCountry,
    isLoading: isLoadingAdd,
    error: errorAdd,
    isError: isErrorAdd,
  } = useMutation<
    CountriesData,
    AxiosError<Error, any> | null,
    CountriesValues
  >(key, createCountries);

  //update
  const {
    mutateAsync: editCountry,
    isLoading: isLoadingEdit,
    error: errorEdit,
    isError: isErrorEdit,
  } = useMutation<CountriesData, AxiosError<Error, any> | null, EditCountryKey>(
    key,
    editCountries,
  );

  //delete
  const {
    mutateAsync: deleteCountry,
    error: errorDelete,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
  } = useMutation<CountriesData, AxiosError, number>(key, deleteCountries);

  //errorh handling
  const isErrorForm = isErrorAdd || isErrorEdit;

  const isLoading =
    isLoadingGet || isLoadingDelete || isLoadingAdd || isLoadingEdit;

  const handleAdd = async (values: CountriesValues) => {
    await addCountry(values);
    queryClient.invalidateQueries(key);
  };

  const handleEdit = async (body: CountriesValues, id: number) => {
    await editCountry({ body, id });
    queryClient.invalidateQueries(key);
  };

  const handleDelete = async (id: number) => {
    await deleteCountry(id);
    queryClient.invalidateQueries(key);
  };

  return {
    data: countries,
    isErrorGet,
    isErrorDelete,
    errorGet,
    isLoading,
    isLoadingGet,
    isLoadingDelete,
    handleAdd,
    handleEdit,
    handleDelete,
    isErrorForm,
    errorAdd,
    errorEdit,
    errorDelete,
  };
};

export default useCountry;
