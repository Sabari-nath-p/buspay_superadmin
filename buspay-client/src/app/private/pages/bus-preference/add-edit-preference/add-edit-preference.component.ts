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
  selector: 'app-add-edit-preference',
  standalone: true,
  imports: [TextBoxComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-preference.component.html',
  styleUrl: './add-edit-preference.component.scss',
})
export class AddEditPreferenceComponent {
  @Input() formData: any = [];
  @Input() isEdit: boolean = false;
  preferenceForm!: FormGroup;
  subscription!: any;
  isValid: boolean = false;
  preferenceId!: number;

  constructor(
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private busService: BusService
  ) {
    this.preferenceForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.isEdit && this.formData) {
      this.preferenceId = this.formData.id;
      this.preferenceForm.controls['name'].patchValue(this.formData.name);
    }

    this.subscription = this.modalService.modalButtonClick$.subscribe(
      (id: string) => {
        if (!this.modalService.isModalOpen()) return;
        switch (id) {
          case 'add':
            this.addPreference();
            break;
          case 'edit':
            this.editPreference();
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

  addPreference(): void {
    if (this.preferenceForm.invalid) {
      this.isValid = false;
      this.preferenceForm.markAllAsTouched();
      return;
    }
    this.isValid = true;

    const formattedData = {
      ...this.preferenceForm.value,
    };

    this.busService.createBusPreference(formattedData).subscribe((res: any) => {
      if (res.status) {
        this.busService.getAllBusPreferences();
      }
    });
  }

  editPreference(): void {
    if (this.preferenceForm.invalid) {
      this.preferenceForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.preferenceForm.value,
    };
    this.busService.updateBusPreference(this.preferenceId, formData).subscribe({
      next: (response: any) => {
        if (response.status) {
          console.log(response.message);
          // Implement toast
          this.busService.getAllBusPreferences();
        }
      },
      error: (error: any) => {
        console.error('Update failed', error);
        // Implement toast
      },
    });
  }
}
