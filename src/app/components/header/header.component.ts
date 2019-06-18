import { CreateExperimentComponent } from './../create-experiment/create-experiment.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Inject } from '@angular/core'
import { LoginService } from '../../services/login.service';
import { DOCUMENT } from '@angular/common';
import {AppSettings} from '../../app.settings';
import { Router } from '@angular/router';
import { CreateNewDeviceComponent } from '../create-new-device/create-new-device.component';
import { CreateDeviceOutputComponent } from '../experiments/create-device-output/create-device-output.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any, public auth: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  signIn() {
    this.router.navigate(["login"]);
  }

  signOut() {
    this.auth.getToken();
    this.auth.logout();

  }

  home() {
    this.router.navigate([""]);
  }

  experiments() {
    this.router.navigate(['experiment']);
  }

  outputData() {
    this.router.navigate([CreateDeviceOutputComponent.PATH]);
  }

  newDevice() {
    this.router.navigate(CreateNewDeviceComponent.PATH);
  }

  newUserInput() {
    this.router.navigate(["user-input/create"]);
  }

  newDeviceOutput() {
    this.router.navigate([CreateDeviceOutputComponent.PATH]);
  }

  newExperiment() {
    this.router.navigate([CreateExperimentComponent.PATH]);
  }
}
