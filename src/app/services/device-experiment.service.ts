import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class DeviceExperimentService {

  constructor(private http: HttpClient, private router: Router) { }

  listDevicesExperiments(): Observable<any> {
    return this.http.get(AppRoutes.EXPERIMENTS);
  }

  createDeviceExperiment(deviceId: string, experimentId: string): Observable<any> {
    return this.http.post(AppRoutes.DEVICE_EXPERIMENT, {
      device_id: deviceId,
      experiment_id: experimentId,
    });
  }

  listByDevice(deviceId: string) {
    return this.http.get(`${AppRoutes.DEVICE_EXPERIMENT}/${deviceId}/experiments`);
  }

  listDevicesByExperiment(experimentId: string) {
    return this.http.get(`${AppRoutes.DEVICE_EXPERIMENT}/${experimentId}/devices`);
  }
}
