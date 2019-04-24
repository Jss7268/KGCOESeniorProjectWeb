import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'experiments', component: ExperimentsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
