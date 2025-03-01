import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextBoxComponent } from '../../../common-components/text-box/text-box.component';
import { CommonModalService } from '../../../common-components/common-modal/common-modal.service';
import { BusService } from '../../../../shared/services/bus/bus.service';
import { Subscription } from 'rxjs';

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
  // subscription!: any;
  subscription: Subscription = new Subscription();
  isValid: boolean = false;
  busTypeId!: number;

  constructor(
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private busService: BusService
  ) {
    this.busTypeForm = this.fb.group({
      type: ['', Validators.required],
      minimum_fare: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')],
      ],
      minimum_kilometer: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')],
      ],
      fare_per_kilometer: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')],
      ],
    });
  }

  ngOnInit(): void {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    if (this.isEdit && this.formData) {
      this.busTypeId = this.formData.id;
      this.busTypeForm.controls['type'].patchValue(this.formData.type);
      this.busTypeForm.controls['minimum_fare'].patchValue(
        this.formData.minimum_fare
      );
      this.busTypeForm.controls['minimum_kilometer'].patchValue(
        this.formData.minimum_kilometer
      );
      this.busTypeForm.controls['fare_per_kilometer'].patchValue(
        this.formData.fare_per_kilometer
      );
    } else {
      this.resetForm();
    }

    // Add new subscription
    this.subscription.add(
      this.modalService.modalButtonClick$.subscribe((id: string) => {
        if (!this.modalService.isModalOpen()) return;

        if (id === 'add' && !this.isEdit) {
          this.addBustype();
        } else if (id === 'edit' && this.isEdit) {
          this.editBustype();
        }
      })
    );

    // Track modal close to clean up
    this.subscription.add(
      this.modalService.modalConfig$.subscribe((config) => {
        if (config === null) {
          // Modal has been closed
          this.resetForm();
        }
      })
    );

    // this.subscription = this.modalService.modalButtonClick$.subscribe(
    //   (id: string) => {
    //     if (!this.modalService.isModalOpen()) return;
    //     switch (id) {
    //       case 'add':
    //         this.addBustype();
    //         break;
    //       case 'edit':
    //         this.editBustype();
    //         break;
    //     }
    //   }
    // );

    //----------------------------------------------------------------------

    // this.modalService.modalConfig$.subscribe((config) => {
    //   console.log("Config",config);
    //   if (config==null) {
    //     console.log("Modal closed")
    //     this.resetForm();
    //     this.isValid=true
    //   }
    // });

    // if(this.modalService.isModalOpen()){

    // }

    // this.modalService.hideModalSubject$.subscribe((hide: boolean) => {
    //   if (hide) {
    //     this.resetForm();
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addBustype(): void {
    if (this.busTypeForm.invalid) {
      this.isValid = false;
      this.busTypeForm.markAllAsTouched();
      return;
    }
    this.isValid = true;

    const formattedData = {
      ...this.busTypeForm.value,
      minimum_fare: Number(this.busTypeForm.value.minimum_fare),
      minimum_kilometer: Number(this.busTypeForm.value.minimum_kilometer),
      fare_per_kilometer: Number(this.busTypeForm.value.fare_per_kilometer),
    };

    this.busService.createBusType(formattedData).subscribe((res: any) => {
      if (res.status) {
        this.busService.getAllBusTypes();
        // Implement toast
      }
    });
    this.modalService.hideModal();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editBustype(): void {
    if (this.busTypeForm.invalid) {
      this.busTypeForm.markAllAsTouched();
      return;
    }

    const formData = {
      // ...this.busTypeForm.value,
      type: this.busTypeForm.value.type,
      minimum_fare: Number(this.busTypeForm.value.minimum_fare),
      minimum_kilometer: Number(this.busTypeForm.value.minimum_kilometer),
      fare_per_kilometer: Number(this.busTypeForm.value.fare_per_kilometer),
    };
    this.busService.updateBusType(this.busTypeId, formData).subscribe({
      next: (response: any) => {
        if (response.status) {
          console.log(response.message);
          // Implement toast
          this.busService.getAllBusTypes();
        }
      },
      error: (error: any) => {
        console.error('Update failed', error);
        // Implement toast
      },
    });
    this.modalService.hideModal();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetForm(): void {
    this.busTypeForm.reset();
    this.busTypeForm.markAsPristine();
    this.busTypeForm.markAsUntouched();
    this.isValid = true;
  }
}
