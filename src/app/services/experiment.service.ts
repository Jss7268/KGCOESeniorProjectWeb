import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  constructor(private http: HttpClient) { }

  getExperiments(index) {
    var sampleData = [
      {name: "Experiment 1", id: 2, data: [{voltage: 18, pressure: 4000, upTime: 331}, {voltage: 18, pressure: 3500, upTime: 340}]},
      {name: "Test Experiment", id: 5, data: [{voltage: 19, pressure: 9001, upTime: 31}, {voltage: 180, pressure: 35000, upTime: 3400}]}
      ]
    if (index == -1) {
      // return a list of all experiments if index is -1
      return sampleData
    }
    else {
      return sampleData[index]
    }
  }
}
