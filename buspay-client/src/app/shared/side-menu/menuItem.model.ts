export interface MenuItem {
  routerLink: string | null;
  menuTitle: string;
  icon: string;
  isOpen?: boolean;
  children?: MenuItem[];
}
