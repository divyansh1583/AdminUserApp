import { Component, ViewChild } from '@angular/core';
import { AdminUserService } from 'src/app/services/admin-user.service';
import { Sort,MatSort } from '@angular/material/sort';
import { AdminUser } from 'src/app/model/adminUser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
deleteUser(arg0: number) {
throw new Error('Method not implemented.');
}
EditUser(_t30: AdminUser) {
throw new Error('Method not implemented.');
}
  users: AdminUser[] = [];
  sortedData: AdminUser[] = [];

  constructor(private adminUserService: AdminUserService) {
    this.adminUserService.getUsers().subscribe(users => {
      this.users = users;
      this.sortedData = users.slice();
    });
  }


  ngAfterViewInit() {
    this.sortedData = this.users.slice();
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