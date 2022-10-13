import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { dehydrate, QueryClient } from 'react-query';

import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';

import { CountriesData } from 'types/api';
import { getCountries } from 'api/countries';
import { errorMessage } from 'utils/helpers';

import useCountry from 'hooks/crud/useCountry';
import useClose from 'hooks/useClose';
import useError from 'hooks/useError';

import MainLayout from 'layouts';
import Button from 'components/Button';
import CountriesForm from 'components/forms/CountriesForm';
import ModalDelete from 'components/ModalDelete';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Table from '@/components/table';
import Snackbar from '@/components/Snackbar';
import SearchInput from '@/components/SearchInput';

const Countries: NextPage = () => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditOrCreate, setIsEditOrCreate] = useState<boolean>(false);
  const [activeCountry, setActiveCountry] =
    useState<CountriesData | null>(null);
  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const {
    countries,
    handleDelete,
    isErrorGet,
    isLoading,
    isLoadingDelete,
    isLoadingGet,
    isErrorDelete,
    errorGet,
    errorDelete,
  } = useCountry();

  //search results
  const [results, setResults] = useState<CountriesData[]>(countries || []);

  //watch changes on cities query
  useEffect(() => {
    countries && setResults(countries);
  }, [countries]);

  const { renderError } = useError();

  const handleModalEdit = () => {
    setIsEditOrCreate(true);
    setModalOpen(true);
  };

  const handleModalDelete = () => {
    setIsEditOrCreate(false);
    setModalOpen(true);
  };

  const { handleClose } = useClose(
    setModalOpen,
    setIsEditOrCreate,
    setActiveCountry,
  );

  const onDelete = async (id: number) => {
    await handleDelete(id);
    setAlert({
      status: true,
      type: 'bg-green-600',
      message: 'Deleted',
    });
    !isErrorDelete && !isLoadingDelete && handleClose();
  };

  const countriesTable = results?.map(({ id, descri }) => ({
    id,
    description: descri,
  }));

  const handleActive = (id: number) =>
    setActiveCountry(
      countries?.find(country => country.id === id) as CountriesData,
    );

  return (
    <MainLayout page="Countries" hasHeader={!isLoading && !isErrorGet} hasMenu>
      <div className="w-full">
        {isErrorGet || isErrorDelete ? (
          <p className="text-center">
            {renderError(
              (errorGet?.message as string) ||
                errorMessage(errorGet as AxiosError<Error, any>) ||
                (errorMessage(errorDelete as AxiosError<Error, any>) as string),
            )}
          </p>
        ) : isLoadingGet ? (
          <Loader hasLogo={false} isScreen={false} />
        ) : (
          <>
            <div className="flex justify-center pt-10 pb-3">
              <Button
                label="Add country"
                color="green"
                size="md"
                onClick={() => {
                  setModalOpen(true);
                  setIsEditOrCreate(true);
                }}
              />
            </div>

            <SearchInput
              value={filterValue}
              setValue={setFilterValue}
              setResults={setResults}
              itemsToSearch={countries}
              placeholder="Search by description"
            />

            <div className="-md:pl-3 min-w-[600px]">
              {countriesTable?.length ? (
                <Table
                  data={countriesTable}
                  hasButtons
                  onEdit={handleModalEdit}
                  onDelete={handleModalDelete}
                  setActive={handleActive}
                />
              ) : (
                <div className="text-center mt-2">
                  {!isLoading && renderError('There are no countries to show')}
                </div>
              )}
            </div>

            <Modal
              title={
                isEditOrCreate
                  ? activeCountry
                    ? 'Edit country'
                    : 'Add country'
                  : 'Delete Country'
              }
              size="md"
              persistent
              isOpen={isModalOpen}
              setIsOpen={setModalOpen}
              onClose={handleClose}
            >
              {isEditOrCreate ? (
                <CountriesForm
                  active={activeCountry}
                  onSubmitForm={handleClose}
                  setAlert={setAlert}
                />
              ) : (
                <ModalDelete
                  deleteFunction={() => onDelete(activeCountry?.id as number)}
                  isLoading={isLoadingDelete}
                />
              )}
            </Modal>
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

  await queryClient.prefetchQuery('countries', getCountries);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Countries;