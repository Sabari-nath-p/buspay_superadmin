import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextBoxComponent } from '../../../common-components/text-box/text-box.component';
import { BusService } from '../../../../shared/services/bus/bus.service';
import { CommonModalService } from '../../../common-components/common-modal/common-modal.service';

@Component({
  selector: 'app-add-edit-coupon',
  standalone: true,
  imports: [TextBoxComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-coupon.component.html',
  styleUrl: './add-edit-coupon.component.scss',
})
export class AddEditCouponComponent {
  @Input() formData: any = [];
  @Input() isEdit: boolean = false;
  couponsForm!: FormGroup;
  subscription!: any;
  isValid: boolean = false;
  couponId!: number;

  constructor(
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private busService: BusService
  ) {
    this.couponsForm = this.fb.group({
      couponName: ['', Validators.required],
      minCharge: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')],
      ],
      maxCharge: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')],
      ],
      discount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')],
      ],
    });
  }

  ngOnInit(): void {
    if (this.isEdit && this.formData) {
      this.couponId = this.formData.id;
      this.couponsForm.controls['couponName'].patchValue(
        this.formData.couponName
      );
      this.couponsForm.controls['minCharge'].patchValue(
        this.formData.minCharge
      );
      this.couponsForm.controls['maxCharge'].patchValue(
        this.formData.maxCharge
      );
      this.couponsForm.controls['discount'].patchValue(this.formData.discount);
    }

    this.subscription = this.modalService.modalButtonClick$.subscribe(
      (id: string) => {
        if (!this.modalService.isModalOpen()) return;
        switch (id) {
          case 'add':
            this.addCoupons();
            break;
          case 'edit':
            this.editCoupon();
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

  addCoupons(): void {
    if (this.couponsForm.invalid) {
      this.isValid = false;
      this.couponsForm.markAllAsTouched();
      return;
    }
    this.isValid = true;

    const formattedData = {
      ...this.couponsForm.value,
      minCharge: Number(this.couponsForm.value.minimum_fare),
      maxCharge: Number(this.couponsForm.value.minimum_kilometer),
      discount: Number(this.couponsForm.value.fare_per_kilometer),
    };

    // this.busService.createBusType(formattedData).subscribe((res: any) => {
    //   if (res.status) {
    //     this.busService.getAllBusTypes();
    //   }
    // });
  }

  editCoupon(): void {
    if (this.couponsForm.invalid) {
      this.couponsForm.markAllAsTouched();
      return;
    }

    const formData = {
      // ...this.couponsForm.value,
      couponName: this.couponsForm.value.type,
      minCharge: Number(this.couponsForm.value.minimum_fare),
      maxCharge: Number(this.couponsForm.value.minimum_kilometer),
      discount: Number(this.couponsForm.value.fare_per_kilometer),
    };
    // this.couponService.updateCoupon(this.couponId, formData).subscribe({
    //   next: (response: any) => {
    //     if (response.status) {
    //       console.log(response.message);
    //       // Implement toast
    //       this.busService.getAllBusTypes();
    //     }
    //   },
    //   error: (error: any) => {
    //     console.error('Update failed', error);
    //     // Implement toast
    //   },
    // });
  }
}
