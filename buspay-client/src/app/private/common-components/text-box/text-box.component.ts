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
// import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true,
    },
  ],
})
export class TextBoxComponent implements ControlValueAccessor {
  @Input() control!: AbstractControl;
  @Input() placeholder: string = '';
  @Input() iconClass: string = '';
  @Input() value: any;
  @Output() onValueChanged = new EventEmitter();

  formcontrol = new FormControl();

  // ngDoCheck() {
  //   if (this.control) {
  //     this.formcontrol = this.control as FormControl;
  //   }
  // }

  constructor(private cdr: ChangeDetectorRef) {}

  // Implement ControlValueAccessor methods
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
