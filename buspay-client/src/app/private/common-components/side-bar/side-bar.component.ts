import { Component } from '@angular/core';
import { MenuList } from '../../../shared/side-bar/side-bar-model';
import { AppComponent } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  menuList: MenuList[]=[
    {
      routerLink:'',
      component: AppComponent,
      menuTitle: 'Home',
      icon: 'home',
    },
    {
      routerLink:'/about',
      component: AppComponent,
      menuTitle: 'About',
      icon: 'about',
    },
    {
      routerLink:'/contact',
      component: AppComponent,
      menuTitle: 'Contact',
      icon: 'phone',
    }
  ]

}
