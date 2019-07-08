import { AppPaths } from './../../../app.paths';
import { QuickViewComponent } from './../quick-view/quick-view.component';
import { ExportExperimentComponent } from './../export-experiment/export-experiment.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { CreateDeviceOutputComponent } from '../create-device-output/create-device-output.component';
import { CreateDeviceExperimentComponent } from '../create-device-experiment/create-device-experiment.component';
import { CreateUserInputComponent } from '../create-user-input/create-user-input.component';


export const EXPERIMENTS_ROUTES: any = [
  //{ path: '', component: HomeComponent, pathMatch: 'full', authLevel: 0, canActivate: [AuthGuard] },
  { path: AppPaths.EXPORT_EXPERIMENT_PATH, component: ExportExperimentComponent, authLevel: 0, canActivate: [AuthGuard] },
  { path: AppPaths.CREATE_DEVICE_OUTPUT_PATH, component: CreateDeviceOutputComponent, authLevel: 1, canActivate: [AuthGuard] },
  { path: AppPaths.CREATE_DEVICE_EXPERIMENT_PATH, component: CreateDeviceExperimentComponent, authLevel: 2, canActivate: [AuthGuard] },
  { path: AppPaths.CREATE_USER_INPUT_PATH, component: CreateUserInputComponent, authLevel: 2, canActivate: [AuthGuard] },
  { path: AppPaths.QUICK_VIEW_PATH, component: QuickViewComponent, authLevel: 2, canActivate: [AuthGuard] },

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
