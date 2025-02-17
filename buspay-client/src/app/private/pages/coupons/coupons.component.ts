import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BusService } from '../../../shared/services/bus/bus.service';
import { AlertConfirmService } from '../../common-components/alert-confirm/alert-confirm.service';
import { CommonModalService } from '../../common-components/common-modal/common-modal.service';
import { CommonModule } from '@angular/common';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { DataGridComponent } from '../../common-components/data-grid/data-grid.component';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { GridActionCellRendererComponent } from '../../common-components/grid-action-cell-renderer/grid-action-cell-renderer.component';
import {
  ModalButton,
  ModalSize,
} from '../../../shared/models/common-modal.model';
import { AddEditCouponComponent } from './add-edit-coupon/add-edit-coupon.component';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    TextBoxComponent,
    CommonModule,
    DataGridComponent,
    ReactiveFormsModule,
    CommonModalComponent,
    AddEditCouponComponent,
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent {
  @ViewChild('addCouponTemplate', { static: false })
  addCouponTemplate!: TemplateRef<any>;
  @ViewChild('editCouponTemplate', { static: false })
  editCouponTemplate!: TemplateRef<any>;

  searchForm!: FormGroup;
  selectedCoupon!: any;
  addModal!: any;
  editModal!: any;

  modalEditButton: ModalButton[] = [
    // {
    //   label: 'Close',
    //   class: 'btn btn-danger',
    //   callback: () => this.modalService.hideModal(),
    // },
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

  // couponList: any = [];

  couponList: any = [
    {
      id: 'WELCOME100',
      couponName: 'WELCOME100',
      minCharge: 100,
      maxCharge: 150,
      discount: 10,
      isActive: true,
    },
    {
      id: 'DECEMBER12',
      couponName: 'DECEMBER12',
      minCharge: 100,
      maxCharge: 150,
      discount: 10,
      isActive: true,
    },
    {
      id: 'NEWYEAR2025',
      couponName: 'NEWYEAR2025',
      minCharge: 100,
      maxCharge: 150,
      discount: 10,
      isActive: true,
    },
    {
      id: 'SPECIAL150',
      couponName: 'SPECIAL150',
      minCharge: 100,
      maxCharge: 150,
      discount: 10,
      isActive: true,
    },
    {
      id: 'BUSPAY100',
      couponName: 'BUSPAY100',
      minCharge: 100,
      maxCharge: 150,
      discount: 10,
      isActive: true,
    },
    {
      id: 'STUDENT200',
      couponName: 'STUDENT200',
      minCharge: 100,
      maxCharge: 150,
      discount: 10,
      isActive: true,
    },
    {
      id: 'FESTIVAL25',
      couponName: 'FESTIVAL25',
      minCharge: 100,
      maxCharge: 200,
      discount: 25,
      isActive: true,
    },
  ];

  gridData!: any;

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

  colDefs: any[] = [
    {
      field: 'couponName',
      headerName: 'Coupon Name',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'minCharge',
      headerName: 'Min Charge',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'maxCharge',
      headerName: 'Max charge',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'discount',
      headerName: 'Discount (%)',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'action',
      headerName: 'ACTIONS',
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center' },
      cellRenderer: GridActionCellRendererComponent,
      cellRendererParams: {
        onEdit: (data: any) => this.editCoupon(data),
        onDelete: (data: any) => this.deleteCoupon(data),
      },
    },
  ];

  ngOnInit() {
    this.initializeGridData();
  }

  initializeGridData(): void {
    this.gridData = this.couponList;
  }

  addCoupons(): void {
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.addModal = {
        heading: 'Create Coupon',
        content: this.addCouponTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.MEDIUM,
        buttons: this.modalAddButton,
      };
      this.modalService.showModal(this.addModal);
    }, 200);
  }
  editCoupon(data: any): void {
    this.selectedCoupon = data;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.editModal = {
        heading: 'Edit Coupons',
        content: this.editCouponTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.MEDIUM,
        buttons: this.modalEditButton,
      };
      this.modalService.showModal(this.editModal);
    }, 200);
  }
  deleteCoupon(data: any): void {
    this.alertConfirmService
      .confirm(
        'Confirmation',
        'Are you sure you want to delete this coupon?',
        'Yes',
        'Cancel'
      )
      .then((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.confirmDelete(data);
        }
      });
  }

  confirmDelete(data: any): void {
    console.log('Delete :', data);
  }

  onValueChange(event: any): void {
    console.log(event);
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.couponList.filter((data: any) =>
        data.couponName
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.initializeGridData();
    }
  }
}
