import { Routes } from '@angular/router';
import { privateRoutes } from './private/private.routes';
import { LoginPageComponent } from './login/login-page/login-page.component';

export const routes: Routes = [
  ...privateRoutes,
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
