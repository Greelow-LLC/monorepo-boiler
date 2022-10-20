import Loader from 'components/Loader';
import React from 'react';

interface Props {
  isLoading?: boolean;
}

const ModalDelete = ({ isLoading = false }: Props) => {
  return (
    <>
      {isLoading ? (
        <div className="p-2">
          <Loader isScreen={false} />
        </div>
      ) : (
          <div className="p-2">
            <p className="text-lg">
              Are you sure you want to delete this item?
            </p>
          </div>
      )}
    </>
  );
};

export default ModalDelete;
