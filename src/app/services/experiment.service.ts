import { AppRoutes } from './../app.routes';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Route } from '@angular/compiler/src/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private http: HttpClient, private router: Route) { }

  listExperiments(): Observable<any> {
    return this.http.get(AppRoutes.EXPERIMENTS);
  }

  createExperiment(description: string, startTime: number, notes: string): Observable<any> {
    return this.http.post(AppRoutes.EXPERIMENTS, {
      description: description,
      start_time: startTime,
      notes: notes
    });
  }
}
