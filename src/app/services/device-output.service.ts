import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeviceOutputService {

  constructor(private http: HttpClient, private router: Router) { }

  listDeviceOutputs(): Observable<any> {
    return this.http.get(AppRoutes.OUTPUT_TYPES);
  }

  createDeviceOutput(deviceId: string, experimentId: string, outputTypeName: string, outputValue: string, timestamp: number): Observable<any> {
    return this.http.post(AppRoutes.DEVICE_OUTPUTS, {
      device_id: deviceId,
      experiment_id: experimentId,
      output_type_name: outputTypeName,
      output_value: outputValue,
      timestamp: timestamp,
    });
  }

  listByExperiment(experimentId: string, outputTypeId = '', deviceId = ''): Observable<any> {
    var params = {
      output_type_id: outputTypeId,
      device_id: deviceId
    };
    var esc = encodeURIComponent;
    var queryParams = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    
    return this.http.get(`${AppRoutes.DEVICE_OUTPUTS}/experiment/${experimentId}?${queryParams}`);
  }
}
