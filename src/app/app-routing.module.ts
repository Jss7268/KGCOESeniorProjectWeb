import { CreateOutputTypeComponent } from './components/create-output-type/create-output-type.component';
import { CreateDeviceOutputComponent } from './components/create-device-output/create-device-output.component';
import { ListExperimentsComponent } from './components/list-experiments/list-experiments.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CreateExperimentComponent } from './components/create-experiment/create-experiment.component';
import { CreateDeviceExperimentComponent } from './components/create-device-experiment/create-device-experiment.component';
import { CreateNewDeviceComponent } from './components/create-new-device/create-new-device.component';

const routes: any = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorized', component: HomeComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full', authLevel: 0 },
  { path: 'home', component: HomeComponent, pathMatch: 'full', authLevel: 0 },
  { path: ListExperimentsComponent.path, component: ListExperimentsComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: 'experiments/create', component: CreateExperimentComponent, authLevel: 2, canActivate: [AuthGuard] },
  { path: 'device-outputs/create', component: CreateDeviceOutputComponent, authLevel: 1, canActivate: [AuthGuard] },
  { path: 'output-types/create', component: CreateOutputTypeComponent, authLevel: 1},
  { path: 'devices-experiments/create', component: CreateDeviceExperimentComponent, authLevel: 2, canActivate: [AuthGuard] },
  { path: 'devices/create', component: CreateNewDeviceComponent, authLevel: 2},

];

export const routing = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
