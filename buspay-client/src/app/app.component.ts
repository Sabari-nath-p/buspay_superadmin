import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './private/common-components/side-bar/side-bar.component';
import { AnalyticsCardComponent } from './private/common-components/analytics-card/analytics-card.component';
import { IconsLibraryComponent } from './private/common-components/svg-icons/icons-library/icons-library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideBarComponent,AnalyticsCardComponent,IconsLibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buspay-client';
}
