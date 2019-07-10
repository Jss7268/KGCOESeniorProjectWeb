import { WelcomeComponent } from './components/welcome/welcome.component';
import { CreateOutputTypeComponent } from './components/create-output-type/create-output-type.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CreateExperimentComponent } from './components/create-experiment/create-experiment.component';
import { CreateUserInputComponent } from './components/experiments/create-user-input/create-user-input.component';
import { CreateNewDeviceComponent } from './components/create-new-device/create-new-device.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { EXPERIMENTS_ROUTES } from './components/experiments/experiments-routing/experiments-routing.module';
import { NoAuthGuard } from './no-auth.guard';

const routes: any = [
  { path: LoginComponent.PATH, component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: SignupComponent.PATH, component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [NoAuthGuard]},
  { path: 'unauthorized', component: HomeComponent, pathMatch: 'full' },
  { path: HomeComponent.PATH, component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: 'experiment', component: ExperimentsComponent, pathMatch: 'full' },
  { path: 'experiment/:experimentId', component: ExperimentsComponent, pathMatch: 'prefix', children: EXPERIMENTS_ROUTES},
  { path: 'home', component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: CreateExperimentComponent.PATH, component: CreateExperimentComponent, authLevel: 2, canActivate: [AuthGuard] },
  { path: CreateOutputTypeComponent.PATH, component: CreateOutputTypeComponent, authLevel: 1, canActivate: [AuthGuard] },
  { path: CreateNewDeviceComponent.PATH, component: CreateNewDeviceComponent, authLevel: 2, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
