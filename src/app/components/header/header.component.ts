import { CreateExperimentComponent } from './../create-experiment/create-experiment.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CreateNewDeviceComponent } from '../create-new-device/create-new-device.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {

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

  newDevice() {
    this.router.navigate(CreateNewDeviceComponent.PATH);
  }

  newExperiment() {
    this.router.navigate(CreateExperimentComponent.PATH.split('/'));
  }

  settings() {
    this.router.navigate([SettingsComponent.PATH])
  }
}
