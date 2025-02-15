import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { BusTypeComponent } from './pages/bus-type/bus-type.component';
import { BusPreferenceComponent } from './pages/bus-preference/bus-preference.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const privateRoutes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'bus-type', component: BusTypeComponent },
      { path: 'preferences', component: BusPreferenceComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'integrations', component: DashboardComponent },
      { path: 'settings', component: DashboardComponent },
      { path: 'profile', component: UserProfileComponent },
    ],
  },
];
