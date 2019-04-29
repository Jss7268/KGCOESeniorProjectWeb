import { DeviceExperimentService } from './../../services/device-experiment.service';
import { OutputTypeService } from './../../services/output-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from './../../services/device.service';
import { DeviceOutputService } from './../../services/device-output.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';

@Component({
  selector: 'app-create-device-output',
  templateUrl: './create-device-output.component.html',
  styleUrls: ['./create-device-output.component.css']
})
export class CreateDeviceOutputComponent implements OnInit {
  devices: any[];
  experiments: any[];
  outputTypes: any[];
  deviceOutputForm: FormGroup;
  submitted: boolean;
  timestamp: number;
  id: string;

  constructor(private deviceOutputService: DeviceOutputService, private deviceService: DeviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private deviceExperimentService: DeviceExperimentService,
    private router: Router, private outputTypeService: OutputTypeService) {
    let deviceId = '';
    let experimentId = '';
    let outputTypeName = '';
    let outputValue = '';
    this.route.queryParams.subscribe(params => {
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
    });
    console.log(outputValue);
    this.deviceOutputForm = this.formBuilder.group({
      deviceId: new FormControl(deviceId, [Validators.required]),
      experimentId: new FormControl(experimentId, [Validators.required]),
      outputTypeName: new FormControl(outputTypeName, [Validators.required]),
      outputValue: new FormControl(outputValue, [Validators.required])
    })
  }

  onDeviceIdUpdate() {
    this.deviceExperimentService.listByDevice(this.deviceOutputForm.controls.deviceId.value).subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    );
    this.updateRoute();
  }

  updateRoute() {
    this.router.navigate(
      ['/device-outputs/create'], {
        queryParams: {
          deviceId: this.deviceOutputForm.controls.deviceId.value,
          experimentId: this.deviceOutputForm.controls.experimentId.value,
          outputTypeName: this.deviceOutputForm.controls.outputTypeName.value,
          outputValue: this.deviceOutputForm.controls.outputValue.value,
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

  submit() {
    let timestamp = new Date().getMilliseconds();
    this.deviceOutputService.createDeviceOuput(
      this.deviceOutputForm.controls.deviceId.value,
      this.deviceOutputForm.controls.experimentId.value,
      this.deviceOutputForm.controls.outputTypeName.value,
      this.deviceOutputForm.controls.outputValue.value,
      timestamp
      ).subscribe(
        (data: any) => {
          this.timestamp = timestamp;
          this.id = data.id
        },
        (error: any) => console.log(error)
      )
  }

  getCallbackUrl() {
    return '/device-outputs/create?deviceId=' +
          this.deviceOutputForm.controls.deviceId.value + '&experimentId=' + 
          this.deviceOutputForm.controls.experimentId.value + '&outputValue=' +
          this.deviceOutputForm.controls.outputValue.value + '&outputTypeName=';
  }

  addOutputType() {
    this.router.navigate(['/output-types/create'], {
      queryParams: {
        callbackUrl: this.getCallbackUrl()
      }
    })
  }

  addDeviceExperiment() {
    this.router.navigate(['/devices-experiments/create'], {
      queryParams: {
        callbackUrl: this.getCallbackUrl()
      }
    })
  }

}
