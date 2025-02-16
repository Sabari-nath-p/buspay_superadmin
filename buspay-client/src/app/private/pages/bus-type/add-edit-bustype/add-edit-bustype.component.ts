import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextBoxComponent } from '../../../common-components/text-box/text-box.component';
import { CommonModalService } from '../../../common-components/common-modal/common-modal.service';

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
  subscription!: any;

  constructor(
    private fb: FormBuilder,
    private modalService: CommonModalService
  ) {
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

    this.subscription = this.modalService.modalButtonClick$.subscribe(
      (id: string) => {
        switch (id) {
          case 'add':
            this.addBustype();
            break;
          case 'edit':
            this.editBustype();
            break;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addBustype(): void {
    if (this.busTypeForm.valid) {
      console.log('valid : ' , this.busTypeForm.value);
    }
  }

  editBustype(): void {
    if (this.busTypeForm.valid) {
      console.log('valid : ' ,this.busTypeForm.value);
    }
  }
}
