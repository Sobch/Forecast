import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { User } from '../models/user';
import { reject } from 'q';

@Injectable()
export class UsersService {

  private userListObservable = new BehaviorSubject<Array<User>>([]);
  private userObservable = new BehaviorSubject<User>(<User>{});
  user: User;

  constructor(private httpService: HttpService) {
    this.httpService.getUsers().subscribe(usersList => {
      this.userListObservable.next(usersList);
    });
  }

  get(id: string): Promise<User> {
    return new Promise ((resolve, rejected) => {
      this.httpService.getUser(id).then(data => {
        resolve(data);
      }, response => {
        reject(response.status);
      });
    });
  }

  add(user: User) {
    return new Promise ((resolve, rejected) => {
      const usersList = this.userListObservable.getValue();
      this.httpService.postUser(user).then(data => {
        usersList.push(data);
        this.userListObservable.next(usersList);
        resolve(data);
      }, response => {
        reject(response);
      });
    });
  }

  edit(user: User) {
    return new Promise ((resolve, rejected) => {
      const usersList = this.userListObservable.getValue();
      this.httpService.putUser(user).then(data => {
        const index = usersList.findIndex(e => e._id.$oid === user._id.$oid);
        usersList[index] = user;
        resolve(data);
      }, response => {
        reject(response);
      });
    });
  }

  remove(user: User) {
    return new Promise ((resolve, rejected) => {
      this.httpService.deleteUser(user).then(data => {
        const usersList = this.userListObservable.getValue().filter(e => {console.log(e); return e._id.$oid !== user._id.$oid; });
        console.log(user);
        this.userListObservable.next(usersList);
        resolve(data);
      }, response => {
        reject(response);
      });
    });
  }

  getUsersListObservable(): Observable<Array<User>> {
    return this.userListObservable.asObservable();
  }
}

