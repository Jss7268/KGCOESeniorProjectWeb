import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let requiredAccess = -1;
      try {
        requiredAccess = next.routeConfig['authLevel'];
      } catch (err) {
        console.log('no authLevel for route: ' + next.url);
      }
    if(this.auth.isLoggedIn()){
      console.log(this.auth.getAccess());
      console.log(requiredAccess);
      if (Number(this.auth.getAccess()) >= requiredAccess) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
