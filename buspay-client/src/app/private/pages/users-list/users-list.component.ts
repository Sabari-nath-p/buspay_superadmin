import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../shared/services/users/users.service';
import {
  ProfileParent,
  UserStatus,
} from '../../../core/utilities/buspay.enums';
import { SettlementService } from '../../../shared/services/settlements/settlement.service';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { SelectBoxComponent } from '../../common-components/select-box/select-box.component';
import { DistrictStatesService } from '../../../shared/services/district-state/district-states.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataGridComponent } from '../../common-components/data-grid/data-grid.component';
import { TabsPanelComponent } from '../../common-components/tabs-panel/tabs-panel.component';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { CommonModalService } from '../../common-components/common-modal/common-modal.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ModalSize } from '../../../shared/models/common-modal.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextBoxComponent,
    SelectBoxComponent,
    DataGridComponent,
    TabsPanelComponent,
    CommonModalComponent,
    UserProfileComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  @ViewChild('userProfile', { static: false })
  userProfile!: TemplateRef<any>;
  actionTemplate!: TemplateRef<any>;
  searchForm!: FormGroup;
  selectedUser!: any;
  viewModal!: any;
  private selectedUserSubject = new BehaviorSubject<any>([]);
  selectedUser$ = this.selectedUserSubject.asObservable();

  //sample data
  userList: any = [
    {
      id: 1,
      name: 'Harikrishnan KB',
      phone: '+91 9876543210',
      email: 'hari@buspay.com',
      website: 'www.buspay.com',
      status: 'Active',
      address: '123, Tech Park Road, Infopark',
      district: 'Kochi',
      acc: '1234567890123456',
      ifsc: 'SBIN0001234',
      bank_name: 'State Bank of India',
      upi: 'hari@upi',
    },
    {
      id: 2,
      name: 'Amit Verma',
      phone: '+91 9876543211',
      email: 'amit@buspay.com',
      website: 'www.amitbus.com',
      status: 'Inactive',
      address: '456, Cyber Hub, Gurgaon',
      district: 'Gurgaon',
      acc: '7894561230123456',
      ifsc: 'HDFC0005678',
      bank_name: 'HDFC Bank',
      upi: 'amit@hdfc',
    },
    {
      id: 3,
      name: 'Sneha Raj',
      phone: '+91 9876543212',
      email: 'sneha@buspay.com',
      website: 'www.snehatravels.com',
      status: 'Active',
      address: '789, Tech Valley, Bengaluru',
      district: 'Bangalore',
      acc: '3216549870123456',
      ifsc: 'ICIC0009876',
      bank_name: 'ICICI Bank',
      upi: 'sneha@icici',
    },
    {
      id: 4,
      name: 'Rahul Sharma',
      phone: '+91 9876543213',
      email: 'rahul@buspay.com',
      website: 'www.rahulbus.com',
      status: 'Active',
      address: '101, Whitefield, Bengaluru',
      district: 'Bangalore',
      acc: '9876543210123456',
      ifsc: 'AXIS0001122',
      bank_name: 'Axis Bank',
      upi: 'rahul@axis',
    },
    {
      id: 5,
      name: 'Priya Menon',
      phone: '+91 9876543214',
      email: 'priya@buspay.com',
      website: 'www.priyatravels.com',
      status: 'Inactive',
      address: '202, Marine Drive, Mumbai',
      district: 'Mumbai',
      acc: '6541239870123456',
      ifsc: 'KKBK0004321',
      bank_name: 'Kotak Mahindra Bank',
      upi: 'priya@kotak',
    },
  ];
  gridData: any;

  districts: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private userService: UsersService,
    private settlementService: SettlementService,
    private districtService: DistrictStatesService,
    private modalService: CommonModalService,
    private router: Router
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
    this.userService.usersList$.subscribe((users: any) => {
      // console.log("UserList : ",users)
      this.userList = users;
      this.gridData = users;
    });
    // this.getUserById(12);
    // this.changeUserStatus(12, UserStatus.ACTIVE);
    // this.getAllSettlementRequests();
    this.getAllDistricts();
    this.districtService.districts$.subscribe((res: any) => {
      this.districts = res;
    });
    this.initializeGridData();

    this.selectedUser$.subscribe((user: any) => {
      console.log('User data changed:', user);
      this.selectedUser = user;
      this.cdRef.detectChanges();
    });
  }

  initializeGridData() {
    this.gridData = this.userList;
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
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.userList.filter((user: any) =>
        user.name
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.initializeGridData();
    }
  }

  viewUser(user: any) {
    this.selectedUser = user;
    this.selectedUserSubject.next(user);
    this.cdRef.detectChanges();

    this.router.navigate(['/profile', user.id], {
      state: { userDetails: user, parent: ProfileParent.USERLIST }, // Pass user details via state
    });
  }
}
