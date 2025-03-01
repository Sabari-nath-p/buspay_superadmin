import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BusService } from '../../../shared/services/bus/bus.service';
import { AlertConfirmService } from '../../common-components/alert-confirm/alert-confirm.service';
import { CommonModalService } from '../../common-components/common-modal/common-modal.service';
import { CommonModule } from '@angular/common';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { SvgIconsComponent } from '../../common-components/svg-icons/svg-icons.component';
import {
  ModalButton,
  ModalSize,
} from '../../../shared/models/common-modal.model';
import { AddEditPreferenceComponent } from './add-edit-preference/add-edit-preference.component';

@Component({
  selector: 'app-bus-preference',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModalComponent,
    TextBoxComponent,
    ReactiveFormsModule,
    SvgIconsComponent,
    AddEditPreferenceComponent,
  ],
  templateUrl: './bus-preference.component.html',
  styleUrl: './bus-preference.component.scss',
})
export class BusPreferenceComponent {
  @ViewChild('addPreferenceTemplate', { static: false })
  addPreferenceTemplate!: TemplateRef<any>;
  @ViewChild('editPreferenceTemplate', { static: false })
  editPreferenceTemplate!: TemplateRef<any>;

  selectedPreference!: any;

  searchForm!: FormGroup;
  preferencesList: any = [];

  addModal!: any;
  editModal!: any;

  modalEditButton: ModalButton[] = [
    {
      id: 'edit',
      label: 'Edit',
      class: 'btn btn-primary',
      callback: () => {
        this.modalService.emitButtonClick('edit');
      },
    },
  ];

  modalAddButton: ModalButton[] = [
    {
      id: 'add',
      label: 'Add',
      class: 'btn btn-primary',
      callback: () => {
        this.modalService.emitButtonClick('add');
      },
    },
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private alertConfirmService: AlertConfirmService,
    private busService: BusService
  ) {
    this.searchForm = this.fb.group({
      searchName: [''],
    });
  }
  ngOnInit(): void {
    this.getAllBusPreferences();

    this.busService.busPreferences$.subscribe((data: any) => {
      this.preferencesList = data;
    });
  }

  getAllBusPreferences() {
    this.busService.getAllBusPreferences();
  }

  getBusPreferenceList(): void {
    this.busService.busPreferences$.subscribe((data: any) => {
      this.preferencesList = data;
    });
  }

  createPreference(): void {
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.addModal = {
        heading: 'Add Preference',
        content: this.addPreferenceTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.SMALL,
        buttons: this.modalAddButton,
      };
      // this.modalService.showModal(this.addModal);
      this.modalService.hideModal();
      setTimeout(() => {
        this.modalService.showModal(this.addModal);
      }, 100);
    }, 200);
  }

  editPreference(preference: any): void {
    this.selectedPreference = preference;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.editModal = {
        heading: 'Edit Preference',
        content: this.editPreferenceTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.SMALL,
        buttons: this.modalEditButton,
      };
      // this.modalService.showModal(this.editModal);
      this.modalService.hideModal();
      setTimeout(() => {
        this.modalService.showModal(this.editModal);
      }, 100);
    }, 200);
  }

  deletePreference(preference: any): void {
    this.alertConfirmService
      .confirm(
        'Confirmation',
        'Are you sure you want to delete this item?',
        'Yes',
        'Cancel'
      )
      .then((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.confirmDelete(preference);
        }
      });
  }

  confirmDelete(data: any): void {
    this.busService.deleteBusPreference(data.id).subscribe((res: any) => {
      if (res.status) {
        console.log(res.message); // Need to implement toast..
        this.getAllBusPreferences();
      }
    });
  }

  onValueChange(event: any): void {
    if (this.searchForm.value.searchName.length > 0) {
      this.preferencesList = this.preferencesList.filter((data: any) =>
        data.name
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.getBusPreferenceList();
    }
  }
}
