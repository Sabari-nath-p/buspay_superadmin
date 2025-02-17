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
import { ModalSize } from '../../../shared/models/common-modal.model';
import { CommonModalService } from '../../common-components/common-modal/common-modal.service';
import { CommonModalComponent } from '../../common-components/common-modal/common-modal.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';
import { ProfileParent } from '../../../core/utilities/buspay.enums';

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

  constructor(
    private fb: FormBuilder,
    private modalService: CommonModalService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchName: [''],
    });
  }

  // Row Data: Sample.
  onBoardList: any = [
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
    this.gridData = this.onBoardList;
  }

  viewRequest(data: any): void {
    this.selectedUser = data;

    this.cdRef.detectChanges();

    this.router.navigate(['/profile', data.id], {
      state: { userDetails: data, parent: ProfileParent.SETTLEMENT }, // Pass user details via state
    });
  }

  onValueChange(event: any): void {
    console.log(event);
    if (this.searchForm.value.searchName.length > 0) {
      this.gridData = this.onBoardList.filter((data: any) =>
        data.type
          .toLowerCase()
          .includes(this.searchForm.value.searchName.toLowerCase())
      );
    } else {
      this.initializeGridData();
    }
  }
}
