import { Component } from '@angular/core';
import { TextBoxComponent } from '../../private/common-components/text-box/text-box.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TextBoxComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  ngOnInit() {}

  onLogin() {
    const formData = this.loginForm.value;
    console.log('Form Data:', formData);
    this.login(formData);
  }

  // {
  //   email: 'superadmin@buspay.com',
  //   password: 'adminPassword',
  // };
  login(formData: any) {
    const params = formData;

    this.authService.login(params);
  }
}
