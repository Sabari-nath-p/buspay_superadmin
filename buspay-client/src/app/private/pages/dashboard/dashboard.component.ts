import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AnalyticsCardComponent } from '../../common-components/analytics-card/analytics-card.component';
import { TimeLineComponent } from '../../common-components/time-line/time-line.component';
import { DataGridComponent } from '../../common-components/data-grid/data-grid.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextBoxComponent } from '../../common-components/text-box/text-box.component';
import { CommonModule } from '@angular/common';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';
import {
  ProfileParent,
  UserStatus,
} from '../../../core/utilities/buspay.enums';
import { UsersService } from '../../../shared/services/users/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnalyticsCardComponent,
    TimeLineComponent,
    DataGridComponent,
    TextBoxComponent,
    CommonModalComponent,
    UserProfileComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('userProfile', { static: false })
  userProfile!: TemplateRef<any>;
  searchForm!: FormGroup;
  gridData!: any;
  selectedUser!: any;
  onBoardList: any = [];

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private userService: UsersService
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
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: true,
      sortable: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'phone',
      headerName: 'Phone',
      filter: true,
      sortable: true,
      headerComponentParams: {
        style: { textAlign: 'center' },
      },
      cellStyle: { textAlign: 'center' },
    },
    {
      field: 'action',
      headerName: 'Action',
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
    this.initializeGridData();
  }

  initializeGridData(): void {
    this.userService.getAllUsers();
    this.userService.usersList$.subscribe((res: any) => {
      if (res) {
        let users = res;
        this.onBoardList = users.filter(
          (user: any) => user.status === UserStatus.PENDING
        );
        this.gridData = this.onBoardList;
      }
    });
    this.gridData = this.onBoardList;
  }

  viewRequest(data: any): void {
    this.selectedUser = data;

    this.cdRef.detectChanges();

    this.router.navigate(['/profile', data.id], {
      state: { userDetails: data, parent: ProfileParent.ONBOARD }, // Pass user details via state
    });
  }

  onValueChange(event: any): void {
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.onBoardList.filter((data: any) =>
        data.name
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.initializeGridData();
    }
  }
}
