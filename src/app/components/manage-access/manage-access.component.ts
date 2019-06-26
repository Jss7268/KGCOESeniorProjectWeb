import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  ngUnsubscribe = new Subject();
  static PATH: any = 'settings/manage';

  constructor(public auth: AuthService, private formBuilder: FormBuilder, public userService: UserService,
  	private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

}
