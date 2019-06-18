import { AppRoutes } from './../app.routes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  public experimentId: string;
  public $experimentId: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
    this.$experimentId.subscribe(experimentId => this.experimentId = experimentId);
  }

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

 setExperimentId(id: string) {
   //this.experimentId = this.experimentId;
   this.$experimentId.next(id);
 }
}
