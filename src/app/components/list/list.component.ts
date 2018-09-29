import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userList: Array<User> = [];

  constructor(private usersService: UsersService) {
    this.usersService.getUsersListObservable().subscribe((users: Array<User>) => {
      this.userList = users.slice();
    });
  }

  ngOnInit() {}

  getColor(): string {
    return this.userList.length > 3 ? '#f00' : '#059';
  }

  remove(user: User) {
    this.usersService.remove(user);
  }

}
