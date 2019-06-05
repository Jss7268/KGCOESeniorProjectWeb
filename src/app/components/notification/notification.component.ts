import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private requestedUsers: User[]
  constructor(public auth: AuthService, private notificationService: NotificationService, public userService: UserService) { }

  ngOnInit() {
    this.notificationService.getRequestedAccessUsers().subscribe((data: any) => {
      this.requestedUsers = data;
    })
  }

  getNotificationCountText() {
    if (this.requestedUsers.length > 9) {
      return '●';
    }
    return this.requestedUsers.length;
  }

  rejectRequestedAccessLevel(user: User) {
    this.notificationService.rejectRequestedAccessLevelUser(user.id).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

  changeAccess(user: User) {
    this.notificationService.acceptRequestedAccessUser(user.id, user.requested_access_level).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

}
