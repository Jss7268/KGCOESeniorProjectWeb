import { CreateOutputTypeComponent } from './components/create-output-type/create-output-type.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CreateExperimentComponent } from './components/create-experiment/create-experiment.component';
import { CreateDeviceComponent } from './components/create-device/create-device.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { EXPERIMENTS_ROUTES } from './components/experiments/experiments-routing/experiments-routing.module';
import { AppPaths } from './app.paths';

const routes: any = [
  { path: AppPaths.LOGIN_PATH, component: LoginComponent },
  { path: AppPaths.SIGNUP_PATH, component: SignupComponent },
  { path: 'unauthorized', component: HomeComponent, pathMatch: 'full' },
  { path: AppPaths.HOME_PATH, component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: 'experiment', component: ExperimentsComponent, pathMatch: 'full' },
  { path: 'experiment/:experimentId', component: ExperimentsComponent, pathMatch: 'prefix', children: EXPERIMENTS_ROUTES},
  { path: 'home', component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: AppPaths.CREATE_EXPERIMENT_PATH, component: CreateExperimentComponent, authLevel: 2, canActivate: [AuthGuard] },
  { path: AppPaths.CREATE_OUTPUT_TYPE_PATH, component: CreateOutputTypeComponent, authLevel: 1, canActivate: [AuthGuard] },
  { path: AppPaths.CREATE_DEVICE_PATH, component: CreateDeviceComponent, authLevel: 2, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
