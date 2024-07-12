import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private adminUserService: AdminUserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  getControl(value: string) {
    return this.loginForm.get(value);
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.adminUserService.login(this.loginForm.value).subscribe(
        {
          next: (result) => {
            if (result.isSuccess) {
              console.log(result);
              localStorage.setItem('login_token','token');
              this.router.navigate(['/user']);
              this.toastr.success(result.message);
            }
            else {
              console.log(result);
              this.toastr.error(result.message);
            }
          }
        }
      );
    }
  }

}
