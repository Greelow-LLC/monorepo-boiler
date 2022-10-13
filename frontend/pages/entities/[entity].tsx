import useCrud from 'hooks/crud';
import MainLayout from 'layouts';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Snackbar from '@/components/Snackbar';

const Entity = () => {
  const {
    query: { entity },
  } = useRouter();

  // const [filterValue, setFilterValue] = useState<string>('');
  // const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // const [isEditOrCreate, setIsEditOrCreate] = useState<boolean>(false);
  // const [activeCountry, setActiveCountry] = useState<any | null>(null);
  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const { data }: any = useCrud('countries');
  console.log(data);

  // //search results
  // const [results, setResults] = useState<CountriesData[]>(countries || []);

  // //watch changes on cities query
  // useEffect(() => {
  //   countries && setResults(countries);
  // }, [countries]);

  // const { renderError } = useError();

  // const handleModalEdit = () => {
  //   setIsEditOrCreate(true);
  //   setModalOpen(true);
  // };

  // const handleModalDelete = () => {
  //   setIsEditOrCreate(false);
  //   setModalOpen(true);
  // };

  // const { handleClose } = useClose(
  //   setModalOpen,
  //   setIsEditOrCreate,
  //   setActiveCountry,
  // );

  // const onDelete = async (id: number) => {
  //   await handleDelete(id);
  //   setAlert({
  //     status: true,
  //     type: 'bg-green-600',
  //     message: 'Deleted',
  //   });
  //   !isErrorDelete && !isLoadingDelete && handleClose();
  // };

  // const countriesTable = results?.map(({ id, descri }) => ({
  //   id,
  //   description: descri,
  // }));

  // const handleActive = (id: number) =>
  //   setActiveCountry(
  //     countries?.find(country => country.id === id) as CountriesData,
  //   );

  return (
    <MainLayout
      page="Countries"
      hasHeader={/*!isLoading && !isErrorGet*/ true}
      hasMenu>
      {/* <div className="w-full">
        {isErrorGet || isErrorDelete ? (
          <p className="text-center">
            {renderError(
              (errorGet?.message as string) ||
                errorMessage(errorGet as AxiosError<Error, any>) ||
                (errorMessage(errorDelete as AxiosError<Error, any>) as string),
            )}
          </p>
        ) : isLoadingGet ? (
          <Loader isScreen={false} />
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
              onClose={handleClose}>
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
      </div> */}
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

export default Entity;
