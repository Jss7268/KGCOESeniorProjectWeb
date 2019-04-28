import { Component, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';

@Component({
  selector: 'app-list-experiments',
  templateUrl: './list-experiments.component.html',
  styleUrls: ['./list-experiments.component.css']
})
export class ListExperimentsComponent implements OnInit {
  experiments: any[];

  constructor(experimentService: ExperimentService) { }

  ngOnInit() {
  }

}
