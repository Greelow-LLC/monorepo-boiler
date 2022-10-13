import { umbrellaBeachIconDefinition } from '@/plugins/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface LogoProps {
  hasTitle?: boolean;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ hasTitle = false, color = '' }) => {
  const colorClass = color ? `text-${color}` : '';

  return (
    <div className="text-center w-20">
      <FontAwesomeIcon
        icon={umbrellaBeachIconDefinition}
        size="2x"
        className={`${colorClass} w-full`}
      />
      {hasTitle && <h1 className="font-bold text-3x mt-2">Gift Time</h1>}
    </div>
  );
};

export default Logo;
