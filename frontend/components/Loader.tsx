import Logo from 'components/Logo';
import Spinner from './svg/Spinner';

interface LoaderProps {
  isScreen?: boolean;
  hasLogo?: boolean;
}

const Loader = ({ isScreen = true, hasLogo = true, isButton = false }) => {
  return (
    <div
      className={`${
        isScreen && 'h-screen'
      } flex flex-col justify-center items-center text-black`}
    >
      <div className="w-20">{hasLogo && <Logo color="custom-green" />}</div>
      <Spinner
        height={isButton ? '[40px]' : '[10px]'}
        width={isButton ? '[5px]' : '[80px]'}
      />
    </div>
  );
};

export default Loader;
