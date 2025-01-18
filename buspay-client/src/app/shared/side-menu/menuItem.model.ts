// import { ComponentRef } from '@angular/core';

export interface MenuItem {
  routerLink: string;
//   component: ComponentRef<any> | any;
  menuTitle: string;
  icon: string;
  isOpen?: boolean;
  children?: MenuItem[];
}
