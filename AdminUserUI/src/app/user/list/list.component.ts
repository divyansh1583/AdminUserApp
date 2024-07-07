import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
