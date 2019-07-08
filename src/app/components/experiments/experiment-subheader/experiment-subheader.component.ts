import { AppPaths } from 'src/app/app.paths';
import { QuickViewComponent } from './../quick-view/quick-view.component';
import { CreateDeviceExperimentComponent } from './../create-device-experiment/create-device-experiment.component';
import { CreateDeviceOutputComponent } from './../create-device-output/create-device-output.component';
import { Component, OnInit } from '@angular/core';
import { Experiment } from 'src/app/classes/experiment';
import { ExperimentService } from 'src/app/services/experiment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ExportExperimentComponent } from '../export-experiment/export-experiment.component';
import { CreateUserInputComponent } from '../create-user-input/create-user-input.component';

@Component({
  selector: 'app-experiment-subheader',
  templateUrl: './experiment-subheader.component.html',
  styleUrls: ['./experiment-subheader.component.css']
})
export class ExperimentSubheaderComponent implements OnInit {
  experiments: Experiment[];
  experimentId: string;
  navLinks: any[];

  constructor(private experimentService: ExperimentService, private router: Router,
    private route: ActivatedRoute) {
    this.navLinks = [
      {
        label: 'Export',
        link: AppPaths.EXPORT_EXPERIMENT_PATH,
        index: 0
      }, {
        label: 'User Inputs',
        link: AppPaths.CREATE_USER_INPUT_PATH, // todo make list component
        index: 1
      }, {
        label: 'Linked Devices',
        link: AppPaths.CREATE_DEVICE_EXPERIMENT_PATH, // todo make list component
        index: 2
      }, {
        label: 'Device Outputs',
        link: AppPaths.QUICK_VIEW_PATH, // todo make list component
        index: 3
      },
    ];
  }

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
    if (this.route.children.length) {
      this.router.navigate(['experiment', this.experimentId].concat(this.route.firstChild.snapshot.url.join('/').split('/')),
        { queryParams: this.route.firstChild.snapshot.queryParams });
    } else {
      this.router.navigate(['experiment', this.experimentId]);
    }
  }

}
