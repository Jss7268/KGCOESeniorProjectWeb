import { AppSettings } from './app.settings';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginService } from './services/login.service';
import { ExperimentService } from './services/experiment.service';
import { AuthService } from './services/auth.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTabsModule
} from '@angular/material';

import { MatDatepickerModule, MatMomentDateModule } from '@coachcare/datepicker';

import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CreateExperimentComponent } from './components/create-experiment/create-experiment.component';
import { CreateOutputTypeComponent } from './components/create-output-type/create-output-type.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CreateUserInputComponent } from './components/experiments/create-user-input/create-user-input.component';

import { NotificationComponent } from './components/notification/notification.component';
import { CreateDeviceComponent } from './components/create-device/create-device.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RequestAccessComponent } from './components/request-access/request-access.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ManageAccessComponent } from './components/manage-access/manage-access.component';
import { ExperimentSubheaderComponent } from './components/experiments/experiment-subheader/experiment-subheader.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { ExportExperimentComponent } from "./components/experiments/export-experiment/export-experiment.component";
import { CreateDeviceOutputComponent } from './components/experiments/create-device-output/create-device-output.component';
import { CreateDeviceExperimentComponent } from './components/experiments/create-device-experiment/create-device-experiment.component';
import { ExperimentsRoutingModule } from './components/experiments/experiments-routing/experiments-routing.module';
import { QuickViewComponent } from './components/experiments/quick-view/quick-view.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ExportExperimentComponent,
    CreateExperimentComponent,
    CreateDeviceOutputComponent,
    CreateOutputTypeComponent,
    ConfirmationDialogComponent,
    CreateDeviceExperimentComponent,
    NotificationComponent,
    CreateUserInputComponent,
    CreateDeviceComponent,
    SettingsComponent,
    RequestAccessComponent,
    ChangeEmailComponent,
    ManageAccessComponent,
    ExperimentSubheaderComponent,
    ExperimentsComponent,
    QuickViewComponent,
  ],
  entryComponents: [ConfirmationDialogComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ExperimentsRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
  ],
  providers: [LoginService,
    AuthService,
    AppSettings,
    ExperimentService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
