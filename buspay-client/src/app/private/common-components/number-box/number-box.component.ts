import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextBoxComponent } from '../text-box/text-box.component';

@Component({
  selector: 'app-number-box',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './number-box.component.html',
  styleUrl: './number-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true,
    },
  ],
})
export class NumberBoxComponent implements ControlValueAccessor {
  @Input() control!: AbstractControl;
  @Input() placeholder: string = '';
  @Input() iconClass: string = '';
  @Input() value: any;
  @Output() onValueChanged = new EventEmitter();

  formcontrol = new FormControl();

  constructor(private cdr: ChangeDetectorRef) {}

  onChange: any = () => {};
  onTouched: any = () => {};
  writeValue(value: any): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  // Register onChange callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register onTouched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onValueChangedEmit(event: any): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onValueChanged.emit(event.target.value);
  }
}
