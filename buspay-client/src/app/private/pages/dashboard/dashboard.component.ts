import { Component } from '@angular/core';
import { AnalyticsCardComponent } from '../../common-components/analytics-card/analytics-card.component';
import { TimeLineComponent } from '../../common-components/time-line/time-line.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AnalyticsCardComponent, TimeLineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
