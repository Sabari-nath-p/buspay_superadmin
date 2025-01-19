export interface MenuItem {
  routerLink: string;
  menuTitle: string;
  icon: string;
  isOpen?: boolean;
  children?: MenuItem[];
}
