import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceOutputService } from 'src/app/services/device-output.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private experimentService: ExperimentService, private deviceOutputService: DeviceOutputService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      let experimentId = '';
      if (params['experimentId']) {
        experimentId = params['experimentId'];
      }
      let doUpdate;
      if (!this.listExperimentsForm || experimentId != this.listExperimentsForm.get('experimentId').value) {
        doUpdate = true;
      }
      this.listExperimentsForm = this.formBuilder.group({
        experimentId: new FormControl(experimentId, [Validators.required]),
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
        experimentId: this.listExperimentsForm.get('experimentId').value
      }
    }).then(
      (success: boolean) => this.onChange()
    );
  }

  onChange() {
    //var test = document.getElementById('test') as HTMLSelectElement;
    this.deviceOutputService.listByExperiment(this.listExperimentsForm.get('experimentId').value).subscribe(
      (data: any) => this.downloadLink = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;charset=utf-8,' + JSON.stringify(data)) as string,
      (error: any) => console.log(error)
    );
    this.downloadName = this.listExperimentsForm.get('experimentId').value + '.json';
  }
}
