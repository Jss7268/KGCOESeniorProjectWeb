import { DeviceExperimentService } from '../../../services/device-experiment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { UserInputsService } from 'src/app/services/user-inputs.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import { MatSnackBar } from '@angular/material';
import { Experiment } from 'src/app/classes/experiment';
import { Device } from 'src/app/classes/device';
import { CreateDeviceExperimentComponent } from '../create-device-experiment/create-device-experiment.component';
import * as moment from 'moment';

@Component({
  selector: 'app-create-user-input',
  templateUrl: './create-user-input.component.html',
  styleUrls: ['./create-user-input.component.css']
})
export class CreateUserInputComponent implements OnInit {

  devices: Device[] = [];
  userInputs: any[] = [];
  experiments: Experiment[] = [];
  deviceExperiments: any[] = [];
  userInputForm: FormGroup;
  submitted: boolean;
  timestamp: number;
  experimentId: string;

  static PATH: any = 'user-inputs/create';

  constructor(private userInputService: UserInputsService, private deviceService: DeviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private experimentService: ExperimentService,
    private deviceExperimentService: DeviceExperimentService,
    private router: Router, private tooltipService: TooltipService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.experimentId = this.experimentService.experimentId;
    this.onExperimentUpdate();

    this.experimentService.$experimentId.subscribe((experimentId) => {
      this.experimentId = experimentId;
      this.onExperimentUpdate();
    });


    this.route.queryParams.subscribe(params => {
      let deviceId = '';
      let description = '';
      let inputTimestamp = null;
      if (params['deviceId']) {
        deviceId = params['deviceId'];
      }
      if (params['inputTimestamp']) {
        inputTimestamp = moment(Number(params['inputTimestamp']));
      }

      this.userInputForm = this.formBuilder.group({
        description: new FormControl(description, [Validators.required]),
        deviceId: new FormControl(deviceId, [Validators.required]),
        inputTimestamp: new FormControl(inputTimestamp),
      })
    })
  }

  updateRoute(): Promise<boolean> {
    return this.router.navigate(
      [], {
        queryParams: {
          description: this.userInputForm.controls.description.value,
          deviceId: this.userInputForm.controls.deviceId.value,
          inputTimestamp: this.userInputForm.controls.inputTimestamp ? this.userInputForm.controls.inputTimestamp.valueOf() : null,
        }
      });
  }

  resetForm() {
    this.userInputForm.reset();
  }

  //this will probably be discarded when merged with experiment centric view
  onExperimentUpdate() {
    this.deviceExperimentService.listDevicesByExperiment(this.experimentId).subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
  }

  addDeviceExperiment() {
    let cb = `/${this.route.parent.snapshot.url.join('/')}/${CreateUserInputComponent.PATH}?description=${this.userInputForm.controls.description.value}&inputTimestamp=${this.userInputForm.controls.inputTimestamp.value}&deviceId=`;

    this.updateRoute().then((success: boolean) => {
      this.router.navigate(CreateDeviceExperimentComponent.PATH.split('/'), {
        queryParams: {
          callbackUrl: cb,
        },
        relativeTo: this.route.parent
      })
    }
    );
  }

  submit() {
    this.userInputService.createUserInput(
      this.userInputForm.controls.deviceId.value,
      this.userInputForm.controls.description.value,
      this.experimentId,
      this.userInputForm.controls.inputTimestamp.value ? this.userInputForm.controls.inputTimestamp.value.valueOf() : null,
    ).subscribe((data: any) => {
      this.snackBar.open('Created new user input',
        'Dismiss', {
          duration: 5000,
        });
      this.resetForm();
    },
      (error: any) => console.log(error)
    )
  }

}
