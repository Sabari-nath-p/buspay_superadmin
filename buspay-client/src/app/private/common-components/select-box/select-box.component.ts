import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-box.component.html',
  styleUrl: './select-box.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true,
    },
  ],
})
export class SelectBoxComponent {
  @Input() dataSource: any[] = [];
  @Input() valueExpression: string = '';
  @Input() displayExpression: string = '';
  @Input() placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  value: any;

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  getValue(item: any): any {
    return this.valueExpression
      ? this.getNestedValue(item, this.valueExpression)
      : item;
  }

  getDisplayValue(item: any): string {
    return this.displayExpression
      ? this.getNestedValue(item, this.displayExpression)
      : item;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => o?.[key], obj);
  }

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
