import { Routes } from '@angular/router';
import { privateRoutes } from './private/private.routes';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { NotFoundPageComponent } from './login/not-found-page/not-found-page.component';

export const routes: Routes = [
  ...privateRoutes,
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
