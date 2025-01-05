import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './private/common-components/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buspay-client';
}
