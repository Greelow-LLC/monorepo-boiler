import { FormikHelpers } from 'formik';
import { FormValues } from 'types/forms';

const useSubmit = (callback: (val: FormValues) => void, reset = false) => {
  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    callback(values);
    reset && resetForm();
  };

  return { onSubmit };
};

export default useSubmit;
