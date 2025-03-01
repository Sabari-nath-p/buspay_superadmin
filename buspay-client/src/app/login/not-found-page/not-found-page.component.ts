import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
