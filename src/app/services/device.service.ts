import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient, private router: Router) { }

  listDevices(): Observable<any> {
    return this.http.get(AppRoutes.LIST_DEVICES);
  }

  createDevice(name: string, id: string, password: string, accessLevel: string): Observable<any> {
    return this.http.post(AppRoutes.AUTH_REGISTER, {
      name: name,
      email: id,
      password: password,
      requested_access_level: accessLevel
    });
  }
}
