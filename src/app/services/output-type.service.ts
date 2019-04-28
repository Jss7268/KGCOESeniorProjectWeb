import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { AppRoutes } from '../app.routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OutputTypeService {

  constructor(private http: HttpClient, private router: Route) { }

  listOutputTypes(): Observable<any> {
    return this.http.get(AppRoutes.OUTPUT_TYPES);
  }

  createOutputType(name: string, units: string): Observable<any> {
    return this.http.post(AppRoutes.OUTPUT_TYPES, {
      name: name,
      units: units,
    });
  }

  updateOutputType(name: string, units: string): Observable<any> {
    return this.http.put(AppRoutes.OUTPUT_TYPES + '/' + name + '/units' , {
      units: units,
    });
  }
}
