import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AuthGuardService } from '../core/guards/authguard/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from '../app.component';

export const privateRoutes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'integrations', component: DashboardComponent },
    ],
  },
];
