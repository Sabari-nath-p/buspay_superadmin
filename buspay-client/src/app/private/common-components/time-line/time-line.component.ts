import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimeLine } from '../../../shared/time-line/time-line.model';
import { SvgIconsComponent } from '../svg-icons/svg-icons.component';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [CommonModule, SvgIconsComponent],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss',
})
export class TimeLineComponent {
  timeLineData: TimeLine[] = [
    { place: 'Calicut', time: '10:30PM', status: 'On Time' },
    { place: 'Shornur', depatureTime: '12:00AM', status: 'On Time' },
    { place: 'Thrissur', time: '01:30AM', status: 'On Time' },
    { place: 'Ernakulam Town', arrivalTime: '03:00AM', status: 'On Time' },
    { place: 'Ernakulam Jn', time: '03:15AM', status: 'On Time' },
    {
      place: 'Alappuzha',
      arrivalTime: '05:00AM',
      depatureTime: '05:01AM',
      status: 'On Time',
      time: '01:30AM',
    },
    { place: 'Kollam', time: '06:30AM', status: 'Delayed' },
    { place: 'Kochuveli', time: '07:30AM', status: 'Delayed' },
  ];
}
