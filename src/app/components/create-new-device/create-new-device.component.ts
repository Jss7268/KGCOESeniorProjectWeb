import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-new-device',
  templateUrl: './create-new-device.component.html',
  styleUrls: ['./create-new-device.component.css']
})
export class CreateNewDeviceComponent implements OnInit {
  ngUnsubscribe = new Subject();
  createDeviceForm: FormGroup;
  submitted: boolean;
  static PATH: any = 'devices/create';

  constructor(private createDeviceService: DeviceService, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let name = '';
      let deviceId = '';

      if (params.name) {
        name = params.name;
      }
      if (params.id) {
        deviceId = params.id;
      }

      this.createDeviceForm = this.formBuilder.group({
        name: new FormControl(name, [Validators.required]),
        id: new FormControl(deviceId, [Validators.required]),
        password: new FormControl('', [Validators.required]),
      });
    });
  }

  submit() {
    this.submitted = true;
    if (this.createDeviceForm.invalid) {
      return;
    }

    const accessLevel = '1';
    this.createDeviceService.createDevice(
      this.createDeviceForm.controls.name.value,
      this.createDeviceForm.controls.id.value,
      this.createDeviceForm.controls.password.value,
      accessLevel
      ).subscribe(
        (data: any) => {
          const date = new Date();
          this.snackBar.open(`Created new device on:
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
