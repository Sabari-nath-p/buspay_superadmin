import { Component } from '@angular/core';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';

@Component({
  selector: 'app-bus-preference',
  standalone: true,
  imports: [TextBoxComponent],
  templateUrl: './bus-preference.component.html',
  styleUrl: './bus-preference.component.scss',
})
export class BusPreferenceComponent {
  onValueChange(event: any): void {
    console.log(event);
  }
}
