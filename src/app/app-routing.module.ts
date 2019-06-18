import { CreateOutputTypeComponent } from './components/create-output-type/create-output-type.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CreateExperimentComponent } from './components/create-experiment/create-experiment.component';
import { CreateNewDeviceComponent } from './components/create-new-device/create-new-device.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { EXPERIMENTS_ROUTES } from './components/experiments/experiments-routing/experiments-routing.module';

const routes: any = [
  { path: LoginComponent.PATH, component: LoginComponent },
  { path: SignupComponent.PATH, component: SignupComponent },
  { path: 'unauthorized', component: HomeComponent, pathMatch: 'full' },
  { path: HomeComponent.PATH, component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: 'experiment', component: ExperimentsComponent },
  { path: 'experiment/:experimentId', component: ExperimentsComponent, children: EXPERIMENTS_ROUTES},
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
