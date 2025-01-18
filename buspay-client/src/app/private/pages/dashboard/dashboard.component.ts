import { Component } from '@angular/core';
import { AnalyticsCardComponent } from '../../common-components/analytics-card/analytics-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AnalyticsCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
