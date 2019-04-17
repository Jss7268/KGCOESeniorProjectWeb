import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  private expData: any;
  private myFunction: any;

  constructor(private svc: ExperimentService) { }

  ngOnInit() {
    this.expData = this.svc.getExperiments(-1);
  }

  downloadCSV() {
    var test = document.getElementById('test');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(this.svc.getExperiments(test.options.selectedIndex)));
    element.setAttribute('download', "some_csv.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
   };

}
