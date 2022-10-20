import { CloseOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Dialog, Transition } from '@headlessui/react';
import { Avatar } from 'antd';
import Button from 'components/Button';
import { navigation, icons } from 'config/navigation';
import { UserContext } from 'contexts/userContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UserContextType } from 'types/context';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
  const { pathname } = useRouter();

  const { currentUser, logout, currentLinkSection, setCurrentLinkSection } =
    useContext(UserContext) as UserContextType;

  const [current, setCurrent] = useState('/');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleCloseSideBar = () => {
    setSidebarOpen(false);
    setDropdown(false);
  };

  useEffect(() => {
    setCurrent(pathname ?? '/');
  }, [pathname]);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={handleCloseSideBar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="absolute top-0 right-0 -mr-14 pt-2">
                  <Button
                    icon={<CloseOutlined />}
                    onClick={handleCloseSideBar}
                  />
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 px-2 space-y-1">
                  <div
                    className={`
                      ${dropdown ? 'userMenuOpen' : 'userMenuClosed'}
                      mb-5
                    `}>
                    <span
                      className="cursor-pointer flex items-center capitalize text-white hover:bg-indigo-500 hover:bg-opacity-75 group gap-2 px-2 py-2 mb-3 text-sm font-medium rounded-md "
                      onClick={() => setDropdown(!dropdown)}>
                      <Avatar alt="user image" className="bg-red-600">
                        {currentUser
                          ? currentUser?.firstName[0] + currentUser?.lastName[0]
                          : 'TS'}
                      </Avatar>
                      {currentUser?.firstName}
                      <DownOutlined
                        className={`ml-3 transition-all ${
                          dropdown && '-rotate-[3.142rad]'
                        }`}
                      />
                    </span>
                    <div
                      className={`transition-all overflow-y-hidden pb-3 ${
                        !dropdown ? 'scale-y-0' : 'scale-y-1'
                      }`}>
                      <Button color="red" onClick={logout}>
                        Sign out
                      </Button>
                    </div>
                  </div>
                  {navigation
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, index) => {
                      const Icon = icons[item.icon as keyof typeof icons];
                      if (item.isSection) {
                        return (
                          <div
                            key={index}
                            className={`
                      ${
                        currentLinkSection === index
                          ? 'userMenuOpen'
                          : 'userMenuClosed'
                      }
                      mb-5
                    `}>
                            <span
                              className="text-white hover:bg-indigo-600 hover:bg-opacity-75,
                            group flex items-center px-2 py-2 text-base font-medium rounded-md"
                              onClick={() =>
                                setCurrentLinkSection(
                                  currentLinkSection === index ? null : index,
                                )
                              }>
                              <Icon
                                className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                                aria-hidden="true"
                              />
                              {item?.name}
                              <DownOutlined
                                className={`ml-3 transition-all ${
                                  currentLinkSection === index &&
                                  '-rotate-[3.142rad]'
                                }`}
                              />
                            </span>
                            <div
                              className={`transition-all overflow-y-hidden pl-3 ${
                                currentLinkSection !== index
                                  ? 'scale-y-0'
                                  : 'scale-y-1'
                              }`}>
                              {item.children
                                ?.sort((a, b) => a.name.localeCompare(b.name))
                                .map((child, index) => {
                                  const ChildIcon =
                                    icons[child.icon as keyof typeof icons];
                                  return (
                                    <Link key={index} href={child.href}>
                                      <a
                                        className={classNames(
                                          current === child.href
                                            ? 'bg-indigo-800 text-white'
                                            : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                        )}>
                                        <ChildIcon
                                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                                          aria-hidden="true"
                                        />
                                        {child.name}
                                      </a>
                                    </Link>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <Link key={index} href={item.href}>
                          <a
                            className={classNames(
                              current === item.href
                                ? 'bg-indigo-800 text-white'
                                : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                            )}>
                            <Icon
                              className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      );
                    })}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:block p-3 bg-indigo-600 h-full">
        <nav className="py-5 flex flex-col ">
          <div
            className={`${dropdown ? 'userMenuOpen' : 'userMenuClosed'} mb-5`}>
            <span
              className="cursor-pointer flex items-center capitalize text-white hover:bg-indigo-500 hover:bg-opacity-75 group mb-3 text-sm font-medium rounded-md px-2 pb-3 pt-1 gap-2"
              onClick={() => setDropdown(!dropdown)}>
              <Avatar alt="user image" className="bg-red-600">
                {currentUser
                  ? currentUser?.firstName[0] + currentUser?.lastName[0]
                  : 'TS'}
              </Avatar>
              {currentUser?.firstName}
              <DownOutlined
                className={`ml-3 transition-all ${
                  dropdown && '-rotate-[3.142rad]'
                }`}
              />
            </span>
            <div
              className={`transition-all overflow-y-hidden pb-3 ${
                !dropdown ? 'scale-y-0' : 'scale-y-1'
              }`}>
              <div className="mt-3 ml-3 flex flex-col gap-2">
                {/* <button
                  onClick={logout}
                  className="text-white hover:bg-opacity-75 hover:bg-indigo-500  text-sm font-medium rounded-md"
                >
                  Sign out
                </button> */}
                <Button
                  className="group flex items-center px-3 py-2"
                  onClick={logout}>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
          <div>
            {navigation
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item, index) => {
                const Icon = icons[item.icon as keyof typeof icons];
                if (item.isSection) {
                  return (
                    <div
                      key={index}
                      className={`
                      ${
                        currentLinkSection === index
                          ? 'userMenuOpen'
                          : 'userMenuClosed'
                      }
                    `}>
                      <span
                        className="cursor-pointer group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-indigo-500 hover:bg-opacity-75"
                        onClick={() =>
                          setCurrentLinkSection(
                            currentLinkSection === index ? null : index,
                          )
                        }>
                        <Icon
                          className="mr-4 text-xl text-indigo-300"
                          aria-hidden="true"
                        />
                        {item?.name}
                        <DownOutlined
                          className={`ml-3 transition-all ${
                            currentLinkSection === index && '-rotate-[3.142rad]'
                          }`}
                        />
                      </span>
                      <div
                        className={`transition-all overflow-y-hidden pl-3 ${
                          currentLinkSection !== index
                            ? 'scale-y-0'
                            : 'scale-y-1'
                        }`}>
                        {item.children
                          ?.sort((a, b) => a.name.localeCompare(b.name))
                          .map((child, index) => {
                            const ChildIcon =
                              icons[child.icon as keyof typeof icons];
                            return (
                              <Link key={index} href={child?.href}>
                                <a
                                  className={classNames(
                                    current === child.href
                                      ? 'bg-indigo-800 text-white'
                                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                  )}>
                                  <ChildIcon
                                    className="mr-4 text-xl text-indigo-300"
                                    aria-hidden="true"
                                  />
                                  {child.name}
                                </a>
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link key={index} href={item?.href}>
                    <a
                      className={classNames(
                        current === item.href
                          ? 'bg-indigo-800 text-white'
                          : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}>
                      <Icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                );
              })}
          </div>
        </nav>
      </div>
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}>
            <MenuOutlined />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
