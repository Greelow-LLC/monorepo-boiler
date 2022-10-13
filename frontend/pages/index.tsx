import { getCookie } from 'cookies-next';
import MainLayout from 'layouts';
import { GetServerSideProps } from 'next';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <MainLayout hasMenu>
      <div className="w-full flex flex-col items-center justify-center">
        <section>
          <span className=" text-custom-green font-semibold text-4xl md:text-6xl">
            Welcome to the
          </span>
        </section>
        <section>
          <div>
            <h1 className="font-bold text-4xl md:text-6xl">Admin dashboard</h1>
          </div>
        </section>
      </div>
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

  return {
    props: {},
  };
};

export default Home;
