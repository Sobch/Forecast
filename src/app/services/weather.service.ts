import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Weather } from '../models/weather';
import { HttpService } from './http.service';

@Injectable()
export class WeatherService {

  private weatherObservable = new BehaviorSubject<Weather>(<Weather>{});

  constructor(private httpService: HttpService) {

  }

  get(city: string) {
    return new Promise((resolve, reject) => {
      this.httpService.getWeather(city).then(
        data => {
          resolve(data);
        },
        rejected => {
          reject(rejected);
        }
      );
    });
  }
}
