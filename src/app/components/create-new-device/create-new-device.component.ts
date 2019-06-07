import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-new-device',
  templateUrl: './create-new-device.component.html',
  styleUrls: ['./create-new-device.component.css']
})
export class CreateNewDeviceComponent implements OnInit {
  ngUnsubscribe = new Subject();
  createDeviceForm: FormGroup;
  submitted: boolean;

  constructor(private createDeviceService: UserService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

}
