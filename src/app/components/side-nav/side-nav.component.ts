import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { AppPaths } from 'src/app/app.paths';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  getSettingsPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.SETTINGS_PATH}`;
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
