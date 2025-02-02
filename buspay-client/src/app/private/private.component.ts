import { Component } from '@angular/core';
import { SideBarComponent } from './common-components/side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../layout/side-menu/side-menu.component';
import { PageHeaderComponent } from '../layout/page-header/page-header.component';
import { HttpClientService } from '../core/services/http-client/http-client.service';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [
    SideBarComponent,
    RouterOutlet,
    SideMenuComponent,
    PageHeaderComponent,
  ],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent {}
