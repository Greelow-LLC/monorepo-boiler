import { SpinnerIcon } from 'components/svg';

interface Props {
  isScreen?: boolean;
  isButton?: boolean;
}

const Loader = ({ isScreen = true, isButton = false }: Props) => {
  return (
    <div
      className={`${
        isScreen && 'h-screen'
      } flex flex-col justify-center items-center text-black`}>
      <SpinnerIcon
        height={isButton ? '[40px]' : '[10px]'}
        width={isButton ? '[5px]' : '[80px]'}
      />
    </div>
  );
};

export default Loader;
