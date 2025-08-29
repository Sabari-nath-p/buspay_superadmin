import { Component, Input } from '@angular/core';
import { DataGridComponent } from '../../../common-components/data-grid/data-grid.component';
import { CommonModule } from '@angular/common';
import { CommonModalService } from '../../../common-components/common-modal/common-modal.service';
import { SettlementService } from '../../../../shared/services/settlements/settlement.service';

@Component({
  selector: 'app-list-settlements',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  templateUrl: './list-settlements.component.html',
  styleUrl: './list-settlements.component.scss',
})
export class ListSettlementsComponent {
  @Input() userId: any;
  gridData!: any;
  settlementsList: any = [];

  constructor(
    private modalService: CommonModalService,
    private settlementService: SettlementService
  ) {}

  colDefs: any[] = [
    {
      field: 'issueId',
      headerName: 'Issue Id',
      filter: true,
      sortable: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      filter: true,
      sortable: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'status',
      headerName: 'Status',
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center' },
      filter: true,
      cellRenderer: (item: any) => {
        const status = document.createElement('span');
        status.innerText = `${item.value}`;
        if (item.value.toLowerCase() === 'paid') {
          status.classList.add('status-active');
        } else {
          status.classList.add('status-inactive');
        }
        return status;
      },
    },
    {
      field: 'settleDate',
      headerName: 'Settle Date',
      filter: true,
      sortable: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      filter: true,
      sortable: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center', fontSize: '16px' },
      cellRenderer: (item: any) => {
        return `${item.value}`;
      },
    },
  ];

  ngOnInit(): void {
    this.getSettlementsData();

    this.initializeGridData();
  }
  getSettlementsData() {
    this.settlementService
      .getAllSettlementRequestsByUserId(this.userId)
      .subscribe((res: any) => {
        if (res.data) {
          this.settlementsList = res.data;
        }
        this.initializeGridData();
      });
  }
  initializeGridData() {
    this.gridData = this.settlementsList;
  }
}
