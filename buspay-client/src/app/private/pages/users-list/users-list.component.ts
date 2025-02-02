import { Component } from '@angular/core';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../shared/services/users/users.service';
import { UserStatus } from '../../../core/utilities/buspay.enums';
import { SettlementService } from '../../../shared/services/settlements/settlement.service';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { SelectBoxComponent } from '../../common-components/select-box/select-box.component';
import { DistrictStatesService } from '../../../shared/services/district-state/district-states.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    SelectBoxComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  searchForm!: FormGroup;
  userList: any;
  // districts1:any=['Option 1', 'Option 2', 'Option 3']
  // districts2 = [
  //   { id: 1, name: 'John' },
  //   { id: 2, name: 'Jane' },
  // ];
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
    // console.log('getUserData');
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
    // console.log('User List : ', this.userList);

    const users = this.userList.filter((user: any) =>
      user.name
        .toLowerCase()
        .includes(this.searchForm.controls['searchName'].value.toLowerCase())
    );
    // console.log('searched user : ', users);
  }
}
