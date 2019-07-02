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

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<any> {
    return this.http.get(AppRoutes.USERS);
  }
}
