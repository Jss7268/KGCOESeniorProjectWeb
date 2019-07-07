import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { ChangeEmailService } from './../../services/change-email.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { SettingsComponent } from '../settings/settings.component';
import { ManageAccessComponent } from '../manage-access/manage-access.component';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  ngUnsubscribe = new Subject();
  createEmailForm: FormGroup;
  submitted: boolean;
  $currentUser: Subscription;
  static PATH: any = 'settings/email';
  navLinks: any[];

  userInfo = '';
  userId = '';

  constructor(private changeEmailService: ChangeEmailService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private snackBar: MatSnackBar, private auth: AuthService) {
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
    this.route.queryParams.subscribe(params => {
      let newEmail = '';
      let password = '';

      this.changeEmailService.getCurrentUser().subscribe(
        (data: any) => this.userId = data.id
      );

      if (this.$currentUser) {
        this.$currentUser.unsubscribe();
      }

      if (!params.currentEmail) {
        this.createFormGroup('');
        this.$currentUser = this.changeEmailService.getCurrentUser().subscribe(
          (data: any) => {
            this.createFormGroup(data.email);
          },
          (error: any) => console.log(error)
        );
      } else {
        this.createFormGroup(params.currentEmail);
      }

      if (params.newEmail) {
        newEmail = params.newEmail;
      }
      if (params.password) {
        password = params.password;
      }
    });
  }

  createFormGroup(currentEmail: string) {
    this.createEmailForm = this.formBuilder.group({
      currentEmail: new FormControl(currentEmail),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.$currentUser = this.changeEmailService.getCurrentUser().subscribe(
      (data: any) => {
        this.userId = data.id;
      },
      (error: any) => console.log(error)
    );

    this.submitted = true;
    if (this.createEmailForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { info: `Are you sure you want to change your email?`, cancelDialog: 'Cancel', confirmDialog: 'Continue' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.changeEmailService.changeEmail(
          this.userId,
          this.createEmailForm.controls.newEmail.value
          ).subscribe(
            (data: any) => {
              const date = new Date();
              this.snackBar.open(`Changed email on:
              ${date.toLocaleDateString('en-US')} at:
              ${date.toLocaleTimeString('en-US')}`,
                'Dismiss', {
                  duration: 5000,
                });
            },
            (error: any) => console.log(error)
          );
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
