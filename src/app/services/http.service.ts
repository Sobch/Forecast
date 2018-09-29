import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable()
export class HttpService {

  readonly DB_URL = 'https://api.mlab.com/api/1/databases/forecast/collections/users';
  readonly dbParams = new HttpParams().set('apiKey', 'dzEJO1bwbCP5f-7KryTQWs1cbE5K__5u');

  readonly WEATHER_URL = 'https://openweathermap.org/data/2.5/weather';
  readonly weatherParams = new HttpParams().set('appid', 'b6907d289e10d714a6e88b30761fae22');

  constructor(private http: HttpClient) {
    this.getUsers();
   }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.DB_URL, {params: this.dbParams});
  }

  getUser(id: string): Promise<User> {
    return this.http.get<User>(this.DB_URL + '/' + id, {params: this.dbParams}).toPromise();
  }

  putUsers(userList: Array<User>): Observable<Array<User>> {
    return this.http.put<Array<User>>(this.DB_URL, userList, {params: this.dbParams});
  }

  postUser(user: User): Promise<User> {
    return this.http.post<User>(this.DB_URL, user, {params: this.dbParams}).toPromise();
  }

  putUser(user: User): Promise<User> {
    const contentType = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<User>(this.DB_URL + '/' + user._id.$oid, user, {params: this.dbParams, headers: contentType}).toPromise();
  }

  deleteUser(user: User): Promise<User> {
    return this.http.delete<User>(this.DB_URL + '/' + user._id.$oid, {params: this.dbParams}).toPromise();
  }

  getWeather(city: string): Promise<Weather> {
    return this.http.get<Weather>(this.WEATHER_URL + '?q=' + city, {params: this.weatherParams}).toPromise();
  }

}
