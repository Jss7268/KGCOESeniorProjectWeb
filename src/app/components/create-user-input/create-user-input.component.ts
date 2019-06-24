import { DeviceExperimentService } from './../../services/device-experiment.service';
import { CreateDeviceExperimentComponent } from './../create-device-experiment/create-device-experiment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { UserInputsService } from 'src/app/services/user-inputs.service';
import { TooltipService } from 'src/app/services/tooltip.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-user-input',
  templateUrl: './create-user-input.component.html',
  styleUrls: ['./create-user-input.component.css']
})
export class CreateUserInputComponent implements OnInit {

  devices: any[] = [];
  originalDevices: any[] = [];
  userInputs: any[] = [];
  experiments: any[] = [];
  deviceExperiments: any[] = [];
  userInputForm: FormGroup;
  submitted: boolean;
  timestamp: number;

  static PATH: any = 'user-inputs/create';
  constructor(private userInputService: UserInputsService, private deviceService: DeviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private experimentService: ExperimentService, 
    private deviceExperimentService: DeviceExperimentService,
    private router: Router, private tooltipService: TooltipService,
    private snackBar: MatSnackBar) { 
      
      this.route.queryParams.subscribe(params => {
        let deviceId = '';
        let experimentId = '';
        let description =  '';
        let inputTimestamp = null;
        if(params['deviceId']) {
          deviceId = params['deviceId'];
        }
        if (params['experimentId']) {
          experimentId = params['experimentId'];
        }
        if (params['inputTimestamp']){
          inputTimestamp = new Date(Number(params['inputTimestamp']));
        }

        this.userInputForm = this.formBuilder.group({
          description: new FormControl(description, [Validators.required]),
          deviceId: new FormControl(deviceId, [Validators.required]),
          experimentId: new FormControl(experimentId, [Validators.required]),
          inputTimestamp: new FormControl(inputTimestamp),
        })
      })
  }

  ngOnInit() {
    this.deviceService.listDevices().subscribe(
      (data: any) => this.originalDevices = data,
      (error: any) => console.log(error)
    );
    this.devices = this.originalDevices;
    this.experimentService.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    );
  }

  updateRoute(): Promise<boolean> {
    return this.router.navigate(
      [CreateUserInputComponent.PATH], {
        queryParams: {
          description: this.userInputForm.controls.description.value,
          deviceId: this.userInputForm.controls.deviceId.value,
          experimentId: this.userInputForm.controls.experimentId.value,
          inputTimestamp: new Date().getTime(),
        }
      });
  }

  resetForm() {
    this.userInputForm.reset();
  }

  //this will probably be discarded when merged with experiment centric view
  onExperimentUpdate() {
    if (this.userInputForm.get('experimentId').value) {
      this.deviceExperimentService.listDevicesByExperiment(this.userInputForm.controls.experimentId.value).subscribe(
        (data: any) => data.length > 0 ? this.devices = data : this.devices = this.originalDevices,
        (error: any) => console.log(error)
      );
    }
    this.updateRoute();
  }

  addDeviceExperiment() {
    let cb = `${CreateUserInputComponent.PATH}?experimentId=${this.userInputForm.controls.experimentId.value}&description=${this.userInputForm.controls.description.value}&inputTimestamp=${this.userInputForm.controls.inputTimestamp.value}&deviceId=`;

    this.updateRoute().then((success: boolean) => {
      this.router.navigate([CreateDeviceExperimentComponent.PATH], {
        queryParams: {
          experimentId: this.userInputForm.controls.experimentId.value,
          callbackUrl: cb,
        }
      })
    }
    );
  }

  submit() {
    this.userInputService.createUserInput(
      this.userInputForm.controls.deviceId.value,
      this.userInputForm.controls.description.value,
      this.userInputForm.controls.experimentId.value,
      this.userInputForm.controls.inputTimestamp.value ? this.userInputForm.controls.inputTimestamp.value : null,
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
