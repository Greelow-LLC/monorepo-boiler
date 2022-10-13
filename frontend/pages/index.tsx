import { getCookie } from 'cookies-next';
import type { NextPage } from 'next';
import React from 'react';
import MainLayout from 'layouts';

import { GetServerSideProps } from 'next';
import Logo from '@/components/Logo';
import Link from 'next/link';
import Button from '@/components/Button';

const Home: NextPage = () => {
  return (
    <MainLayout hasMenu>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-32 pb-5">
          <Logo />
        </div>
        <section>
          <span className=" text-custom-green font-semibold text-4xl md:text-6xl">
            Welcome to Gift Time
          </span>
        </section>
        <section>
          <div>
            <h1 className="font-bold text-4xl md:text-6xl">Admin dashboard</h1>
            <p className="mt-2 text-gray-500">
              Please, use the side menu to start managing.
            </p>
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
