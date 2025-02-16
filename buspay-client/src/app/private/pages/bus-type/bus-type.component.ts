import {
  ChangeDetectorRef,
  Component,
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

  searchForm!: FormGroup;
  selectedBusType!: any;

  modalEditButton: ModalButton[] = [
    // {
    //   label: 'Close',
    //   class: 'btn btn-danger',
    //   callback: () => this.modalService.hideModal(),
    // },
    {
      label: 'Edit',
      class: 'btn btn-primary',
      callback: () => this.onEditButtonClicked(),
    },
  ];

  modalAddButton: ModalButton[] = [
    {
      label: 'Add',
      class: 'btn btn-primary',
      callback: () => this.onAddButtonClicked(),
    },
  ];

  //sampleData
  busTypeList: any = [
    {
      id: 'BT001',
      busType: 'ORDINARY',
      fareKm: '2.5 KM',
      minCharge: 10,
      farePerKm: 1.2,
    },
    {
      id: 'BT002',
      busType: 'EXPRESS',
      fareKm: '2.5 KM',
      minCharge: 15,
      farePerKm: 1.8,
    },
    {
      id: 'BT003',
      busType: 'DELUXE',
      fareKm: '2.5 KM',
      minCharge: 20,
      farePerKm: 2.5,
    },
    {
      id: 'BT004',
      busType: 'AC',
      fareKm: '2.5 KM',
      minCharge: 25,
      farePerKm: 3.0,
    },
    {
      id: 'BT005',
      busType: 'SLEEPER',
      fareKm: '2.5 KM',
      minCharge: 30,
      farePerKm: 3.5,
    },
  ];

  gridData!: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: CommonModalService
  ) {
    this.searchForm = this.fb.group({
      searchName: [''],
    });
  }

  colDefs: any[] = [
    {
      field: 'busType',
      headerName: 'BUS TYPE',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'fareKm',
      headerName: 'FARE KM',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'minCharge',
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
      field: 'farePerKm',
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
    this.initializeGridData();
  }

  initializeGridData() {
    // this.getBusTypeList()
    this.gridData = this.busTypeList;
  }

  getBusTypeList(): void {
    // this.busTypeList = this.busService.getBusTypeList()
  }

  addBusType() {
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.modalService.showModal({
        heading: 'CREATE TYPE',
        content: this.addBusTypeTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.MEDIUM,
        buttons: this.modalAddButton,
      });
    }, 200);
  }

  editBusType(data: any): void {
    this.selectedBusType = data;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.modalService.showModal({
        heading: 'EDIT TYPE',
        content: this.editBusTypeTemplate,
        isHeaderRequired: true,
        isFooterRequired: true,
        width: ModalSize.MEDIUM,
        height: ModalSize.MEDIUM,
        buttons: this.modalEditButton,
      });
    }, 200);
  }
  deleteBusType(data: any): void {
    console.log('Delete :', data);
  }

  onValueChange(event: any): void {
    console.log(event);
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.busTypeList.filter((data: any) =>
        data.busType
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
      console.log('filer : ', this.gridData);
    } else {
      this.initializeGridData();
    }
  }

  onAddButtonClicked(): void {
    console.log('Add');
  }
  onEditButtonClicked(): void {
    console.log('Edit edit');
  }
}
