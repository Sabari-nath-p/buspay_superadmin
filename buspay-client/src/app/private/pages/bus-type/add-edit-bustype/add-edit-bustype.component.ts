import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextBoxComponent } from '../../../common-components/text-box/text-box.component';

@Component({
  selector: 'app-add-edit-bustype',
  standalone: true,
  imports: [TextBoxComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-bustype.component.html',
  styleUrl: './add-edit-bustype.component.scss',
})
export class AddEditBustypeComponent {
  @Input() formData: any = [];
  @Input() isEdit: boolean = false;
  busTypeForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.busTypeForm = this.fb.group({
      busType: [''],
      fareKm: [],
      minCharge: [],
      farePerKm: [],
    });
  }

  ngOnInit(): void {
    if (this.isEdit && this.formData) {
      console.log('patch', this.formData);
      this.busTypeForm.controls['busType'].patchValue(this.formData.busType);
      this.busTypeForm.controls['fareKm'].patchValue(this.formData.fareKm);
      this.busTypeForm.controls['minCharge'].patchValue(
        this.formData.minCharge
      );
      this.busTypeForm.controls['farePerKm'].patchValue(
        this.formData.farePerKm
      );
    }
  }
}
