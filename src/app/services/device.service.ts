import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient, private router: Route) { }

  listDevices(): Observable<any> {
    return this.http.get(AppRoutes.LIST_DEVICES);
  }
}
