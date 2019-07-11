import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { ChangeEmailService } from './../../services/change-email.service';
import { AppPaths } from 'src/app/app.paths';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public auth: AuthService, public userService: UserService, public changeEmailService: ChangeEmailService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getChangeEmailPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.CHANGE_EMAIL_PATH}`;
  }

  getRequestAccessPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.REQUEST_ACCESS_PATH}`;
  }

  getManageAccessPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.MANAGE_ACCESS_PATH}`;
  }

}
