import * as Yup from 'yup';
import { getCookie } from 'cookies-next';
import { ErrorMessage, Form, Formik } from 'formik';

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { umbrellaBeachIconDefinition } from '@/plugins/fontawesome';

import { FormValues, LogInValues } from 'types/forms';
import { errorMessage } from 'utils/helpers';

import useAuth from 'hooks/crud/useAuth';
import useError from 'hooks/useError';
import useSubmit from 'hooks/useSubmit';
import MainLayout from 'layouts';

import Button from 'components/Button';
import CustomInput from 'components/CustomInput';
import Loader from 'components/Loader';

const logInSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please provide your email adress')
    .email('Invalid Email'),
  password: Yup.string().required('Please provide your password'),
});

const LogIn: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNetWorkError, setNetworkError] = useState<string | null>(null);

  const router = useRouter();

  const { handleLogin, errorLogin, isErrorLogin, isLoadingLogin } = useAuth();

  const { renderError } = useError();

  const logInValues: LogInValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (valuesToSend: FormValues) => {
    setIsLoading(true);
    try {
      await handleLogin(valuesToSend as LogInValues);
      setNetworkError(null);
    } catch (error: any) {
      setNetworkError(error?.message);
      setIsLoading(false);
    }
  };

  const { onSubmit } = useSubmit(handleSubmit);

  if (isLoading) return <Loader />;

  return (
    <MainLayout page="Sign-in">
      <section className="flex justify-center items-center h-screen">
        <div className="w-[95%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
          <section className="p-12 flex flex-col justify-center items-center">
            <FontAwesomeIcon
              className="mb-5 h-[60px] w-[60px]"
              icon={umbrellaBeachIconDefinition}
            />
            <h1 className="font-bold text-md xs:text-2xl md:text-4xl">
              Log into your account
            </h1>
          </section>
          <section className="w-full bg-white shadow-xl rounded-md p-10">
            <article className="w-full">
              <Formik
                initialValues={logInValues}
                validationSchema={logInSchema}
                onSubmit={onSubmit}
              >
                {({ getFieldProps, dirty }) => (
                  <Form>
                    {isErrorLogin && !dirty &&(
                      <div className="flex justify-center py-3">
                        {renderError(
                          (errorMessage(errorLogin) as string) ||
                            (errorLogin?.message as string),
                        )}
                      </div>
                    )}
                    <div className="mb-5">
                      <CustomInput
                        id="email"
                        label="Email address"
                        otherClassNames="mb-4"
                        {...getFieldProps('email')}
                      />
                      <ErrorMessage
                        name="email"
                        render={msg => renderError(msg)}
                      />
                    </div>
                    <div className="mb-5">
                      <CustomInput
                        id="password"
                        isPassWordInput
                        label="Password"
                        otherClassNames="mb-4"
                        {...getFieldProps('password')}
                      />
                      <ErrorMessage
                        name="password"
                        render={msg => renderError(msg)}
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        size="full"
                        label={
                          isLoading ? (
                            <Loader hasLogo={false} isScreen={false} isButton />
                          ) : (
                            'Submit'
                          )
                        }
                        color="green"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </article>
          </section>
        </div>
      </section>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = getCookie('user', { req, res });

  if (user)
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    };

  return {
    props: {},
  };
};

export default LogIn;
