import { Component, OnInit } from '@angular/core';
import { Experiment } from 'src/app/classes/experiment';
import { ExperimentService } from 'src/app/services/experiment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-experiment-subheader',
  templateUrl: './experiment-subheader.component.html',
  styleUrls: ['./experiment-subheader.component.css']
})
export class ExperimentSubheaderComponent implements OnInit {
  experiments: Experiment[];
  selectedExperiment: number;
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
    if (!Object.keys(this.route.snapshot.params).length) {
      this.router.navigate(['experiments', this.selectedExperiment]);
    } else {
      this.router.createUrlTree([
        {...{'experimentId': this.selectedExperiment}, ...this.route.snapshot.params}
      ], {relativeTo: this.route});
    }
  }



}
