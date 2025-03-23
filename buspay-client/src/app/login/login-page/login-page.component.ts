import { Component } from '@angular/core';
import { TextBoxComponent } from '../../private/common-components/text-box/text-box.component';
import { AuthenticationService } from '../../shared/services/auth/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterDataService } from '../../core/services/master-data/master-data.service';
import { ToastService } from '../../shared/toast/toast.service';
import { StatusCode } from '../../core/utilities/buspay.enums';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private masterDataService: MasterDataService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin() {
    const formData = this.loginForm.value;
    this.login(formData);
  }

  login(formData: any) {
    const params = formData;

    this.authService.login(params).subscribe({
      next: (res: any) => {
        if (res.tokens && res.tokens.accessToken) {
          this.authService.setItem('accessToken', res.tokens.accessToken);
        }
        if (res.user) {
          this.masterDataService.setMasterData(res.user);
        }
        this.toastService.success(res.message);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.toastService.error(err.message);
      },
    });
  }
}
