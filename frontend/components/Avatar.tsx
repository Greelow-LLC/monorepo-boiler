import missingImage from 'assets/missingImage.png';
import Image, { StaticImageData } from 'next/image';

import { formatStringIntoTwoLetters } from '../utils/formatters';

interface Props {
  url?: string | StaticImageData | null;
  initials?: string | null;
  color?: string;
  alt?: string;
  size?: string;
}

const Avatar = ({
  url = missingImage,
  initials = '',
  color = 'red',
  alt = '',
  size = 'md',
}: Props) => {
  const sizeClassName = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const initialsBg = {
    red: 'bg-red-600',
    green: 'bg-custom-green',
    blue: 'bg-blue-600',
    sky: 'bg-sky-600',
  };

  const imageSize = sizeClassName[size as keyof typeof sizeClassName];

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const formattedInitials = formatStringIntoTwoLetters(initials!);

  const initialsClassName = `${
    sizeClassName[size as keyof typeof sizeClassName]
  } ${
    initialsBg[color as keyof typeof initialsBg]
  } flex justify-center items-center relative rounded-full font-medium`;

  return url ? (
    <div className={imageSize}>
      <Image
        className="inline-block rounded-full ring-white"
        src={url}
        alt={alt}
        width={100}
        height={100}
      />
    </div>
  ) : (
    <div className={initialsClassName}>
      <span className="text-white">{formattedInitials}</span>
    </div>
  );
};

export default Avatar;
