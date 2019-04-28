import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: any = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, pathMatch: 'full', authLevel: 3, canActivate: [AuthGuard]},
  {path: 'unauthorized', component: HomeComponent, pathMatch: 'full'}

];

export const routing = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
