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
}
