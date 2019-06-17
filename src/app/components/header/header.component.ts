import { AuthService } from './../../services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Inject } from '@angular/core'
import { LoginService } from '../../services/login.service';
import { DOCUMENT } from '@angular/common';
import {AppSettings} from '../../app.settings';
import { Router } from '@angular/router';
import { CreateUserInputComponent } from './../create-user-input/create-user-input.component';

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
    this.router.navigate(["experiments"]);
  }

  outputData() {
    this.router.navigate(["device-outputs/create"]);
  }

  userInputs() {
    this.router.navigate([CreateUserInputComponent.PATH]);
  }
}
