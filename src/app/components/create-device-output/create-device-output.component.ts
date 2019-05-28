import { DeviceExperimentService } from './../../services/device-experiment.service';
import { OutputTypeService } from './../../services/output-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from './../../services/device.service';
import { DeviceOutputService } from './../../services/device-output.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(private deviceOutputService: DeviceOutputService, private deviceService: DeviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private deviceExperimentService: DeviceExperimentService,
    private router: Router, private outputTypeService: OutputTypeService, private tooltipService: TooltipService,
    private snackBar: MatSnackBar) {

    this.route.queryParams.subscribe(params => {
      let deviceId = '';
      let experimentId = '';
      let outputTypeName = '';
      let outputValue = '';
      if (params['deviceId']) {
        deviceId = params['deviceId'];
      }
      if (params['experimentId']) {
        experimentId = params['experimentId'];
      }
      if (params['outputTypeName']) {
        outputTypeName = params['outputTypeName'];
      }
      if (params['outputValue']) {
        outputValue = params['outputValue'];
      }
      let doUpdate;
      if (!this.deviceOutputForm || deviceId != this.deviceOutputForm.get('deviceId').value){
        doUpdate = true;
      }
      this.deviceOutputForm = this.formBuilder.group({
        deviceId: new FormControl(deviceId, [Validators.required]),
        experimentId: new FormControl(experimentId, [Validators.required]),
        outputTypeName: new FormControl(outputTypeName, [Validators.required]),
        outputValue: new FormControl(outputValue, [Validators.required])
      })
      if (doUpdate) {
        this.onDeviceIdUpdate();
      }
    });

  }

  ngOnInit() {

    this.deviceService.listDevices().subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
    this.outputTypeService.listOutputTypes().subscribe(
      (data: any) => this.outputTypes = data,
      (error: any) => console.log(error)
    );
  }

  onDeviceIdUpdate() {
    if (this.deviceOutputForm.get('deviceId').value) {
      this.deviceExperimentService.listByDevice(this.deviceOutputForm.controls.deviceId.value).subscribe(
        (data: any) => this.experiments = data,
        (error: any) => console.log(error)
      );
    } else {
      this.experiments = [];
    }
    this.updateRoute();
  }

  updateRoute(): Promise<boolean> {
    return this.router.navigate(
      ['/device-outputs/create'], {
        queryParams: {
          deviceId: this.deviceOutputForm.controls.deviceId.value,
          experimentId: this.deviceOutputForm.controls.experimentId.value,
          outputTypeName: this.deviceOutputForm.controls.outputTypeName.value,
          outputValue: this.deviceOutputForm.controls.outputValue.value,
        }
      });
  }

  submit() {
    let timestamp = new Date().getTime();
    this.deviceOutputService.createDeviceOutput(
      this.deviceOutputForm.controls.deviceId.value,
      this.deviceOutputForm.controls.experimentId.value,
      this.deviceOutputForm.controls.outputTypeName.value,
      this.deviceOutputForm.controls.outputValue.value,
      timestamp
    ).subscribe(
      (data: any) => {
        this.timestamp = timestamp;
        let date = new Date(timestamp);
        this.snackBar.open('Created new output on: ' +
          date.toLocaleDateString('en-US') + ' at: ' +
          date.toLocaleTimeString('en-US'),
          'Dismiss', {
            duration: 5000,
          });
      },
      (error: any) => console.log(error)
    )
  }

  addOutputType() {
    this.updateRoute().then((success: boolean) => {
      this.router.navigate(['/output-types/create'], {
        queryParams: {
          callbackUrl: '/device-outputs/create?deviceId=' +
            this.deviceOutputForm.controls.deviceId.value + '&experimentId=' +
            this.deviceOutputForm.controls.experimentId.value + '&outputValue=' +
            this.deviceOutputForm.controls.outputValue.value + '&outputTypeName=',
        }
      })
    });

  }

  addDeviceExperiment() {
    this.updateRoute().then((success: boolean) => {
      this.router.navigate(['/devices-experiments/create'], {
        queryParams: {
          deviceId: this.deviceOutputForm.controls.deviceId.value,
          callbackUrl: '/device-outputs/create?deviceId=' +
            this.deviceOutputForm.controls.deviceId.value + '&outputTypeName=' +
            this.deviceOutputForm.controls.outputTypeName.value + '&outputValue=' +
            this.deviceOutputForm.controls.outputValue.value + '&experimentId=',
        }
      })
    }
    );
  }

}
