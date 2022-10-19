import { DatabaseOutlined, GlobalOutlined } from '@ant-design/icons';
import { Navigation } from 'types/config';

export const icons = {
  test: DatabaseOutlined,
  geo: GlobalOutlined,
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
