import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { umbrellaBeachIconDefinition } from 'plugins/fontawesome';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Button from 'components/Button';

const NotFound: NextPage = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <FontAwesomeIcon
        className="pb-3 -w-[50px] h-[50px] xs:w-[70px] xs:h-[70px] md:h-[100px] md:w-[100px]"
        icon={umbrellaBeachIconDefinition}
      />
      <article className="md:flex gap-5 px-2">
        <section>
          <span className=" text-custom-green font-semibold text-4xl md:text-6xl">
            404
          </span>
        </section>
        <section>
          <div className="md:pl-5 border-gray-500 md:border-l-2">
            <h1 className="font-bold text-4xl md:text-6xl">Page not found</h1>
            <p className="mt-2 text-gray-500">
              Please check the url and try again.
            </p>
          </div>
          <div className="md:pl-5 mt-5">
            <Link href="/">
              <a>
                <Button label="Go back home" size="md" color="green" />
              </a>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
};

export default NotFound;
