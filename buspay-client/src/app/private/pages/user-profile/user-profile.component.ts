import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabItem } from '../../../shared/models/tabs-panel.model';
import { TabsPanelComponent } from '../../common-components/tabs-panel/tabs-panel.component';
import { UsersService } from '../../../shared/services/users/users.service';
import {
  ProfileParent,
  SettleStatus,
  StatusCode,
  UserStatus,
} from '../../../core/utilities/buspay.enums';
import { AvatarService } from '../../../shared/services/avatar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListBusesComponent } from './list-buses/list-buses.component';
import { ListConductorsComponent } from './list-conductors/list-conductors.component';
import { ListSettlementsComponent } from './list-settlements/list-settlements.component';
import { ProfileAnalyticsComponent } from './profile-analytics/profile-analytics.component';
import { AlertConfirmService } from '../../common-components/alert-confirm/alert-confirm.service';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    TabsPanelComponent,
    ListBusesComponent,
    ListConductorsComponent,
    ListSettlementsComponent,
    ProfileAnalyticsComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileComponent {
  @Input() userDetails: any;
  @Input() parentScreen: string = '';

  @ViewChild('analyticsTab', { static: false })
  analyticsTab!: TemplateRef<any>;
  @ViewChild('busesTab', { static: false })
  busesTab!: TemplateRef<any>;
  @ViewChild('conductorsTab', { static: false })
  conductorsTab!: TemplateRef<any>;
  @ViewChild('settlementsTab', { static: false })
  settlementsTab!: TemplateRef<any>;

  profileTabs: TabItem[] | null = null;
  currentTab!: any;
  // userDetails!: any;
  Parent = ProfileParent;
  userProfileImage!: any;
  userId!: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UsersService,
    private avatarsService: AvatarService,
    private route: ActivatedRoute,
    private alertConfirmService: AlertConfirmService,
    private router: Router,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    const navigation = history.state;
    if (navigation && navigation.userDetails) {
      this.userDetails = navigation.userDetails;
      this.userId = this.userDetails.id;
      this.parentScreen = navigation.parent;
    } else {
      this.userId = Number(this.route.snapshot.paramMap.get('id'));

      this.getUserDetailsById(this.userId);
    }

    this.getUserProfileImage();
  }

  ngAfterViewInit(): void {
    this.profileTabs = [
      { id: 'analytics', heading: 'Analytics', template: this.analyticsTab },
      { id: 'buses', heading: 'Buses', template: this.busesTab },
      { id: 'conductors', heading: 'Conductors', template: this.conductorsTab },
      {
        id: 'settlements',
        heading: 'Settlements',
        template: this.settlementsTab,
      },
    ];
    this.cdr.detectChanges();
  }

  getUserDetailsById(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      if (res.statusCode === StatusCode.Success) {
        this.userDetails = res.data;
      }
    });
  }

  onSelectionChanged(event: any) {
    this.currentTab = event;
  }

  getUserProfileImage() {
    if (this.userDetails && this.userDetails.name) {
      this.userProfileImage = this.avatarsService.getAvatarWithInitials(
        this.userDetails.name
      );
    }
  }

  onApprove(): void {
    this.userService
      .changeUserStatus(this.userId, UserStatus.ACTIVE)
      .subscribe((res: any) => {
        this.toastService.success(res.message);
        this.router.navigate(['/dashboard']);
      });
  }

  onRejected(): void {
    this.alertConfirmService
      .confirm(
        'Confirmation',
        'Are you sure you want to decline this owner?',
        'Yes',
        'Cancel'
      )
      .then((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.userService
            .changeUserStatus(this.userId, UserStatus.PENDING)
            .subscribe((res: any) => {
              this.toastService.success(res.message);
              this.router.navigate(['/dashboard']);
            });
        }
      });
  }
}
