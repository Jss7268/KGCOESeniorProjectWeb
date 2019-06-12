import { Injectable } from '@angular/core';

import { Observable, observable, } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  auth: any;
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {

    let observable: Observable<any> = this.http.get(`${AppSettings.API_ENDPOINT}auth/user`, { withCredentials: true });
    observable.subscribe((data: any) => {
      if (data != undefined && data['email']) {
        this.auth = data;
      } else {
        this.auth = null;
      }
    });
    return observable;
  }

  signOut() {

  }

  signIn(email: string, pass: string): Observable<any> {
    let observable: Observable<any> = this.http.post(`${AppSettings.AUTH_ENDPOINT}authenticate`, { withCredentials: true });
    observable.subscribe((data: any) => {
      if (data != undefined && data['email']) {
        this.auth = data;
      } else {
        this.auth = null;
      }
    });
    return observable;
  }
}
