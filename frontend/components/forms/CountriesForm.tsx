import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';

import React, { SetStateAction } from 'react';

import { CountriesData } from 'types/api';
import { CountriesValues, FormValues } from 'types/forms';
import { errorMessage } from 'utils/helpers';

import useCountry from 'hooks/crud/useCountry';
import useError from 'hooks/useError';
import useSubmit from 'hooks/useSubmit';
import Button from 'components/Button';
import CustomInput from 'components/CustomInput';
import Loader from 'components/Loader';

interface CountriesFormProps {
  active: CountriesData | null;
  onSubmitForm?: () => void;
  setAlert: React.Dispatch<
    SetStateAction<{ status: boolean; type: string; message: string }>
  >;
}

const countriesSchema = Yup.object().shape({
  descri: Yup.string().required('Required Field'),
});

const CountriesForm: React.FC<CountriesFormProps> = ({
  active,
  onSubmitForm = () => {},
  setAlert = () => {},
}) => {
  const { handleAdd, handleEdit, isErrorForm, errorAdd, errorEdit, isLoading } =
    useCountry();

  const { renderError } = useError();

  //form value
  const countriesValues: CountriesValues = {
    descri: active?.descri ?? '',
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      active
        ? await handleEdit(values as CountriesValues, active.id)
        : await handleAdd(values as CountriesValues);
      setAlert({
        status: true,
        type: 'bg-green-600',
        message: 'Saved',
      });
      onSubmitForm();
    } catch (error) {
      console.log(error);
      setAlert({
        status: true,
        type: 'bg-red-600',
        message: 'There was an error with your request!',
      });
    }
  };

  const { onSubmit } = useSubmit(handleSubmit);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={countriesValues}
      onSubmit={onSubmit}
      validationSchema={countriesSchema}
    >
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
          <div className="my-3">
            <CustomInput
              id="descri"
              label="Description"
              otherClassNames="mb-3"
              {...getFieldProps('descri')}
            />
            <ErrorMessage name="descri" render={msg => renderError(msg)} />
          </div>
          <div className="py-3">
            <Button
              type="submit"
              color="green"
              size="full"
              label={
                isLoading ? (
                  <Loader hasLogo={false} isScreen={false} isButton />
                ) : (
                  'Submit'
                )
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CountriesForm;
