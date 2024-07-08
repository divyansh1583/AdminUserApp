import { Component } from '@angular/core';
import { AdminUserService } from 'src/app/services/admin-user.service';
import {Sort, MatSortModule} from '@angular/material/sort';
import { AdminUser } from 'src/app/model/adminUser';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  users: AdminUser[] = [];
  sortedData: AdminUser[] = [];


  constructor(private adminUserService: AdminUserService) {
    this.adminUserService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.sortedData = this.users.slice();
   }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    // this.sortedData = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name':
    //       return compare(a.name, b.name, isAsc);
    //     case 'calories':
    //       return compare(a.calories, b.calories, isAsc);
    //     case 'fat':
    //       return compare(a.fat, b.fat, isAsc);
    //     case 'carbs':
    //       return compare(a.carbs, b.carbs, isAsc);
    //     case 'protein':
    //       return compare(a.protein, b.protein, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

