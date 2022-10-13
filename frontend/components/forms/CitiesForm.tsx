import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';

import React, { SetStateAction } from 'react';

import { CitiesData } from 'types/api';
import { CitiesValues, FormValues } from 'types/forms';
import { errorMessage } from 'utils/helpers';

import useCity from 'hooks/crud/useCity';
import useError from 'hooks/useError';
import useStates from 'hooks/crud/useStates';
import useSubmit from 'hooks/useSubmit';

import Button from 'components/Button';
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';
import Loader from 'components/Loader';

interface CitiesFormProps {
  active: CitiesData | null;
  onSubmitForm?: () => void;
  setAlert: React.Dispatch<
    SetStateAction<{ status: boolean; type: string; message: string }>
  >;
}

const citiesSchema = Yup.object().shape({
  descri: Yup.string().required('Required Field'),
  latitude: Yup.string().required('Required Field'),
  longitude: Yup.string().required('Required Field'),
  state: Yup.string().required('Required Field'),
});

const CitiesForm: React.FC<CitiesFormProps> = ({
  active,
  onSubmitForm = () => {},
  setAlert = () => {},
}) => {
  const { handleAdd, handleEdit, isErrorForm, errorAdd, errorEdit, isLoading } =
    useCity();

  const { states } = useStates();

  const { renderError } = useError();

  //form value
  const citiesValues: CitiesValues = {
    descri: active?.descri ?? '',
    state: active?.state?.id ?? '',
    latitude: active?.latitude ?? '',
    longitude: active?.longitude ?? '',
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      active
        ? await handleEdit(values as CitiesValues, active.id)
        : await handleAdd(values as CitiesValues);
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
    <>
      <Formik
        enableReinitialize={true}
        initialValues={citiesValues}
        onSubmit={onSubmit}
        validationSchema={citiesSchema}
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
            <div className="my-3">
              <CustomInput
                id="latitude"
                label="Latitude"
                otherClassNames="mb-3"
                {...getFieldProps('latitude')}
              />
              <ErrorMessage name="latitude" render={msg => renderError(msg)} />
            </div>
            <div className="my-3">
              <CustomInput
                id="longitude"
                label="Longitude"
                otherClassNames="mb-3"
                {...getFieldProps('longitude')}
              />
              <ErrorMessage name="longitude" render={msg => renderError(msg)} />
            </div>
            <div className="my-3">
              <CustomSelect
                otherClassNames="mb-3"
                type="gray"
                id="state"
                label="State"
                {...getFieldProps('state')}
              >
                <option disabled value="">
                  Select a state
                </option>
                {states?.map(state => (
                  <option
                    className="text-black"
                    value={state.id}
                    key={state.id}
                  >
                    {state?.descri}
                  </option>
                ))}
              </CustomSelect>
              <ErrorMessage name="state" render={msg => renderError(msg)} />
            </div>
            <div className="py-2">
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
    </>
  );
};

export default CitiesForm;
