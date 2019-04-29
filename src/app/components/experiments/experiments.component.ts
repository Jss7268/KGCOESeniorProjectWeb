import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../../services/experiment.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  private expData: any;
  private selectedExperiment: any;
  private downloadLink: string;
  private downloadName: string;

  constructor(private svc: ExperimentService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.expData = this.svc.getExperiments("-1");
  }

  onChange() {
    //var test = document.getElementById('test') as HTMLSelectElement;
    //this.downloadLink = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;charset=utf-8,' + JSON.stringify(this.svc.getExperiments(test.options.selectedIndex.toString()))) as string;
    //this.downloadName = this.svc.getExperiments(test.options.selectedIndex.toString()).name;
  }
}
