import { Component, Input } from '@angular/core';
import { SvgIconsComponent } from '../svg-icons/svg-icons.component';

@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [SvgIconsComponent],
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
