import { Component } from '@angular/core';
import { DataGridComponent } from '../../../common-components/data-grid/data-grid.component';
import { CommonModule } from '@angular/common';
import { CommonModalService } from '../../../common-components/common-modal/common-modal.service';

@Component({
  selector: 'app-list-settlements',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  templateUrl: './list-settlements.component.html',
  styleUrl: './list-settlements.component.scss',
})
export class ListSettlementsComponent {
  gridData!: any;
  settlementsList: any = [
    {
      issueId: '1223234',
      dueDate: 'DD/MM/YYYY',
      status: 'Paid',
      settleDate: '02/07/2023',
      amount: '₹92.04',
    },
    {
      issueId: '1223234',
      dueDate: '02/07/2023',
      status: 'Paid',
      settleDate: '02/07/2023',
      amount: '₹92.04',
    },
    {
      issueId: '1223234',
      dueDate: '02/07/2023',
      status: 'Pending',
      settleDate: '02/07/2023',
      amount: '₹92.04',
    },
    {
      issueId: '1223234',
      dueDate: '02/07/2023',
      status: 'Pending',
      settleDate: '02/07/2023',
      amount: '₹92.04',
    },
    {
      issueId: '1223234',
      dueDate: '02/07/2023',
      status: 'Paid',
      settleDate: '02/07/2023',
      amount: '₹92.04',
    },
    {
      issueId: '1667890',
      dueDate: '05/07/2023',
      status: 'Pending',
      settleDate: '09/07/2023',
      amount: '₹145.78',
    },
    {
      issueId: '1445678',
      dueDate: '10/07/2023',
      status: 'Paid',
      settleDate: '09/07/2023',
      amount: '₹212.50',
    },
  ];

  constructor(private modalService: CommonModalService) {}

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
      cellRenderer:(item:any)=>{
        return `${item.value}`
      }
    },
  ];

  ngOnInit(): void {
    // this.getSettlementsData();

    this.initializeGridData();
  }
  initializeGridData() {
    this.gridData = this.settlementsList;
  }
}
