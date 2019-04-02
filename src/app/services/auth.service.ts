import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  
  constructor(@Inject(DOCUMENT) private document: any, private appSettings: AppSettings,
    private http: HttpClient, private router: Router) {

  }
  private STORAGE_KEY = 'loggedInUser';

  getPostEndpoint() {
    return AppSettings.API_ENDPOINT + "user/signup";
  }

  createUser(name: string, email: string, password: string): Observable<any>{
    let o: Observable<any> = this.http.post(AppSettings.AUTH_ENDPOINT + "register", {
      name: name,
      email: email,
      password: password
    });
    return o;
  }

  authenticate(email: string, password: string): Observable<any>{
    let o: Observable<any> = this.http.post(AppSettings.AUTH_ENDPOINT + "authenticate", {
      email: email,
      password: password
    }, {withCredentials: true}).pipe(share());
    o.subscribe((data:any) => {
      this.setToken(data['token']);
    })
    return o;
  }

  setToken(token: string) {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.STORAGE_KEY)
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['login']);
  }
}