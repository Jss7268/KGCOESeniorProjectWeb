import { AppRoutes } from './../app.routes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private http: HttpClient, private router: Router) { }

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

  getExperiment(id: string): Observable<any> {
    return this.http.get(`${AppRoutes.EXPERIMENTS}/${id}`);
 }
}
