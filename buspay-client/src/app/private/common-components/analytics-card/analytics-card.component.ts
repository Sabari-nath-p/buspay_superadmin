import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [],
  templateUrl: './analytics-card.component.html',
  styleUrl: './analytics-card.component.scss',
})
export class AnalyticsCardComponent {
  @Input() title: string = '';
  @Input() titleIcon!: any;
  @Input() analyticValue: string = '';
  @Input() trendLineIcon!: any;
  @Input() trendLine: string = '';
  @Input() trendLineImage!: any;
}
