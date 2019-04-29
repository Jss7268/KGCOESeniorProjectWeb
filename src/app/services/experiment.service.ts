import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  constructor(private http: HttpClient) { }

  listExperiments(): Observable<any> {
    return this.http.get(AppSettings.API_ENDPOINT + 'v1/experiments');
  }

  getExperiment(id: string): Observable<any> {
      return this.http.get(AppSettings.API_ENDPOINT + 'v1/experiments/' + id);
  }
}
