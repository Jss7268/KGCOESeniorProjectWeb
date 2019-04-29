import { Component, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceOutputService } from 'src/app/services/device-output.service';

@Component({
  selector: 'app-list-experiments',
  templateUrl: './list-experiments.component.html',
  styleUrls: ['./list-experiments.component.css']
})
export class ListExperimentsComponent implements OnInit {
  experiments: any[] = [];
  selectedExperiment: any;
  downloadLink: string;
  downloadName: string;

  constructor(private experimentService: ExperimentService, private deviceOutputService: DeviceOutputService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.experimentService.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    )
  }

  onChange() {
    //var test = document.getElementById('test') as HTMLSelectElement;
    this.deviceOutputService.listByExperiment(this.selectedExperiment).subscribe(
      (data: any) => this.downloadLink = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;charset=utf-8,' + JSON.stringify(data)) as string,
      (error: any) => console.log(error)
    );
    this.downloadName = this.selectedExperiment + '.json';
  }
}
