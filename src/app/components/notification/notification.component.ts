import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private requestedUsers: User[]
  constructor(public auth: AuthService, private notificationService: NotificationService, public userService: UserService,
    public dialog: MatDialog) { }

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

  changeAccessLevelConfirmation(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { info: `Are you sure you want to grant ${user.name} access level: ${this.userService.getAccessName(user.requested_access_level)}?`, cancelDialog: 'Cancel', confirmDialog: 'Continue'}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.changeAccessLevel(user);
      }
    })
  }

  changeAccessLevel(user: User) {
    this.notificationService.acceptRequestedAccessLevelUser(user.id, user.requested_access_level).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

}
