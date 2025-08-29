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
import { Subscription } from 'rxjs/internal/Subscription';
import { CouponsService } from '../../../../shared/services/coupons/coupons.service';

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
  subscription: Subscription = new Subscription();
  isValid: boolean = false;
  couponId!: number;

  constructor(
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private couponService: CouponsService
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
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
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
    } else {
      this.resetForm();
    }

    this.subscription.add(
      this.modalService.modalButtonClick$.subscribe((id: string) => {
        if (!this.modalService.isModalOpen()) return;

        if (id === 'add' && !this.isEdit) {
          this.addCoupons();
        } else if (id === 'edit' && this.isEdit) {
          this.editCoupon();
        }
      })
    );

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
    //         this.addCoupons();
    //         break;
    //       case 'edit':
    //         this.editCoupon();
    //         break;
    //     }
    //   }
    // );
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

    this.couponService.addCoupon(formattedData).subscribe((res: any) => {
      if (res.status) {
        this.couponService.getAllCoupons();
      }
    });

    this.modalService.hideModal();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

    this.couponService.updateCoupon(this.couponId, formData).subscribe({
      next: (response: any) => {
        if (response.status) {
          console.log(response.message);
          // Implement toast
          this.couponService.getAllCoupons();
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
    this.couponsForm.reset();
    this.couponsForm.markAsPristine();
    this.couponsForm.markAsUntouched();
    this.isValid = true;
  }
}
