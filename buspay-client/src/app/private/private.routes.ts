import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { AuthGuardService } from '../core/guards/authguard/auth-guard.service';

export const privateRoutes: Routes = [
  { path: '', component: PrivateComponent, canActivate: [AuthGuardService] },
];
