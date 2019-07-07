import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ManageAccessService } from './../../services/manage-access.service';
import { User } from 'src/app/classes/user';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SettingsComponent } from '../settings/settings.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  ngUnsubscribe = new Subject();
  displayedColumns: string[] = ['id', 'name', 'access_level'];
  userList: User[] = [];
  navLinks: any[];
  static PATH: any = 'settings/manage';

  constructor(private manageAccessService: ManageAccessService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {
      this.navLinks = [
        {
          label: 'Overview',
          link: '/' + SettingsComponent.PATH,
          index: 0
        }, {
          label: 'Change Email',
          link: '/' + ChangeEmailComponent.PATH,
          index: 1
        }, {
          label: 'Manage User Access Levels',
          link: '/' + ManageAccessComponent.PATH,
          index: 2
        }
      ];
    }

  ngOnInit() {
    this.manageAccessService.getUsers().subscribe(
      (data: any) => this.userList = data
    );
  }

  changeAccessLevel(id: string, access: string, event: any) {
    const accessLevel = event.target.textContent;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { info: `Are you sure you want to change user with id: ` + id + ` current access level to `
      + accessLevel, cancelDialog: 'Cancel', confirmDialog: 'Continue' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.manageAccessService.changeAccessLevel(
          id,
          accessLevel
        ).subscribe(
          (data: any) => {
            const date = new Date();
            this.snackBar.open(`Changed access level for user ` + id + ` on:
            ${date.toLocaleDateString('en-US')} at:
            ${date.toLocaleTimeString('en-US')}`,
              'Dismiss', {
                duration: 5000,
              });
          },
          (error: any) => console.log(error)
        );
      } else {
        event.target.textContent = access;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
