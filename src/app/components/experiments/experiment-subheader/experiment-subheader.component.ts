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
  experimentId: string;
  constructor(private experimentService: ExperimentService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['experimentId'] && params['experimentId'] != this.experimentId) {
        this.experimentId = params['experimentId'];
        this.onExperimentChange();
      }
    })
    this.experimentService.listExperiments().subscribe((data: any) => {
      this.experiments = data;
    });
  }

  onExperimentChange() {
    this.experimentService.$experimentId.next(this.experimentId);
    this.router.navigate(this.route.children.length
      ? ['experiment', this.experimentId, this.route.firstChild.snapshot.url.toString()]
      : ['experiment', this.experimentId]);
  }

}
