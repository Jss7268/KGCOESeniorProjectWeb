import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChangeEmailService {

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppRoutes.USERME);
  }

  changeEmail(id: string, email: string): Observable<any> {
    return this.http.put(AppRoutes.V1_ENDPOINT + '/' + id + '/email', {
      email: email
    });
  }
}
