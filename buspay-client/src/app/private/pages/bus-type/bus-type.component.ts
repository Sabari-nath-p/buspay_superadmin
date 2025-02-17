import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../../common-components/data-grid/data-grid.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GridActionCellRendererComponent } from '../../common-components/grid-action-cell-renderer/grid-action-cell-renderer.component';
import { CommonModalService } from '../../common-components/common-modal/common-modal.service';
import {
  ModalButton,
  ModalSize,
} from '../../../shared/models/common-modal.model';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { AddEditBustypeComponent } from './add-edit-bustype/add-edit-bustype.component';
import { AlertConfirmService } from '../../common-components/alert-confirm/alert-confirm.service';
import { BusService } from '../../../shared/services/bus/bus.service';

@Component({
  selector: 'app-bus-type',
  standalone: true,
  imports: [
    TextBoxComponent,
    CommonModule,
    DataGridComponent,
    ReactiveFormsModule,
    CommonModalComponent,
    AddEditBustypeComponent,
  ],
  templateUrl: './bus-type.component.html',
  styleUrl: './bus-type.component.scss',
})
export class BusTypeComponent {
  @ViewChild('addBusTypeTemplate', { static: false })
  addBusTypeTemplate!: TemplateRef<any>;
  @ViewChild('editBusTypeTemplate', { static: false })
  editBusTypeTemplate!: TemplateRef<any>;
  @ViewChild('test', { static: false })
  test!: AddEditBustypeComponent;

  searchForm!: FormGroup;
  selectedBusType!: any;

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

  busTypeList: any = [];

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
      field: 'type',
      headerName: 'BUS TYPE',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'minimum_kilometer',
      headerName: 'MINIMUM KM',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'minimum_fare',
      headerName: 'MIN CHARGE',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
      cellRenderer: (item: any) => {
        return `₹ ${item.value}`;
      },
    },
    {
      field: 'fare_per_kilometer',
      headerName: 'FARE PER KM',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
      cellRenderer: (item: any) => {
        return `₹ ${item.value}`;
      },
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
        onEdit: (data: any) => this.editBusType(data),
        onDelete: (data: any) => this.deleteBusType(data),
      },
    },
  ];

  ngOnInit() {
    this.busService.getAllBusTypes();
    this.initializeGridData();

    this.busService.busTypes$.subscribe((data: any) => {
      this.busTypeList = data;
      this.initializeGridData();
    });
  }

  initializeGridData() {
    // this.getBusTypeList()
    this.gridData = this.busTypeList;
  }

  getBusTypeList(): void {
    this.busService.busTypes$.subscribe((data: any) => {
      this.busTypeList = data;
    });
  }

  createBusType() {
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.addModal = {
        heading: 'CREATE TYPE',
        content: this.addBusTypeTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.MEDIUM,
        buttons: this.modalAddButton,
      };
      this.modalService.showModal(this.addModal);
    }, 200);
  }

  editBusType(data: any): void {
    this.selectedBusType = data;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.editModal = {
        heading: 'EDIT TYPE',
        content: this.editBusTypeTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.MEDIUM,
        buttons: this.modalEditButton,
      };
      this.modalService.showModal(this.editModal);
    }, 200);
  }

  deleteBusType(data: any): void {
    this.alertConfirmService
      .confirm(
        'Confirmation',
        'Are you sure you want to delete this item?',
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
    this.busService.deleteBusType(data.id).subscribe((res: any) => {
      if (res.status) {
        console.log(res.message); // Need to implement toast..
      }
    });
  }

  onValueChange(event: any): void {
    console.log(event);
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.busTypeList.filter((data: any) =>
        data.type
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.initializeGridData();
    }
  }
}
