import { Dialog, Transition } from '@headlessui/react';
import Button from '@/components/Button';
import { CloseOutlined } from '@ant-design/icons';
import { Fragment } from 'react';

interface Props {
  title?: string;
  size?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  isEdit?: boolean;
  persistent: boolean;
  children: JSX.Element | JSX.Element[] | boolean;
  onClose?: () => void;
}

const Modal: React.FC<Props> = ({
  isOpen = false,
  setIsOpen = () => undefined,
  title = 'Title goes here',
  persistent = false,
  size = 'xs',
  children,
  onClose = () => undefined,
}) => {
  const sizes = {
    xs: 'xl:w-[30%]',
    sm: 'xl:w-[40%]',
    md: 'xl:w-[50%]',
    lg: 'xl:w-[60%]',
    xl: 'xl:w-[75%]',
    xxl: 'xl:w-[90%]',
    full: 'xl:w-full',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(persistent)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full md:w-[50%] lg:w-[60%] ${
                  sizes[size as keyof typeof sizes]
                } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="flex justify-end">
                  <Button
                    shape="circle"
                    color='red'
                    size="l"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="overflow-y-auto max-h-[450px] lg:max-h-[500px] px-5">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
