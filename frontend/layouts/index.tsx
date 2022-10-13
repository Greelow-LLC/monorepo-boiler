import Sidebar from 'components/Sidebar';
import Head from 'next/head';
import React from 'react';

interface Props {
  children: React.ReactNode;
  page?: string;
  hasHeader?: boolean;
  hasMenu?: boolean;
}

//TODO: fix layout design bugs

const MainLayout: React.FC<Props> = ({
  children,
  page = 'Home',
  hasHeader = false,
  hasMenu = false,
}) => {
  return (
    <>
      <Head>
        <title>{`${page}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className={`${hasMenu && 'grid'} grid-cols-12 bg-white-off h-screen`}>
          {hasMenu && (
            <aside className="col-span-2">
              <Sidebar />
            </aside>
          )}
          <section className="col-span-10 h-full w-full flex flex-col justify-center items-center px-10">
            {hasHeader && (
              <header className="flex mb-5 justify-center items-center py-3 flex-col border-b">
                <h2 className="font-medium text-4xl">{page}</h2>
              </header>
            )}
            {children}
          </section>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
