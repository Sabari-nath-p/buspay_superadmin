import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { DataGridComponent } from '../../common-components/data-grid/data-grid.component';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { ModalButton } from '../../../shared/models/common-modal.model';
import { ToastService } from '../../../shared/toast/toast.service';
import { AlertConfirmService } from '../../common-components/alert-confirm/alert-confirm.service';
import { CommonModalService } from '../../common-components/common-modal/common-modal.service';
import { SettlementService } from '../../../shared/services/settlements/settlement.service';

@Component({
  selector: 'app-settlements-list',
  standalone: true,
  imports: [
    TextBoxComponent,
    CommonModule,
    DataGridComponent,
    ReactiveFormsModule,
    CommonModalComponent,
  ],
  templateUrl: './settlements-list.component.html',
  styleUrl: './settlements-list.component.scss',
})
export class SettlementsListComponent {
  @ViewChild('viewSettlementsTemplate', { static: false })
  viewSettlementsTemplate!: TemplateRef<any>;
  searchForm!: FormGroup;
  selectedSettlement!: any;

  viewModal!: any;

  modalEditButton: ModalButton[] = [
    {
      id: 'settle',
      label: 'SETTLE',
      class: 'btn btn-primary',
      callback: () => {
        this.modalService.emitButtonClick('settle');
      },
    },
  ];

  settlementsList: any = [
    {
      name: 'John Smith',
      amount: '$2,450.75',
    },
    {
      name: 'Sarah Johnson',
      amount: '$1,875.30',
    },
    {
      name: 'Michael Chen',
      amount: '$3,210.00',
    },
    {
      name: 'Priya Patel',
      amount: '$945.60',
    },
    {
      name: 'David Wilson',
      amount: '$5,120.25',
    },
  ];
  gridData!: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private alertConfirmService: AlertConfirmService,
    private toastService: ToastService,
    private settlementsService: SettlementService
  ) {
    this.searchForm = this.fb.group({
      searchName: [''],
    });
  }

  colDefs: any[] = [
    {
      field: 'name',
      headerName: 'Customer Name',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'amount',
      headerName: 'Settlement Amount',
      filter: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'action',
      headerName: 'View',
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center' },
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'View Request';
        button.classList.add('btn', 'action-button');
        button.addEventListener('click', () => this.viewRequest(params.data));
        return button;
      },
    },
  ];

  ngOnInit(): void {
    // this.getAllSettlements();
    this.initializeGridData();
  }
  initializeGridData(): void {
    this.gridData = this.settlementsList;
  }

  getAllSettlements(): void {
    this.settlementsService.getAllSettlementRequests().subscribe((res: any) => {
      if (res.status) {
        this.settlementsList = res.data;
        this.initializeGridData();
      }
    });
  }

  viewRequest(rowData: any): void {
    console.log(rowData);
  }

  onValueChange(event: any): void {
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.settlementsList.filter((data: any) =>
        data.name
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.initializeGridData();
    }
  }
}
