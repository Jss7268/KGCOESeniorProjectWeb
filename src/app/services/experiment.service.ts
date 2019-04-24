import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  constructor(private http: HttpClient) { }

  getExpEndpoint() {
    return AppSettings.API_ENDPOINT + "experiments";
  }

  getExperiments(index) {
    if (index == "-1") {
      // return a list of all experiments if index is -1
      return this.http.get('http://kgcoe-st-project.se.rit.edu:8080/api/v1/experiments/');
    }
    else {
      return this.http.get('http://kgcoe-st-project.se.rit.edu:8080/api/v1/experiments/' + index + "/");
    }
  }
}
