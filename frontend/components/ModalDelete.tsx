import Button from 'components/Button';
import Loader from 'components/Loader';
import React from 'react';

interface Props {
  deleteFunction: () => void;
  isLoading?: boolean;
}

const ModalDelete = ({ deleteFunction, isLoading = false }: Props) => {
  return (
    <>
      {isLoading ? (
        <div className="p-5">
          <Loader hasLogo={false} isScreen={false} />
        </div>
      ) : (
        <>
          <div className="p-5">
            <p className="text-lg">
              Are you sure you want to delete this item?
            </p>
          </div>
          <Button size={'sm'} color="red" label="Ok" onClick={deleteFunction} />
        </>
      )}
    </>
  );
};

export default ModalDelete;
