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
      let observable: Observable<any> = this.http.get(AppSettings.API_ENDPOINT + 'v1/experiments', { withCredentials: true });
      observable.subscribe((data: any) => {console.log(data)});
      return "hi there";
    }
    else {
      let observable: Observable<any> = this.http.get(AppSettings.API_ENDPOINT + 'v1/experiments/' + index + "/", { withCredentials: true });
      observable.subscribe((data: any) => {console.log(data)});
      return "hi";
    }
  }
}
