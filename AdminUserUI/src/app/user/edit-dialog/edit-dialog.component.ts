import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  editForm: FormGroup;
  hide = true;
  hide1 = true;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private adminUserService: AdminUserService,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.editForm = this.fb.group({
      id:[data.id],
      firstName: [data.firstName, [Validators.required, Validators.maxLength(20)]],
      lastName: [data.lastName, [Validators.required, Validators.maxLength(20)]],
      email: [data.email, [Validators.required, Validators.email, Validators.maxLength(20)]],
      password:[data.password],
      confirmPassword:[data.password],
      role: [data.role, [Validators.required]]
    });
  }

  getControl(value: string) {
    return this.editForm.get(value);
  }

  onEdit() {
    if (this.editForm.valid) {
      
      this.adminUserService.updateUser(this.editForm.value).subscribe(res=>{
        console.log(res);
        if(res.isSuccess){
          this.toastr.success(res.message);
          this.dialogRef.close(true);
        }
        else{
          this.toastr.error(res.message);
          this.dialogRef.close(false);
        }
      });
    }

  }
}
