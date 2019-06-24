import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TooltipService } from 'src/app/services/tooltip.service';
import { DeviceExperimentService } from '../../../services/device-experiment.service';
import { DeviceService } from '../../../services/device.service';
import { ExperimentService } from '../../../services/experiment.service';

@Component({
  selector: 'app-create-device-experiment',
  templateUrl: './create-device-experiment.component.html',
  styleUrls: ['./create-device-experiment.component.css']
})
export class CreateDeviceExperimentComponent implements OnInit {
  devices: any = [];
  experiments: any = [];
  ngUnsubscribe = new Subject();
  deviceExperimentForm: FormGroup;
  submitted: boolean;
  @Input('callbackUrl') callbackUrl: string = '';
  static PATH: any = 'device-experiments/create';

  constructor(private deviceExperimentService: DeviceExperimentService, private deviceService: DeviceService,
    private experimentService: ExperimentService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private tooltipService: TooltipService) {

    this.route.queryParams.subscribe(params => {
      let deviceId = '';
      let experimentId = '';
      if (params['deviceId']) {
        deviceId = params['deviceId'];
      }
      if (params['experimentId']) {
        experimentId = params['experimentId'];
      }
      if (params['callbackUrl']) {
        this.callbackUrl = params['callbackUrl'];
      }

      this.deviceExperimentForm = this.formBuilder.group({
        deviceId: new FormControl(deviceId, [Validators.required]),
        experimentId: new FormControl(experimentId, [Validators.required])
      })
    });
  }

  ngOnInit() {

    this.deviceService.listDevices().subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
    this.experimentService.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    );
  }

  updateRoute() {
    this.router.navigate(
      CreateDeviceExperimentComponent.PATH.split('/'), {
        queryParams: {
          deviceId: this.deviceExperimentForm.controls.deviceId.value,
          experimentId: this.deviceExperimentForm.controls.experimentId.value,
        }
      });
  }

  submit() {
    this.submitted = true;
    if (this.deviceExperimentForm.invalid) {
      return;
    }
    this.deviceExperimentService.createDeviceExperiment(this.deviceExperimentForm.controls.deviceId.value, this.deviceExperimentForm.controls.experimentId.value)
      .subscribe(
        (data: any) => {
          this.router.navigateByUrl(this.callbackUrl + this.deviceExperimentForm.controls.experimentId.value);
        },
        (error: any) => {
          this.deviceExperimentForm.controls.experimentId.setErrors({ duplicate: 'Device is already linked to this experiment' });

        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }


}

