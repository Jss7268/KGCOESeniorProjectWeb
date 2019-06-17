import { DeviceExperimentService } from './../../services/device-experiment.service';
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
        let description: '';
        let inputTimestamp: '';
        if(params['deviceId']) {
          deviceId = params['deviceId'];
        }
        if (params['experimentId']) {
          experimentId = params['experimentId'];
        }

        this.userInputForm = this.formBuilder.group({
          description: new FormControl(description, [Validators.required]),
          deviceId: new FormControl(deviceId, [Validators.required]),
          experimentId: new FormControl(experimentId, [Validators.required]),
          inputTimestamp: new FormControl(inputTimestamp, [Validators.maxLength(256)]),
        })
      })
  }

  ngOnInit() {
    this.deviceService.listDevices().subscribe(
      (data: any) => this.devices = data,
      (error: any) => console.log(error)
    );
    this.deviceExperimentService.listDevicesExperiments().subscribe(
      (data: any) => this.deviceExperiments = data,
      (error: any) => console.log(error)
    );
    this.experimentService.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    );
    this.userInputService.listUserInputs().subscribe(
      (data: any) => this.userInputs = data,
      (error: any) => console.log(error) );
  }

  submit() {
    this.userInputService.createUserInput(
      this.userInputForm.controls.deviceId.value,
      this.userInputForm.controls.description.value,
      this.userInputForm.controls.experimentId.value,
      this.userInputForm.controls.inputTimestamp.value ? this.userInputForm.controls.inputTimestamp.value.getTime() : new Date().getTime(),
    ).subscribe((data: any) => {
      this.snackBar.open('Created new user input',
        'Dismiss', {
          duration: 5000,
        });

      },
      (error: any) => console.log(error)
    )
  }

}
