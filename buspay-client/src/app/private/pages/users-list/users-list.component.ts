import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserStatus } from '../../../core/utilities/buspay.enums';
import { SettlementService } from '../../../shared/services/settlements/settlement.service';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { SelectBoxComponent } from '../../common-components/select-box/select-box.component';
import { DistrictStatesService } from '../../../shared/services/district-state/district-states.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent } from '../../common-components/data-grid/data-grid.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    SelectBoxComponent,
    DataGridComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  actionTemplate!: TemplateRef<any>;
  searchForm!: FormGroup;
  userList: any;

  districts2: any;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private settlementService: SettlementService,
    private districtService: DistrictStatesService
  ) {
    this.searchForm = this.fb.group({
      searchName: [''],
      selectedDistrict: [''],
    });
  }

  colDefs: any[] = [
    {
      field: 'name',
      headerName: 'Name',
      filter: true,
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
        if (item.value.toLowerCase() === 'active') {
          status.classList.add('status-active');
        } else {
          status.classList.add('status-inactive');
        }
        return status;
      },
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
        button.innerText = 'View Profile';
        button.classList.add('btn', 'action-button');
        button.addEventListener('click', () => this.viewUser(params.data));
        return button;
      },
    },
  ];

  ngOnInit() {
    this.getUserData();
    this.getUserById(12);
    this.changeUserStatus(12, UserStatus.ACTIVE);
    this.getAllSettlementRequests();
    this.getAllDistricts();
    this.districtService.districts$.subscribe((res) => {
      this.districts2 = res;
    });
    this.userService.usersList$.subscribe((users) => {
      this.userList = users;
    });
  }

  getUserData() {
    this.userList = this.userService.getAllUsers();
  }
  getUserById(userId: number) {
    this.userService.getUserById(userId);
  }

  changeUserStatus(userId: number, status: string) {
    this.userService.changeUserStatus(userId, status);
  }

  getAllSettlementRequests() {
    this.settlementService.getAllSettlementRequests();
  }

  getAllDistricts() {
    this.districtService.getAllDistricts();
  }

  //Search user
  searchUser() {
    console.log('Search Parameters:', this.searchForm.controls['searchName']);

    const users = this.userList.filter((user: any) =>
      user.name
        .toLowerCase()
        .includes(this.searchForm.controls['searchName'].value.toLowerCase())
    );
  }

  viewUser(user: any) {
    console.log('Selected User Data:', user);
  }
}
