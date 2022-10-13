import { TestIcon, WorldIcon } from 'components/svg';
import { Navigation } from 'types/config';

export const icons = {
  test: TestIcon,
  geo: WorldIcon,
};

export const navigation: Navigation[] = [
  {
    name: 'Geo',
    href: '',
    icon: 'geo',
    isSection: true,
    children: [
      { name: 'Countries', href: '/countries', icon: 'test', isSection: false },
    ],
  },
];
