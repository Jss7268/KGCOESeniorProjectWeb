import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          authorization: this.auth.getToken()
        }
      });
    }
    return next.handle(request).pipe(catchError((err: any) => {
      if (err.status === 401) {
        this.auth.logout();
      }
      return throwError(err);
    }));
    /*(catchError((error: HttpErrorResponse) => {
    if (error.status == 401) {
      this.router.navigate(['login']);
    }
    return throwError(error);
  }))
  /*(error => {
    if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
            case 400:
                return this.handle400Error(error);
            case 401:
                return this.handle401Error(req, next);
        }
    } else {
        return Observable.throw(error);
    }*/
  }
}