import { MenuItem } from '../../shared/side-menu/menuItem.model';
export const menuList: MenuItem[] = [
  {
    routerLink: '/dashboard',
    menuTitle: 'Dashboards',
    icon: 'home',
  },
  {
    routerLink: '/user',
    menuTitle: 'User',
    icon: 'user',
  },
  {
    routerLink: '/bus-type',
    menuTitle: 'Bus Type',
    icon: 'integrations',
  },
  {
    routerLink: '/preference',
    menuTitle: 'Bus Preference',
    icon: 'integrations',
  },
  {
    routerLink: '/coupons',
    menuTitle: 'Coupons',
    icon: 'integrations',
  },
  // {
  //   routerLink: '/',
  //   menuTitle: '',
  //   icon: '',
  // },
  {
    routerLink: '/integrations',
    menuTitle: 'Integrations',
    icon: 'integrations',
  },
  {
    routerLink: '/calender',
    menuTitle: 'Calender',
    icon: 'calender',
  },
  {
    routerLink: '/history',
    menuTitle: 'History',
    icon: 'stop-watch',
  },
  {
    routerLink: null,
    menuTitle: 'Help',
    icon: '',
    children: [
      {
        routerLink: '/support',
        menuTitle: 'Support',
        icon: 'user-support',
      },
      {
        routerLink: '/settings',
        menuTitle: 'Settings',
        icon: 'settings',
      },
    ],
  },
];
