import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { Weather } from '../../models/weather';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  id: string;
  user: User;
  weather: Weather = <Weather>{};
  weatherResponse = false;
  imageLink: string;
  deleting = false;
  noWeatherError = true;

  constructor(private route: ActivatedRoute, private usersService: UsersService,
          private weatherService: WeatherService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.usersService.get(this.id).then((user: User) => {
      this.user = user;
      this.weatherService.get(user.city).then(
        (weather: Weather) => {
          this.weather = weather;
          this.weatherResponse = true;
          this.imageLink = 'http://openweathermap.org/img/w/' + this.weather.weather[0].icon + '.png';
        }, rejected => {
          this.noWeatherError = false;
        }
      );
    }, response => {
      alert('Error getting user...');
    });
   }

  remove(user) {
    this.deleting = true;
    this.usersService.remove(user).then(
      response => {
        this.router.navigate(['/list']);
      },
      rejected => { alert('Nie powiodło się!'); this.deleting = false; }
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
