import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router) {

  }
  private STORAGE_KEY = 'loggedInUser';
  private ACCESS_KEY = 'userAccess';

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
      this.setAccess(data['accessLevel']);
    })
    return o;
  }

  getUsers():Observable<any> {
    return this.http.get(AppSettings.API_ENDPOINT + '/v1/users');
  }

  setToken(token: string) {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.STORAGE_KEY)
  }
  
  setAccess(access: string) {
    localStorage.setItem(this.ACCESS_KEY, access);
  }

  getAccess() {
    return localStorage.getItem(this.ACCESS_KEY)
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  hasAccessLevel(accessLevel: number) {
    let access: string =  localStorage.getItem(this.ACCESS_KEY)
    return access != null && Number(access) >= accessLevel
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.ACCESS_KEY);
    this.router.navigate(['login']);
  }
}