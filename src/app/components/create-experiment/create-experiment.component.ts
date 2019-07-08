import { DeviceExperimentService } from './../../services/device-experiment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';


@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
  static PATH: any = 'experiments/create';

  devices: any[] = [];
  experimentForm: FormGroup;
  submitted: boolean;

  constructor(private experimentService: ExperimentService, private deviceService: DeviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, public tooltipService: TooltipService,
    private snackBar: MatSnackBar, private deviceExperimentService: DeviceExperimentService) {

    this.route.queryParams.subscribe(params => {
      let deviceId = '';
      let description = '';
      let startTime = null;
      let notes = '';
      if (params['deviceId']) {
        deviceId = params['deviceId'];
      }
      if (params['description']) {
        description = params['description'];
      }
      if (params['startTime']) {
        startTime = moment(Number(params['startTime']));
      }
      if (params['notes']) {
        notes = params['notes'];
      }
      this.experimentForm = this.formBuilder.group({
        deviceId: new FormControl(deviceId),
        description: new FormControl(description, [Validators.required, Validators.maxLength(256)]),
        startTime: new FormControl(startTime, [Validators.required]),
        notes: new FormControl(notes, [Validators.maxLength(256)])
      })
    });
  }

  ngOnInit() {

    this.deviceService.listDevices().subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
  }

  updateRoute(): Promise<boolean> {
    return this.router.navigate(
      CreateExperimentComponent.PATH.split('/'), {
        queryParams: {
          deviceId: this.experimentForm.controls.deviceId.value,
          description: this.experimentForm.controls.description.value,
          startTime: this.experimentForm.controls.startTime.value ? this.experimentForm.controls.startTime.value.valueOf() : null,
          notes: this.experimentForm.controls.notes.value,
        }
      });
  }

  submit() {
    this.experimentService.createExperiment(
      this.experimentForm.controls.description.value,
      this.experimentForm.controls.inputTimestamp.value ? this.experimentForm.controls.inputTimestamp.value.valueOf() : null,
      this.experimentForm.controls.notes.value,
    ).subscribe(
      (data: any) => {
        this.snackBar.open('Created new experiment',
          'Dismiss', {
            duration: 5000,
          });
        for (let deviceId of this.experimentForm.controls.deviceId.value) {
          this.deviceExperimentService.createDeviceExperiment(deviceId, data.id).subscribe(
            (data: any) => console.log(`Linked device ${deviceId}`)
          );
        }
      },
      (error: any) => console.log(error)
    )
  }
}
