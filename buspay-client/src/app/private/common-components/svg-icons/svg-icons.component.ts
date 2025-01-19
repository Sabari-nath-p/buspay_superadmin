import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icons.component.html',
  styleUrl: './svg-icons.component.scss',
})
export class SvgIconsComponent {
  @Input() name: string | undefined;
  @Input() className: string | undefined;
  @Input() classColor: string | undefined;
  @Input() focusable: string | undefined;
  @Input() ariaHidden: string | undefined;
  @Input() title: string | undefined;
  // @Input() viewBox:any = '0 0 640 512'
}
