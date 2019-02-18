import { Injectable } from '@angular/core';

import {Observable,} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppSettings} from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    
    return this.http.get(AppSettings.API_ENDPOINT + 'auth/user', {withCredentials: true});
  }

  signOut() {

  }
}
