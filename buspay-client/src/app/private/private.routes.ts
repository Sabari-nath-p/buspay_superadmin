import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AuthGuardService } from '../core/guards/authguard/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from '../app.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { BusTypeComponent } from './pages/bus-type/bus-type.component';
import { BusPreferenceComponent } from './pages/bus-preference/bus-preference.component';
import { CouponsComponent } from './pages/coupons/coupons.component';

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
    ],
  },
];
