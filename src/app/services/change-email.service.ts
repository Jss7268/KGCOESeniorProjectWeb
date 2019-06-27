import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class ChangeEmailService {

  constructor(private http: HttpClient, private router: Router) {
    this.http.get(AppRoutes.USERME).subscribe(
      (data: any) => {
        this.setUser(data);
      },
      (error: any) => console.log(error)
      );
  }

  private currentUser;

  setUser(user: User) {
    localStorage.setItem(this.currentUser, JSON.stringify(user));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUser));
  }

  changeEmail(id: string, email: string): Observable<any> {
    return this.http.put(AppRoutes.V1_ENDPOINT + '/users/' + id + '/email', {
      email: email
    });
  }
}
