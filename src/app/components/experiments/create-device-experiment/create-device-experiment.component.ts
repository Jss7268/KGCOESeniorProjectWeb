import { AppPaths } from 'src/app/app.paths';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TooltipService } from 'src/app/services/tooltip.service';
import { DeviceExperimentService } from '../../../services/device-experiment.service';
import { DeviceService } from '../../../services/device.service';
import { ExperimentService } from '../../../services/experiment.service';
import { MatSnackBar } from '@angular/material';

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
  experimentId: string;
  @Input('callbackUrl') callbackUrl: string = '';

  constructor(private deviceExperimentService: DeviceExperimentService, private deviceService: DeviceService,
    private experimentService: ExperimentService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public tooltipService: TooltipService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.experimentId = this.experimentService.experimentId;
    this.experimentService.$experimentId.subscribe((experimentId) => {
      this.experimentId = experimentId;
      this.onExperimentUpdate();
    });

    this.route.queryParams.subscribe(params => {
      let deviceId = '';
      if (params['deviceId']) {
        deviceId = params['deviceId'];
      }
      if (params['callbackUrl']) {
        this.callbackUrl = params['callbackUrl'];
      }

      this.deviceExperimentForm = this.formBuilder.group({
        deviceId: new FormControl(deviceId, [Validators.required]),
      })
    });

    this.deviceService.listDevices().subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
    this.experimentService.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    );
  }

  onExperimentUpdate() {
    this.callbackUrl = null;
  }

  updateRoute() {
    this.router.navigate(
      AppPaths.CREATE_DEVICE_EXPERIMENT_PATH.split('/'), {
        queryParams: {
          deviceId: this.deviceExperimentForm.controls.deviceId.value,
        }
      });
  }

  submit() {
    this.submitted = true;
    if (this.deviceExperimentForm.invalid) {
      return;
    }
    this.deviceExperimentService.createDeviceExperiment(this.deviceExperimentForm.controls.deviceId.value, this.experimentId)
      .subscribe(
        (data: any) => {
          if (this.callbackUrl) {
            this.router.navigateByUrl(this.callbackUrl + this.deviceExperimentForm.controls.deviceId.value);
          } else {
            this.snackBar.open(`Device linked to experiment`,
              'Dismiss', {
                duration: 5000,
              });
          }
        },
        (error: any) => {
          this.deviceExperimentForm.controls.deviceId.setErrors({ duplicate: 'Device is already linked to this experiment' });
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }


}

