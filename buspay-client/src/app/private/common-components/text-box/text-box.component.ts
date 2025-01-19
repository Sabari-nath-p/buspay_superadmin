import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss',
})
export class TextBoxComponent {
  @Input() placeholder: string = '';
  @Input() iconClass: string = '';
  @Output() onValueChanged = new EventEmitter();
  onValueChangedEmit(event: any): void {
    this.onValueChanged.emit(event.target.value);
  }
}
