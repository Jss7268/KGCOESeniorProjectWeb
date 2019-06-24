import { AppRoutes } from './../app.routes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserInputsService {

  constructor(private http: HttpClient, private router: Router) { }

  listUserInputs(): Observable<any> {
    return this.http.get(AppRoutes.USER_INPUTS);
  }

  createUserInput(deviceId: string, description: string, experimentId: string, timeStamp: number): Observable<any> {
    return this.http.post(AppRoutes.USER_INPUTS, {
        device_id: deviceId,
        description: description,
        experiment_id: experimentId,
        timestamp: timeStamp ? new Date(timeStamp).getTime() : new Date().getTime(),
    });
  }

  getUserInput(id: string): Observable<any> {
    return this.http.get(AppRoutes.USER_INPUTS + '/' + id);
  }

  changeUserInput(id: string, description: string): Observable<any> {
      return this.http.post(`${AppRoutes.USER_INPUTS}/description`, {
          id: id,
          description: description,
      });
  }
}
