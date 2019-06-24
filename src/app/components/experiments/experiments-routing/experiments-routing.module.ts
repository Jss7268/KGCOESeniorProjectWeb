import { ExportExperimentComponent } from './../export-experiment/export-experiment.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { AuthGuard } from 'src/app/auth.guard';
import { CreateDeviceOutputComponent } from '../create-device-output/create-device-output.component';
import { CreateDeviceExperimentComponent } from '../create-device-experiment/create-device-experiment.component';


export const EXPERIMENTS_ROUTES: any = [
  //{ path: '', component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: ExportExperimentComponent.PATH, component: ExportExperimentComponent, authLevel: 0, canActivate: [AuthGuard] },
  { path: CreateDeviceOutputComponent.PATH, component: CreateDeviceOutputComponent, authLevel: 1, canActivate: [AuthGuard] },
  { path: CreateDeviceExperimentComponent.PATH, component: CreateDeviceExperimentComponent, authLevel: 2, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forChild(EXPERIMENTS_ROUTES);

@NgModule({
  imports: [
    RouterModule.forChild(EXPERIMENTS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class ExperimentsRoutingModule { }
