import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { Router } from '@angular/router';
import * as querystring from 'querystring';
import { OutputType } from '../classes/output-type';

@Injectable({
  providedIn: 'root'
})
export class DeviceOutputService {
  public deviceOutputsByExperiment: any[];
  public outputTypeIds: string[];
  public $deviceOutputsByExperiment: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  listDeviceOutputs(): Observable<any> {
    return this.http.get(AppRoutes.OUTPUT_TYPES);
  }

  listByQuery(experimentId: string, outputTypeId: string, deviceId: string): Observable<any> {
    return this.http.get(this.getQueryUrl(experimentId, outputTypeId, deviceId));
  }

  getQueryUrl(experimentId: string, outputTypeId: string, deviceId: string, token=''): string {
    let obj = {};
    if (experimentId) obj['experiment_id'] = experimentId;
    if (outputTypeId) obj['output_type_id'] = outputTypeId;
    if (deviceId) obj['device_id'] = deviceId;
    if (token) obj['token'] = token;

    let queryParams = querystring.stringify(obj);

    queryParams = queryParams.replace(/output_type_id=/g, "output_type_id__in=");
    queryParams = queryParams.replace(/device_id=/g, "device_id__in=");

    return `${AppRoutes.DEVICE_OUTPUTS}?${queryParams}`;
  }

  getAuthorizedQueryUrl(experimentId: string, outputTypeId: string, deviceId: string): string {
    return `${this.getQueryUrl(experimentId, outputTypeId, deviceId, this.authService.getToken())}`
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
    let queryParams = querystring.stringify({
      output_type_id: outputTypeId,
      device_id: deviceId
    });

    return this.http.get(`${AppRoutes.DEVICE_OUTPUTS}/experiment/${experimentId}?${queryParams}`);
  }

  fillByExperiment(experimentId: string) {
    this.http.get(`${AppRoutes.DEVICE_OUTPUTS}/experiment/${experimentId}`).subscribe(
      (data: any) => {
        this.deviceOutputsByExperiment = data;
        let outputTypeObj = {};
        for (let output of data) {
          outputTypeObj[output['output_type_id']] = true;
        }
        this.outputTypeIds = Object.keys(outputTypeObj);
        this.$deviceOutputsByExperiment.next(experimentId);
      }
    )
  }
}
