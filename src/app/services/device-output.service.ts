import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class DeviceOutputService {

  constructor(private http: HttpClient, private router: Route) { }

  listDeviceOutputs(): Observable<any> {
    return this.http.get(AppRoutes.OUTPUT_TYPES);
  }

  createDeviceOuput(deviceId: string, outputTypeName: string, outputValue: string, timestamp: number): Observable<any> {
    return this.http.post(AppRoutes.OUTPUT_TYPES, {
      device_id: deviceId,
      output_type_name: outputTypeName,
      output_value: outputValue,
      timestamp: timestamp,
    });
  }
}
