import { Component, OnInit } from '@angular/core';
import { Experiment } from 'src/app/classes/experiment';
import { ExperimentService } from 'src/app/services/experiment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExportExperimentComponent } from '../export-experiment/export-experiment.component';

@Component({
  selector: 'app-experiment-subheader',
  templateUrl: './experiment-subheader.component.html',
  styleUrls: ['./experiment-subheader.component.css']
})
export class ExperimentSubheaderComponent implements OnInit {
  listExperimentsPath = ExportExperimentComponent.PATH;
  experiments: Experiment[];
  selectedExperiment: string;
  constructor(private experimentService: ExperimentService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['experimentId']) {
        this.selectedExperiment = params['experimentId'];
      }
    })
    this.experimentService.listExperiments().subscribe((data: any) => {
      this.experiments = data;
    });
  }

  onExperimentChange() {
    this.experimentService.selectedExperiment = this.selectedExperiment;
    this.router.navigate(['experiment', this.selectedExperiment, this.route.firstChild.snapshot.url.toString()]);
  }

}
