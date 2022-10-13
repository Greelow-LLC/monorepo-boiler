import { getStates } from 'api/states';
import { AxiosError } from 'axios';
import Button from 'components/Button';
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';
import { getCookie } from 'cookies-next';
import { ErrorMessage, Form, Formik } from 'formik';
import useCountry from 'hooks/crud/useCountry';
import useStates from 'hooks/crud/useStates';
import useSubmit from 'hooks/useSubmit';
import { GetServerSideProps, NextPage } from 'next';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { FormValues, StatesValues } from 'types/forms';
import MainLayout from 'layouts';

import Modal from '../components/Modal';
import Table from '../components/table';
import { StatesData } from '../types/api';

import useClose from 'hooks/useClose';

import Loader from '@/components/Loader';

import useError from 'hooks/useError';
import { errorMessage } from 'utils/helpers';
import { dehydrate, QueryClient } from 'react-query';

import ModalDelete from '@/components/ModalDelete';
import SearchInput from '@/components/SearchInput';
import Snackbar from '@/components/Snackbar';

const stateEditSchema = Yup.object().shape({
  descri: Yup.string().required('Required Field'),
  country: Yup.number().required('Required Field'),
});

const StatesABM: NextPage = () => {
  const [activeState, setActiveState] = useState<StatesData | null>(null);
  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [filterValue, setFilterValue] = useState<string>('');

  //controls the edit modal
  const [modalEditOrCreate, setModalEditOrCreate] = useState(false);
  const [isEditOrCreate, setIsEditOrCreate] = useState(false);

  const { handleClose } = useClose(
    setModalEditOrCreate,
    setIsEditOrCreate,
    setActiveState,
  );

  const handleModalEdit = () => {
    setIsEditOrCreate(true);
    setModalEditOrCreate(true);
  };

  const handleModalDelete = () => {
    setIsEditOrCreate(false);
    setModalEditOrCreate(true);
  };

  // getters of the countries and the states
  const {
    states,
    isLoading,
    isLoadingGet,
    isLoadingForm,
    isLoadingDelete,
    handleAdd,
    handleEdit,
    handleDelete,
    isErrorForm,
    errorAdd,
    errorEdit,
    isErrorDelete,
    isErrorGet,
    errorDelete,
    errorGet,
  } = useStates();

  const { countries } = useCountry();

  const { renderError } = useError();

  //search results
  const [results, setResults] = useState<StatesData[]>(states || []);

  //watch changes on cities query
  useEffect(() => {
    states && setResults(states);
  }, [states]);

  const handleSubmit = async (values: FormValues) => {
    const newValues = values as StatesValues;
    newValues.country = +newValues.country;

    try {
      activeState
        ? await handleEdit(values as StatesValues, activeState.id)
        : await handleAdd(values as StatesValues);
      setAlert({
        status: true,
        type: 'bg-green-600',
        message: 'Saved',
      });
      handleClose();
    } catch (error) {
      console.log(error);
      setAlert({
        status: true,
        type: 'bg-red-600',
        message: 'There was an error with your request!',
      });
    }
  };

  const onDelete = async (id: number) => {
    await handleDelete(id);
    setAlert({
      status: true,
      type: 'bg-green-600',
      message: 'Deleted',
    });
    !isErrorDelete && !isLoadingDelete && handleClose();
  };

  const stateEditValues: StatesValues = {
    descri: activeState?.descri ?? '',
    country: activeState?.country?.id ?? '',
  };

  const statesTable = results?.map(state => ({
    id: state.id,
    description: state.descri,
    country: state.country?.descri,
  }));

  const handleActive = (id: number) => {
    setActiveState(states?.find(c => c.id === id) as StatesData);
  };

  const { onSubmit } = useSubmit(handleSubmit);

  return (
    <MainLayout page="States" hasMenu hasHeader={!isLoading && !isErrorGet}>
      <div className="w-full">
        {isErrorGet || isErrorDelete ? (
          <p className="text-center">
            {renderError(
              (errorGet?.message as string) ||
                (errorMessage(errorDelete as AxiosError<Error, any>) as string),
            )}
          </p>
        ) : isLoadingGet ? (
          <Loader hasLogo={false} isScreen={false} />
        ) : (
          <>
            <div className="flex pt-10 pb-3 justify-center">
              <Button
                label={'Add state'}
                color={'green'}
                size={'md'}
                onClick={() => {
                  setModalEditOrCreate(true);
                  setIsEditOrCreate(true);
                }}
              />
            </div>

            <SearchInput
              value={filterValue}
              setValue={setFilterValue}
              setResults={setResults}
              itemsToSearch={states}
              placeholder="Search by description"
            />

            <section className="-md:pl-3 min-w-[600px]">
              {statesTable?.length ? (
                <Table
                  data={statesTable}
                  hasButtons
                  onEdit={handleModalEdit}
                  onDelete={handleModalDelete}
                  setActive={handleActive}
                />
              ) : (
                <div className="text-center mt-2">
                  {!isLoading && renderError('There are no states to show')}
                </div>
              )}
            </section>
            <section>
              <Modal
                title={
                  isEditOrCreate
                    ? activeState
                      ? 'Edit State'
                      : 'Add State'
                    : 'Delete State'
                }
                size="md"
                persistent
                isOpen={modalEditOrCreate}
                setIsOpen={setModalEditOrCreate}
                onClose={handleClose}>
                <>
                  {isEditOrCreate && (
                    <section className="w-full rounded-md p-10">
                      <article className=" w-full">
                        <Formik
                          enableReinitialize={true}
                          initialValues={stateEditValues}
                          validationSchema={stateEditSchema}
                          onSubmit={onSubmit}>
                          {({ getFieldProps }) => (
                            <Form>
                              {isErrorForm && (
                                <div className="flex justify-center py-3">
                                  {renderError(
                                    (errorMessage(errorAdd) as string) ||
                                      (errorMessage(errorEdit) as string),
                                  )}
                                </div>
                              )}
                              <div className="mb-5">
                                <CustomInput
                                  id="descri"
                                  label="Description"
                                  otherClassNames="mb-4"
                                  {...getFieldProps('descri')}
                                />
                                <ErrorMessage
                                  name="descri"
                                  render={msg => renderError(msg)}
                                />
                              </div>
                              <div className="mb-5">
                                <CustomSelect
                                  otherClassNames="mb-3"
                                  type="gray"
                                  id="country"
                                  label="Country"
                                  {...getFieldProps('country')}>
                                  <option disabled value="">
                                    Select a state
                                  </option>
                                  {countries?.map(country => (
                                    <option
                                      className="text-black"
                                      value={country.id}
                                      key={country.id}>
                                      {country?.descri}
                                    </option>
                                  ))}
                                </CustomSelect>
                                <ErrorMessage
                                  name="country"
                                  render={msg => renderError(msg)}
                                />
                              </div>
                              <div>
                                <Button
                                  size="full"
                                  color="green"
                                  type="submit"
                                  label={
                                    isLoadingForm ? (
                                      <Loader
                                        hasLogo={false}
                                        isScreen={false}
                                        isButton
                                      />
                                    ) : (
                                      'Submit'
                                    )
                                  }
                                />
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </article>
                    </section>
                  )}
                  {!isEditOrCreate && (
                    <ModalDelete
                      deleteFunction={() => onDelete(activeState?.id ?? 0)}
                      isLoading={isLoadingDelete}
                    />
                  )}
                </>
              </Modal>
            </section>
          </>
        )}
      </div>
      {alert.status && (
        <span>
          <Snackbar
            type={alert.type}
            message={alert.message}
            closeSnack={() =>
              setAlert({
                status: false,
                type: '',
                message: '',
              })
            }
          />
        </span>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = getCookie('user', { req, res });

  if (!user)
    return {
      redirect: {
        destination: '/sign-in',
      },
      props: {},
    };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('states', getStates);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default StatesABM;
