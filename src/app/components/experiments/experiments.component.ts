import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../../services/experiment.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  experiments: any[] = [];
  selectedExperiment: any;
  downloadLink: string;
  downloadName: string;

  constructor(private svc: ExperimentService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.svc.listExperiments().subscribe(
      (data: any) => this.experiments = data,
      (error: any) => console.log(error)
    )
  }

  onChange() {
    //var test = document.getElementById('test') as HTMLSelectElement;
    this.svc.getExperiment(this.selectedExperiment).subscribe(
      (data: any) => this.downloadLink = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;charset=utf-8,' + JSON.stringify(data)) as string,
      (error: any) => console.log(error)
    );
    this.downloadName = this.selectedExperiment + '.json';
  }
}
