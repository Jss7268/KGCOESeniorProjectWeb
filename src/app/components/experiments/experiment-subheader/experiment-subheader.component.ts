import { AuthService } from 'src/app/services/auth.service';
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
    private route: ActivatedRoute, public auth: AuthService) {
    this.navLinks = [
      {
        label: 'View Data',
        link: AppPaths.QUICK_VIEW_PATH, // todo make list component
        index: 0,
        auth: 0,
      }, {
        label: 'Export',
        link: AppPaths.EXPORT_EXPERIMENT_PATH,
        index: 1,
        auth: 0,
      }, {
        label: 'Link Device',
        link: AppPaths.CREATE_DEVICE_EXPERIMENT_PATH, // todo make list component
        index: 2,
        auth: 1,
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
