import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { ChangeEmailService } from './../../services/change-email.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
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
  $currentUser: Subscription;
  static PATH: any = 'settings/email';

  constructor(private changeEmailService: ChangeEmailService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.$currentUser) {
        this.$currentUser.unsubscribe();
      }

      if (!params.email) {
        this.createFormGroup('');
        this.$currentUser = this.changeEmailService.getCurrentUser().subscribe(
          (data: any) => {
            this.createFormGroup(data.email);
          },
          (error: any) => console.log(error)
        );
      } else {
        this.createFormGroup(params.email);
      }
    });
  }

  createFormGroup(email: string) {
    this.createEmailForm = this.formBuilder.group({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
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
