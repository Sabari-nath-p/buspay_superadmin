import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from '../../shared/side-menu/menuItem.model';
import { Router } from '@angular/router';
import { menuList } from './side-menu.config';
import { SvgIconsComponent } from '../../private/common-components/svg-icons/svg-icons.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, SvgIconsComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  activeMenuList: MenuItem[] = [];
  isExpanded: boolean = false;
  currentRouterUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRouterUrl = this.router.url.slice(1);
    this.activeMenuList = menuList;
    this.setMenuState(this.activeMenuList);
  }

  toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.setMenuState(this.activeMenuList);
  }

  closeMenu(): void {
    this.isExpanded = false;
    this.setMenuState(this.activeMenuList);
  }

  setMenuState(menuList: MenuItem[]): boolean {
    let hasMatchingRoute = false;
    menuList.forEach((menu) => {
      menu.isOpen = false;

      if (menu.children && menu.children.length > 0) {
        const childHasMatchingRoute = this.setMenuState(menu.children);
        menu.isOpen = childHasMatchingRoute;
        hasMatchingRoute = hasMatchingRoute || childHasMatchingRoute;
      } else {
        menu.isOpen =
          String(menu.routerLink).slice(1) === String(this.currentRouterUrl);
        hasMatchingRoute = hasMatchingRoute || menu.isOpen;
      }
    });
    return hasMatchingRoute;
  }

  onClickMenu(menu: MenuItem) {
    console.log('onClickMenu', menu);
    if (menu.routerLink === null) {
      menu.isOpen = !menu.isOpen;
    } else {
      if (menu.routerLink) {
        // Recheck this method
        this.router.navigateByUrl(menu.routerLink);
        // or use
        // this.router.navigate([menu.routerLink]);
      }
    }
  }

  logout(): void {
    // remove localStorage items
    this.router.navigate(['/']);
  }
}
