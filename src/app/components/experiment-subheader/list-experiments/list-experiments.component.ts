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

@Component({
  selector: 'app-list-experiments',
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
  templateUrl: './list-experiments.component.html',
  styleUrls: ['./list-experiments.component.css']
})
export class ListExperimentsComponent implements OnInit {
  static PATH = 'experiments';
  experiments: any[] = [];
  listExperimentsForm: FormGroup;
  downloadLink: string;
  downloadName: string;
  output_types: any[] = [];
  devices: any[] = [];
  @Input('experimentId') experimentId: string;

  constructor(private experimentService: ExperimentService, private deviceOutputService: DeviceOutputService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      let outputType = '';
      let user = '';
      if (params['outputType']) {
        outputType = params['outputType'];
      }
      if (params['user']) {
        user = params['user'];
      }
      let doUpdate;
      if (!this.listExperimentsForm || this.experimentId != this.listExperimentsForm.get('experimentId').value) {
        doUpdate = true;
      }
      this.listExperimentsForm = this.formBuilder.group({
        experimentId: new FormControl(this.experimentId, [Validators.required]),
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
    this.router.navigate([this.listExperimentsForm.get('experimentId').value, ListExperimentsComponent.PATH], {
      queryParams: {
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
        this.downloadLink = this.sanitizer.bypassSecurityTrustUrl(`data:text/plain;charset=utf-8, ${JSON.stringify(this.getDeviceOutputFields(data))}`) as string
        if (data.length > 0) {
          for (let obj of data) {
            this.containsOutputType({name: obj.output_type_name, output_type_id: obj.output_type_id}, this.output_types) ? {} : this.output_types.push({name: obj.output_type_name, output_type_id: obj.output_type_id});
            this.containsDevice({device_id: obj.device_id, name: obj.name}, this.devices) ? {} : this.devices.push({device_id: obj.device_id, name: obj.name});
          }
          this.downloadName = `${data[0].description}.json`;
        } else {
          this.downloadName = `${this.listExperimentsForm.get('experimentId').value}.json`;
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
