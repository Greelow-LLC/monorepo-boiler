import { AxiosError } from 'axios';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { createStates, editStates, deleteStates, getStates } from 'api/states';
import { StatesData, EditStateKey } from 'types/api';
import { StatesValues } from 'types/forms';

const useStates = () => {
  const queryClient = useQueryClient();

  const key: string = 'states';

  //get
  const {
    data: states,
    isError: isErrorGet,
    isLoading: isLoadingGet,
    error: errorGet,
  } = useQuery<StatesData[], AxiosError>(key, getStates);

  //create
  const {
    mutateAsync: addState,
    isLoading: isLoadingAdd,
    error: errorAdd,
    isError: isErrorAdd,
  } = useMutation<StatesData, AxiosError<Error, any> | null, StatesValues>(
    key,
    createStates,
  );

  //update
  const {
    mutateAsync: editState,
    isLoading: isLoadingEdit,
    error: errorEdit,
    isError: isErrorEdit,
  } = useMutation<StatesData, AxiosError<Error, any> | null, EditStateKey>(
    key,
    editStates,
  );

  //delete
  const {
    mutateAsync: deleteState,
    error: errorDelete,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
  } = useMutation<StatesData, AxiosError, number>(key, deleteStates);

  //errorh handling
  const isErrorForm = isErrorAdd || isErrorEdit;

  const isLoading =
    isLoadingGet || isLoadingDelete || isLoadingAdd || isLoadingEdit;

  const isLoadingForm = isLoadingAdd || isLoadingEdit;

  const handleAdd = async (values: StatesValues) => {
    await addState(values);
    queryClient.invalidateQueries(key);
  };

  const handleEdit = async (body: StatesValues, id: number) => {
    await editState({ body, id });
    queryClient.invalidateQueries(key);
  };

  const handleDelete = async (id: number) => {
    await deleteState(id);
    queryClient.invalidateQueries(key);
  };

  return {
    states,
    isErrorGet,
    isErrorDelete,
    errorGet,
    isLoading,
    isLoadingDelete,
    isLoadingGet,
    isLoadingForm,
    handleAdd,
    handleEdit,
    handleDelete,
    isErrorForm,
    errorAdd,
    errorEdit,
    errorDelete,
  };
};

export default useStates;
