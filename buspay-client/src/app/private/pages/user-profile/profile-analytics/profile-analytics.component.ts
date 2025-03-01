import { Component, Input } from '@angular/core';
import { AnalyticsCardComponent } from '../../../common-components/analytics-card/analytics-card.component';
import { AnalyticsService } from '../../../../shared/services/analytics/analytics.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-analytics',
  standalone: true,
  imports: [CommonModule, AnalyticsCardComponent],
  templateUrl: './profile-analytics.component.html',
  styleUrl: './profile-analytics.component.scss',
})
export class ProfileAnalyticsComponent {
  @Input() userId!: string | number;
  analytics!: any;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.getBusOwnerAnalytics();
  }
  getBusOwnerAnalytics() {
    this.analyticsService
      .getBusOwnerAnalyticsById(this.userId)
      .subscribe((res: any) => {
        if (res.data) {
          this.analytics = res.data;
        }
      });
  }
}
