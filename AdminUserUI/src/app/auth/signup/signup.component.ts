import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminUserService } from 'src/app/services/admin-user.service';


// export const maxAdminsValidator = (adminUserService:AdminUserService): ValidatorFn => {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const role = control.get('role');
//     if (role && role.value === 'Admin') {
//       adminUserService..subscribe(adminCount => {
//         if (adminCount >= 2) {
//           control.setErrors({ maxAdmins: true });
//         }
//       });
//     }
//     return null;
//   };
// };
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    control.get('confirmPassword')?.setErrors({ mismatch: true });
    return { mismatch: true };
  }
  else {
    control.get('confirmPassword')?.setErrors(null);
  }
  return null;
};
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminUserService: AdminUserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[$@$!%*?&]).{6,}$/)]],
      confirmPassword: ['', Validators.required],
      role: ['User', Validators.required]
    }, {
      validators: [passwordMatchValidator]
    });
  }
  getControl(value: string) {
    return this.registerForm.get(value);
  }
  onRegister() {
    if (this.registerForm.valid) {
      this.adminUserService.register(this.registerForm.value).subscribe(
        {
          next: (result) => {
            if (result.isSuccess) {
              console.log(result);
              this.router.navigate(['']);
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
