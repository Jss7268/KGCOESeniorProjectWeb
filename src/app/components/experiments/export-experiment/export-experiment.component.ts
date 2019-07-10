import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceOutputService } from 'src/app/services/device-output.service';
import { ExperimentService } from 'src/app/services/experiment.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-export-experiment',
  animations: [
    trigger('showInputAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-58px)', opacity: 0, height: 0 }),
        animate('100ms', style({ transform: 'translateY(0)', opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1, height: '*' }),
        animate('100ms', style({ transform: 'translateY(-58px)', opacity: 0, height: 0 }))
      ])
    ])
  ],
  templateUrl: './export-experiment.component.html',
  styleUrls: ['./export-experiment.component.css']
})
export class ExportExperimentComponent implements OnInit {
  downloadLink: string;
  downloadName: string;
  outputTypes: any[] = [];
  devices: any[] = [];
  experimentId: string;
  device: string;
  outputType: string;

  constructor(private experimentService: ExperimentService, private deviceOutputService: DeviceOutputService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.experimentId = this.experimentService.experimentId;
    this.onExperimentUpdate();
    this.experimentService.$experimentId.subscribe((experimentId) => {
      this.experimentId = experimentId;
      this.onExperimentUpdate();
      this.updateRoute();

    })
    this.route.queryParams.subscribe((queryParams) => {
      this.updateForm(queryParams);
    });

  }

  updateForm(queryParams) {
    let outputType = '';
    let device = '';
    if (queryParams['outputType']) {
      outputType = queryParams['outputType'];
    }
    if (queryParams['device']) {
      device = queryParams['device'];
    }
    this.device = device;
    this.outputType = outputType;
  }

  updateRoute() {
    this.router.navigate([], {
      queryParams: {
        outputType: this.outputType,
        device: this.device
      }
    });
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

  onExperimentUpdate() {
    this.updateForm([]);
    this.downloadName = `${this.experimentId}.json`;
    this.deviceOutputService.listByQuery(this.experimentId, this.outputType, this.device).subscribe(
      (data: any) => {
        this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(`data:text/plain;charset=utf-8, ${JSON.stringify(this.getDeviceOutputFields(data))}`) as string
        this.devices = [];
        this.outputTypes = [];
        if (data.length > 0) {
          for (let obj of data) {
            this.containsOutputType({ name: obj.output_type_name, output_type_id: obj.output_type_id }, this.outputTypes) ? {} : this.outputTypes.push({ name: obj.output_type_name, output_type_id: obj.output_type_id });
            this.containsDevice({ device_id: obj.device_id, name: obj.name }, this.devices) ? {} : this.devices.push({ device_id: obj.device_id, name: obj.name });
          }
          this.downloadName = `${data[0].description}.json`;
        } else {
          this.downloadName = `${this.experimentId}.json`;
        }
      },
      (error: any) => console.log(error)
    );
  }

  getDownloadLink() {
    return this.deviceOutputService.getAuthorizedQueryUrl(this.experimentId, this.outputType, this.device);
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

  containsOutputType(outputType, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].name === outputType.name && list[i].output_type_id === outputType.output_type_id) {
        return true;
      }
    }

    return false;
  }
}
