import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export const maxAdminsValidator = (authService: AuthService): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const role = control.get('role');
    if (role && role.value === 'Admin') {
      authService.getAdminCount().subscribe(adminCount => {
        if (adminCount >= 2) {
          control.setErrors({ maxAdmins: true });
        }
      });
    }
    return null;
  };
};
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true } : null;
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['User', Validators.required]
    }, {
      validators: [passwordMatchValidator, maxAdminsValidator(this.authService)]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          alert('Registration failed');
        }
      );
    }
  }
}
