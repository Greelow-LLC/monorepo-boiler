import CustomInput from 'components/CustomInput';
import { ErrorMessage, Form, Formik } from 'formik';
import useCountry from 'hooks/crud/useCountry';
import useError from 'hooks/useError';
import useSubmit from 'hooks/useSubmit';
import React, { SetStateAction } from 'react';
import { CountriesData } from 'types/api';
import { CountriesValues, FormValues } from 'types/forms';
import { formatCapitalizeFirstWord } from 'utils/formatters';
import { errorMessage } from 'utils/helpers';
import * as Yup from 'yup';

import Button from '@/components/Button';

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
  onSubmitForm = () => undefined,
  setAlert = () => undefined,
}) => {
  const { handleAdd, handleEdit, isErrorForm, errorAdd, errorEdit, isLoading } =
    useCountry();

  const { renderError } = useError();

  //form value
  const countriesValues: CountriesValues = {
    descri: formatCapitalizeFirstWord(active?.descri ?? '') || '',
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
      validationSchema={countriesSchema}>
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
              className="mb-3"
              {...getFieldProps('descri')}
            />
            <ErrorMessage name="descri" render={msg => renderError(msg)} />
          </div>
          <div className="py-3">
            <Button
              className="w-full"
              size="l"
              color="green"
              loading={isLoading}
              htmlType="submit">
              {isLoading ? ' ' : 'Submit'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CountriesForm;
