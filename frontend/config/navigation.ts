import { Navigation } from 'types/config';
import {
  ConfigIcon,
  MediaIcon,
  HomeIcon,
  ShopIcon,
  SocialIcon,
  StatusIcon,
  TestIcon,
  UserIcon,
  WorldIcon,
} from 'components/svg';

export const icons = {
  config: ConfigIcon,
  media: MediaIcon,
  status: StatusIcon,
  home: HomeIcon,
  social: SocialIcon,
  shop: ShopIcon,
  test: TestIcon,
  user: UserIcon,
  geo: WorldIcon,
};

export const navigation: Navigation[] = [
  {
    name: 'Geo',
    href: '',
    icon: 'geo',
    isSection: true,
    children: [
      { name: 'Cities', href: '/cities', icon: 'test', isSection: false },
      { name: 'Countries', href: '/countries', icon: 'test', isSection: false },
      { name: 'Locations', href: '/locations', icon: 'test', isSection: false },
      { name: 'States', href: '/states', icon: 'test', isSection: false },
    ],
  },
  {
    name: 'Shop',
    href: '',
    icon: 'shop',
    isSection: true,
    children: [
      { name: 'Items', href: '/items', icon: 'test', isSection: false },
      { name: 'Purchases', href: '/purchases', icon: 'test', isSection: false },
      {
        name: 'Payment Methods',
        href: '/payment-methods',
        icon: 'test',
        isSection: false,
      },
      {
        name: 'Popular Items',
        href: '/popular-items',
        icon: 'test',
        isSection: false,
      },
    ],
  },
  {
    name: 'Presets',
    href: '',
    icon: 'config',
    isSection: true,
    children: [
      {
        name: 'Media Types',
        href: '/media-types',
        icon: 'media',
        isSection: false,
      },
      { name: 'Modules', href: '/modules', icon: 'test', isSection: false },

      { name: 'Statuses', href: '/statuses', icon: 'test', isSection: false },
      {
        name: 'Categories',
        href: '/categories',
        icon: 'test',
        isSection: false,
      },
    ],
  },
  {
    name: 'Social',
    href: '',
    icon: 'social',
    isSection: true,
    children: [
      {
        name: 'Users',
        href: '/users',
        icon: 'user',
        isSection: false,
      },
      { name: 'Messages', href: '/messages', icon: 'test', isSection: false },
      {
        name: 'Notifications',
        href: '/notifications',
        icon: 'test',
        isSection: false,
      },
    ],
  },

  { name: 'Customers', href: '/customers', icon: 'test', isSection: false },
  { name: 'Bulk Insert', href: '/bulk-insert', icon: 'test', isSection: false },
];
