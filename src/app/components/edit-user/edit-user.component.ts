import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { reject } from 'q';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id: string;
  user: User = <User>{};
  loading = false;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.usersService.get(this.id).then((user: User) => {
      this.user = user;
    }, rejected => {
      alert('Error getting data');
    });
  }

  edit(editUserForm) {
    this.loading = true;
    this.usersService.edit(this.user).then(
      response => {
        this.router.navigate(['/user/' + this.id]);
      },
      rejected => { alert('Nie powiodło się!'); this.loading = false; }
    );
  }

  ngOnInit() {}

}
