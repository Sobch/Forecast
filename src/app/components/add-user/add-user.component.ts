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
  name: string;
  surname: string;
  city: string;
  country: string;
  isMale = true;
  loading = false;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {}

  add(addUserForm) {
    const user: User = {
      name: this.name,
      surname: this.surname,
      city: this.city,
      country: this.country,
      isMale: this.isMale
    };
    this.loading = true;
    this.usersService.add(user).then(
      response => {
        this.loading = false;
        this.router.navigate(['/list']);
      },
      rejected => { alert('Nie powiodło się!'); this.loading = false; }
    );
  }
}
