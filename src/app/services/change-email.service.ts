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

  constructor(private http: HttpClient, private router: Router) {}

  changeEmail(id: string, email: string): Observable<any> {
    return this.http.put(`${AppRoutes.USERS}/${id}/email`, {
      email: email
    });
  }
}
