import { AppRoutes } from './../app.routes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getRequestedAccessLevelUsers(): Observable<any> {
    let o: Observable<any> = this.http.get(`${AppRoutes.USERS}?requested_access_level__!null`);
    return o;
  }

  rejectRequestedAccessLevelUser(id: string): Observable<any>  {
    let o: Observable<any> = this.http.post(`${AppRoutes.USERS}/${id}/reject_requested_access`, {});
    return o;
  }

  acceptRequestedAccessLevelUser(id: string, accessLevel: number): Observable<any>  {
    let o: Observable<any> = this.http.put(`${AppRoutes.USERS}/${id}/access`, { access_level: accessLevel });
    return o;
  }

  undoAccessLevelChange(id: string, currentAccessLevel: number, previousAccessLevel: number): Observable<any> {
    let o: Observable<any> = this.http.put(`${AppRoutes.USERS}/${id}/access`, { access_level: previousAccessLevel });
    return o;
  }
}
