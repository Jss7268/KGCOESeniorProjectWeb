import { AppPaths } from './../../../app.paths';
import { DeviceExperimentService } from '../../../services/device-experiment.service';
import { OutputTypeService } from '../../../services/output-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { DeviceOutputService } from '../../../services/device-output.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TooltipService } from 'src/app/services/tooltip.service';
import { MatSnackBar } from '@angular/material';
import { ExperimentService } from 'src/app/services/experiment.service';

@Component({
  selector: 'app-create-device-output',
  templateUrl: './create-device-output.component.html',
  styleUrls: ['./create-device-output.component.css']
})
export class CreateDeviceOutputComponent implements OnInit {

  devices: any[] = [];
  experiments: any[] = [];
  outputTypes: any[] = [];
  deviceOutputForm: FormGroup;
  submitted: boolean;
  timestamp: number;
  experimentId: string;

  constructor(private deviceOutputService: DeviceOutputService, private deviceService: DeviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private deviceExperimentService: DeviceExperimentService,
    private router: Router, private outputTypeService: OutputTypeService, private tooltipService: TooltipService,
    private snackBar: MatSnackBar, private experimentService: ExperimentService) { }

  ngOnInit() {
    this.experimentId = this.experimentService.experimentId;
    this.onExperimentUpdate();
    this.experimentService.$experimentId.subscribe((experimentId) => {
      this.experimentId = experimentId;
      this.onExperimentUpdate();
    });

    this.route.queryParams.subscribe(params => {
      let deviceId = '';
      let outputTypeName = '';
      let outputValue = '';
      if (params['deviceId']) {
        deviceId = params['deviceId'];
      }
      if (params['outputTypeName']) {
        outputTypeName = params['outputTypeName'];
      }
      if (params['outputValue']) {
        outputValue = params['outputValue'];
      }
      this.deviceOutputForm = this.formBuilder.group({
        deviceId: new FormControl(deviceId, [Validators.required]),
        outputTypeName: new FormControl(outputTypeName, [Validators.required]),
        outputValue: new FormControl(outputValue, [Validators.required])
      })
    });

    this.outputTypeService.listOutputTypes().subscribe(
      (data: any) => this.outputTypes = data,
      (error: any) => console.log(error)
    );
  }

  onExperimentUpdate() {
    this.deviceExperimentService.listDevicesByExperiment(this.experimentId).subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
  }

  updateRoute(): Promise<boolean> {
    return this.router.navigate(
      [], {
        queryParams: {
          deviceId: this.deviceOutputForm.controls.deviceId.value,
          outputTypeName: this.deviceOutputForm.controls.outputTypeName.value,
          outputValue: this.deviceOutputForm.controls.outputValue.value,
        }
      });
  }

  submit() {
    let timestamp = new Date().getTime();
    this.deviceOutputService.createDeviceOutput(
      this.deviceOutputForm.controls.deviceId.value,
      this.experimentId,
      this.deviceOutputForm.controls.outputTypeName.value,
      this.deviceOutputForm.controls.outputValue.value,
      timestamp
    ).subscribe(
      (data: any) => {
        this.timestamp = timestamp;
        let date = new Date(timestamp);
        this.snackBar.open(`Created new output on:
        ${date.toLocaleDateString('en-US')} at:
        ${date.toLocaleTimeString('en-US')}`,
          'Dismiss', {
            duration: 5000,
          });
      },
      (error: any) => console.log(error)
    )
  }

  addOutputType() {
    let cb = `${this.route.parent.snapshot.url.join('/')}/${AppPaths.CREATE_DEVICE_OUTPUT_PATH}?deviceId=${this.deviceOutputForm.controls.deviceId.value}&outputValue=${this.deviceOutputForm.controls.outputValue.value}&outputTypeName=`;

    this.updateRoute().then((success: boolean) => {
      this.router.navigate(AppPaths.CREATE_NEW_DEVICE_PATH.split('/'), {
        queryParams: {
          callbackUrl: cb,
        }
      })
    });

  }

  addDeviceExperiment() {
    let cb = `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.CREATE_DEVICE_OUTPUT_PATH}?outputTypeName=${this.deviceOutputForm.controls.outputTypeName.value}&outputValue=${this.deviceOutputForm.controls.outputValue.value}&deviceId=`;

    this.updateRoute().then((success: boolean) => {
      this.router.navigate(AppPaths.CREATE_DEVICE_EXPERIMENT_PATH.split('/'), {
        queryParams: {
          callbackUrl: cb,
        },
        relativeTo: this.route.parent
      })
    }
    );
  }

}
