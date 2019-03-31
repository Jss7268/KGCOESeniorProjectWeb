import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
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

  createUser(name: string, email: string, password: string):Observable<any> {
    let o: Observable<any> = this.http.post(AppSettings.AUTH_ENDPOINT + "register", {
      name: name,
      email: email,
      password: password
    });
    o.subscribe((data:any) => {
      console.log(data);
      
    })
    return o;
  }

  authenticate(email: string, password: string):Observable<any> {
    let o: Observable<any> = this.http.post(AppSettings.AUTH_ENDPOINT + "authenticate", {
      email: email,
      password: password
    });
    o.subscribe((data:any) => {
      console.log(data);
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

  submit(contactInfo: string, requestElevated: boolean) {

    this.http.post(this.getPostEndpoint(), {
      contact_info: contactInfo,
      request_elevatedd: JSON.stringify(requestElevated),
    }, { withCredentials: true }).subscribe((data: any) => {
      console.log(data);
      this.document.location.href = "./";

    });

  }
}