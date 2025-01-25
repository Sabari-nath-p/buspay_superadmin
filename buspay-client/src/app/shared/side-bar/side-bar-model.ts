import { ComponentRef } from "@angular/core";

export interface MenuList{
    routerLink:string;
    component: ComponentRef<any>|any;
    menuTitle: string,
    icon: string,
}