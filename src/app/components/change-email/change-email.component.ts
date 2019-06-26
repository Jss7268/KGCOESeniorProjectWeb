import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { ChangeEmailService } from './../../services/change-email.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  ngUnsubscribe = new Subject();
  createEmailForm: FormGroup;
  submitted: boolean;
  static PATH: any = 'settings/email';

  constructor(private changeEmailService: ChangeEmailService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let currentEmail = '';
      let newEmail = '';
      let confirmNewEmail = '';
      let password = '';

      if (params.currentEmail) {
        this.changeEmailService.getCurrentUser().subscribe(
          (data: any) => currentEmail = data['email'],
          (error: any) => console.log(error)
        );
      }
      if (params.newEmail) {
        newEmail = params.newEmail;
      }
      if (params.confirmNewEmail) {
        confirmNewEmail = params.confirmNewEmail;
      }
      if (params.password) {
        password = params.password;
      }

      this.createEmailForm = this.formBuilder.group({
        currentEmail: new FormControl(currentEmail),
        newEmail: new FormControl(newEmail, [Validators.required]),
        confirmNewEmail: new FormControl(confirmNewEmail, [Validators.required]),
        password: new FormControl(password, [Validators.required])
      });
    });
  }

  submit() {
    this.submitted = true;
    if (this.createEmailForm.invalid) {
      return;
    }

    this.changeEmailService.changeEmail(
      'b4eb45a3-63fc-414b-8112-e6c2569596ea',
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
