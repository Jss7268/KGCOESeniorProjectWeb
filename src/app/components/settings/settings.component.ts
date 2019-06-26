import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { ChangeEmailService } from './../../services/change-email.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  static PATH = 'settings';

  constructor(public auth: AuthService, public userService: UserService, public changeEmailService: ChangeEmailService) { }

  ngOnInit() {
  }

}
