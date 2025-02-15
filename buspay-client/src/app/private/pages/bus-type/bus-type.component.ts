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

@Component({
  selector: 'app-bus-type',
  standalone: true,
  imports: [
    TextBoxComponent,
    CommonModule,
    DataGridComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './bus-type.component.html',
  styleUrl: './bus-type.component.scss',
})
export class BusTypeComponent {
  searchForm!: FormGroup;

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

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder) {
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

  editBusType(data: any): void {
    console.log('Edit :', data);
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
}
