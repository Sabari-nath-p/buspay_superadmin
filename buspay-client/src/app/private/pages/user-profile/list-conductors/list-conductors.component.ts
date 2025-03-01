import { Component, Input } from '@angular/core';
import { UserStatus } from '../../../../core/utilities/buspay.enums';
import { DataGridComponent } from '../../../common-components/data-grid/data-grid.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../shared/services/users/users.service';

@Component({
  selector: 'app-list-conductors',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  templateUrl: './list-conductors.component.html',
  styleUrl: './list-conductors.component.scss',
})
export class ListConductorsComponent {
  @Input() busOwnerId: any;
  gridData!: any;

  conductorList: any = [];

  colDefs: any[] = [
    {
      field: 'name',
      headerName: 'Conductor Name',
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
        if (item.value.toLowerCase() === UserStatus.ACTIVE) {
          status.classList.add('status-active');
        } else {
          status.classList.add('status-inactive');
        }
        return status;
      },
    },
  ];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getConductorsList();
    this.initializeGridData();
  }
  getConductorsList() {
    this.userService
      .getConductorsByBusOwnerId(this.busOwnerId)
      .subscribe((res: any) => {
        if (res.data) {
          this.conductorList = res.data;
        }
        this.initializeGridData();
      });
  }
  initializeGridData() {
    this.gridData = this.conductorList;
  }
}
