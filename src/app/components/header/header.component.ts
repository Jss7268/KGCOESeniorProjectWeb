import { AppPaths } from 'src/app/app.paths';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
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
    this.router.navigate(AppPaths.CREATE_DEVICE_PATH.split('/'));
  }

  newExperiment() {
    this.router.navigate(AppPaths.CREATE_EXPERIMENT_PATH.split('/'));
  }

  settings() {
    this.router.navigate([AppPaths.SETTINGS_PATH]);
  }
}
