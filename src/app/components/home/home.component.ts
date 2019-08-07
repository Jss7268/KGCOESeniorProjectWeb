import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { AppPaths } from 'src/app/app.paths';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: any;
  $user: Subscription;
  userId = '';
  name = '';
  accessLevel= '';


  constructor(public auth: AuthService, private router: Router, public userService: UserService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.$user = this.userService.getCurrentUser().subscribe(
      (data: any) => {
        this.userId = data.id;
        this.name = data.name;
        this.accessLevel = data.access_level;
      },
      (error: any) => console.log(error)
    );
  }

  settings() {
    this.router.navigate([AppPaths.SETTINGS_PATH]);
  }

  getRequestAccessPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.REQUEST_ACCESS_PATH}`;
  }

  test() {
    this.auth.getUsers().subscribe((data: any) => {
      this.info = data;
    })
  }

}
