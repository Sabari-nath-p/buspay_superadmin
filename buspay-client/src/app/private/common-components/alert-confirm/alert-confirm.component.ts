import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-confirm',
  standalone: true,
  imports: [],
  templateUrl: './alert-confirm.component.html',
  styleUrl: './alert-confirm.component.scss',
})
export class AlertConfirmComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() btnOkText: string = 'OK';
  @Input() btnCancelText: string = 'Cancel';
  @Output() result = new EventEmitter<boolean>();

  close(isConfirmed: boolean) {
    this.result.emit(isConfirmed);
  }
}
