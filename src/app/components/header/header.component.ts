import { AuthService } from './../../services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Inject } from '@angular/core'
import { LoginService } from '../../services/login.service';
import { DOCUMENT } from '@angular/common';
import {AppSettings} from '../../app.settings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLoggedIn: boolean;
  constructor(@Inject(DOCUMENT) private document: any, private auth: AuthService, private router: Router) { 
    
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  signIn() {
    this.router.navigate(["login"]);
  }

  signOut() {
    this.auth.getToken();
    this.auth.logout();

  }

}
