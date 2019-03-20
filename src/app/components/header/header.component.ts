import { Component, OnInit, NgModule } from '@angular/core';
import { Inject } from '@angular/core'
import { LoginService } from '../../services/login.service';
import { DOCUMENT } from '@angular/common';
import {AppSettings} from '../../app.settings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any, private loginService: LoginService) { 
    
  }

  ngOnInit() {
    this.loginService.getUser().subscribe((data) => {
      console.log(data);
    });
  }

  signIn() {
    this.document.location.href = "/login" ;
  }

  signOut() {
    this.loginService.auth = null;
    this.document.location.href = AppSettings.API_ENDPOINT + "auth/logout"

  }

}
