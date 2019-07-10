import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ManageAccessService } from './../../services/manage-access.service';
import { User } from 'src/app/classes/user';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  ngUnsubscribe = new Subject();
  displayedColumns: string[] = ['id', 'name', 'access_level'];
  userList: User[] = [];
  userDictionary: { [id: string]: number; } = { };
  static PATH: any = 'settings/manage';

  constructor(private manageAccessService: ManageAccessService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar,
    public dialog: MatDialog, private auth: AuthService, public userService: UserService) {}

  ngOnInit() {
    this.manageAccessService.getUsers().subscribe(
      (data: any) => {
        this.userList = data;
        this.userList.forEach(element => {
          this.userDictionary[element.id] = element.access_level;
        });
      }
    );
  }

  changeAccessLevel(selectedUser: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { info: `Are you sure you want to change user with id: ` + selectedUser.id + ` current access level to `
      + selectedUser.access_level, cancelDialog: 'Cancel', confirmDialog: 'Continue' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userDictionary[selectedUser.id] = selectedUser.access_level;
        this.manageAccessService.changeAccessLevel(
          selectedUser.id,
          selectedUser.access_level
        ).subscribe(
          (data: any) => {
            const date = new Date();
            this.snackBar.open(`Changed access level for user ` + selectedUser.id + ` on:
            ${date.toLocaleDateString('en-US')} at:
            ${date.toLocaleTimeString('en-US')}`,
              'Dismiss', {
                duration: 5000,
              });
          },
          (error: any) => console.log(error)
        );
      } else {
        selectedUser.access_level = this.userDictionary[selectedUser.id];
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
