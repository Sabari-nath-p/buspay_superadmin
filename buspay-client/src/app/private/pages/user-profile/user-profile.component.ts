import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabItem } from '../../../shared/models/tabs-panel.model';
import { TabsPanelComponent } from '../../common-components/tabs-panel/tabs-panel.component';
import { UsersService } from '../../../shared/services/users/users.service';
import { StatusCode } from '../../../core/utilities/buspay.enums';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, TabsPanelComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileComponent {
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
  userDetails!: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UsersService
  ) {}
  ngOnInit(): void {
    this.getUserDetailsById(1);
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
        console.log('User : ', res.data);
        this.userDetails = res.data;
      }
    });
  }

  onSelectionChanged(event: any) {
    console.log(event);
    this.currentTab = event;
  }
}
