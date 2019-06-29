import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppRoutes } from './../app.routes';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class ManageAccessService {

  constructor(private http: HttpClient, private router: Router) {
    this.http.get(AppRoutes.USERS).subscribe(
      (data: any) => {
        this.setUserList(data);
      },
      (error: any) => console.log(error)
      );
  }

  users: string;

  setUserList(users: User[]) {
    localStorage.setItem(this.users, JSON.stringify(users));
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.users));
  }
}
