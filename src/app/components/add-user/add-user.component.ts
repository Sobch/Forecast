import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { reject } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = <User>{};
  loading = false;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {}

  add(addUserForm) {
    this.loading = true;
    this.usersService.add(this.user).then(
      response => {
        this.loading = false;
        this.router.navigate(['/list']);
      },
      rejected => {
        alert('Nie powiodło się!');
        this.loading = false;
      }
    );
  }
}
