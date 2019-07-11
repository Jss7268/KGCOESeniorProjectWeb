import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { ChangeEmailService } from './../../services/change-email.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { AppPaths } from 'src/app/app.paths';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  ngUnsubscribe = new Subject();
  changeEmailForm: FormGroup;
  submitted: boolean;
  $currentUser: Subscription;

  userId = '';

  constructor(private changeEmailService: ChangeEmailService, private userService: UserService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
              private snackBar: MatSnackBar, private auth: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let newEmail = '';
      let password = '';

      if (this.$currentUser) {
        this.$currentUser.unsubscribe();
      }

      if (!params.currentEmail) {
        this.createFormGroup('');
        this.$currentUser = this.userService.getCurrentUser().subscribe(
          (data: any) => {
            this.userId = data.id;
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
    this.changeEmailForm = this.formBuilder.group({
      currentEmail: new FormControl({value: currentEmail, disabled: true}),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.submitted = true;
    if (this.changeEmailForm.invalid) {
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
          this.changeEmailForm.controls.newEmail.value
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
