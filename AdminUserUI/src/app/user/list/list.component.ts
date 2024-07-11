import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { AdminUserService } from 'src/app/services/admin-user.service';
import { Sort, MatSort } from '@angular/material/sort';
import { AdminUser } from 'src/app/model/adminUser';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  users: AdminUser[] = [];
  sortedData: AdminUser[] = [];

  constructor(
    private adminUserService: AdminUserService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminUserService.getUsers().subscribe(res => {
      this.users = res;
      this.sortedData = this.users.slice();
      this.cdr.detectChanges();
    });
  }

  deleteUser(courseId: number) {
    var dialogRef = this.dialog.open(this.deleteDialog!);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminUserService.deleteUser(courseId).subscribe(() => {
          this.toastr.success("User deleted successfully");
          this.loadUsers();
        });
      }
    });
  }

  editUser(adminUser: AdminUser) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: adminUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  ngAfterViewInit() {
    this.sortedData = this.users.slice();
    this.cdr.detectChanges();
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'role':
          return compare(a.role, b.role, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
