import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/classes/user';
import { MatSnackBar } from '@angular/material';
import { AppPaths } from 'src/app/app.paths';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {
  requestForm: FormGroup;
  submitted = false;

  constructor(public auth: AuthService, private formBuilder: FormBuilder, public userService: UserService,
  	           private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.requestForm = this.formBuilder.group(
      {
        requestedAccessLevel: new FormControl('', [Validators.required]),
        requestedReason: new FormControl('', [Validators.maxLength(256)]),
      },
    )
  }

  request() {
  	this.userService.requestAccessLevel(this.auth.getLoggedInUser()[0].id,
  		this.requestForm.controls.requestedAccessLevel.value).subscribe(
      (data: any) => {
        this.success_message();
      },
      (error: any) => {
        this.requestForm.controls.requestedAccessLevel.setErrors({Error: 'Invalid Request'});
      }
    );
  }

  success_message() {
  	this.snackBar.open(`Request sent`, 'Dismiss', {
            duration: 5000,
          });
  }

  getChangeEmailPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.CHANGE_EMAIL_PATH}`;
  }

  getSettingsPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.SETTINGS_PATH}`;
  }

  getManageAccessPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.MANAGE_ACCESS_PATH}`;
  }

}
