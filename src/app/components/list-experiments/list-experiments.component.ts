import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceOutputService } from 'src/app/services/device-output.service';
import { ExperimentService } from 'src/app/services/experiment.service';

@Component({
  selector: 'app-list-experiments',
  templateUrl: './list-experiments.component.html',
  styleUrls: ['./list-experiments.component.css']
})
export class ListExperimentsComponent implements OnInit {
  static path = 'experiments';
  experiments: any[] = [];
  listExperimentsForm: FormGroup;
  downloadLink: string;
  downloadName: string;
  output_types: any[] = [];
  devices: any[] = [];

  constructor(private experimentService: ExperimentService, private deviceOutputService: DeviceOutputService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      let experimentId = '';
      let outputType = '';
      let user = '';
      if (params['experimentId']) {
        experimentId = params['experimentId'];
      }
      if (params['outputType']) {
        outputType = params['outputType'];
      }
      if (params['user']) {
        user = params['user'];
      }
      let doUpdate;
      if (!this.listExperimentsForm || experimentId != this.listExperimentsForm.get('experimentId').value) {
        doUpdate = true;
      }
      this.listExperimentsForm = this.formBuilder.group({
        experimentId: new FormControl(experimentId, [Validators.required]),
        outputType: new FormControl(outputType),
        user: new FormControl(user)
      })
      if (doUpdate && this.listExperimentsForm.get('experimentId').value) {
        this.updateRoute();
      }
    });
  }

  ngOnInit() {
    this.experimentService.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    )
  }

  updateRoute() {
    this.router.navigate([ListExperimentsComponent.path], {
      queryParams: {
        experimentId: this.listExperimentsForm.get('experimentId').value,
        outputType: this.listExperimentsForm.get('outputType').value,
        user: this.listExperimentsForm.get('user').value
      }
    }).then(
      (success: boolean) => this.onChange()
    );
  }

  getDeviceOutputFields(data) {
    let list = [];
    for (let output of data) {
      list.push({
        device_name: output.name,
        output_type_name: output.output_type_name,
        output_value: output.output_value,
        units: output.units,
        timestamp: output.timestamp
      })
    }
    return list;
  }

  onChange() {
    this.deviceOutputService.listByExperiment(this.listExperimentsForm.get('experimentId').value, this.listExperimentsForm.get('outputType').value, this.listExperimentsForm.get('user').value).subscribe(
      (data: any) => {
        this.downloadLink = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;charset=utf-8,' + JSON.stringify(this.getDeviceOutputFields(data))) as string
        if (data.length > 0) {
          for (let obj of data) {
            this.output_types.indexOf(obj.output_type_name) === -1 ? this.output_types.push(obj.output_type_name) : {};
            this.containsDevice({device_id: obj.device_id, name: obj.name}, this.devices) ? {} : this.devices.push({device_id: obj.device_id, name: obj.name});
          }
          this.downloadName = data[0].description + '.json';
        } else {
          this.downloadName = this.listExperimentsForm.get('experimentId').value + '.json';
        }
      },
      (error: any) => console.log(error)
    );
  }

  containsDevice(device, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name === device.name && list[i].device_id === device.device_id) {
            return true;
        }
    }

    return false;
  }
}
