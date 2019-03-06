import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class ApiGetService {
  private url = "https://super-crud.herokuapp.com/pokemon";

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getExperiments(id) {
    return [[18, 4000, 331], [18, 3500, 340]]
  }
}
