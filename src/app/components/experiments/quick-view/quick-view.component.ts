import { AuthService } from './../../../services/auth.service';
import { DeviceOutput } from './../../../classes/device-output';
import { UserInputsService } from 'src/app/services/user-inputs.service';
import { DeviceOutputService } from 'src/app/services/device-output.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { OutputType } from 'src/app/classes/output-type';
import { Router, ActivatedRoute } from '@angular/router';
import { OutputTypeService } from 'src/app/services/output-type.service';
import { MatTable, MatTableDataSource } from '@angular/material';
import { AppPaths } from 'src/app/app.paths';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  private experimentId: string;
  private deviceOutputs: DeviceOutput[];
  private selectedOutputs: any[] = [];
  private userInputs: any[] = [];
  private outputTypes: OutputType[];
  private currentType: OutputType;
  columnsToDisplay = ['timestamp', 'output_value'];
  public dataSource: any = new MatTableDataSource();

  @ViewChild(MatTable) table: MatTable<any>;


  constructor(private deviceOutputService: DeviceOutputService, private userInputsService: UserInputsService,
    private experimentService: ExperimentService, private router: Router, private route: ActivatedRoute,
    private outputTypeService: OutputTypeService, public auth: AuthService) { }

  ngOnInit() {
    this.router.navigate(`${this.route.parent.snapshot.url.join('/')}/${AppPaths.QUICK_VIEW_PATH}`.split('/'));

    this.experimentId = this.experimentService.experimentId;
    this.onExperimentUpdate();
    this.experimentService.$experimentId.subscribe((experimentId) => {
      this.experimentId = experimentId;
      console.log('exp change')
      this.onExperimentUpdate();
    })
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['currentType']) {
        this.currentType = queryParams['currentType'];
      }
    });
  }

  onExperimentUpdate() {
    this.selectedOutputs = [];
    this.userInputs = [];
    this.deviceOutputService.listByExperiment(this.experimentId).subscribe(
      (data:any ) => {
          console.log("new outputs");
          this.deviceOutputs = data;
          let outputTypeObj = {};
          for (let output of data) {
            outputTypeObj[output['output_type_id']] = true;
          }
          let outputTypeIds = Object.keys(outputTypeObj);

          delete this.currentType;
          delete this.dataSource;

          this.updateTypes(outputTypeIds);
        
      }
    );
    this.userInputsService.listByExperiment(this.experimentId).subscribe(
      (data: any) => {
          this.userInputs = data;
          this.updateDataSource();
        
      }
    );
  }

  updateTypes(outputTypeIds: string[]) {
    this.outputTypes = [];
    for (let outputTypeId of outputTypeIds) {
      if (!this.currentType) {
        var currentId = outputTypeId;
      }
      this.outputTypeService.getOutputType(outputTypeId).subscribe(
        (data: any) => {
          this.outputTypes.push(data);
          if (data.id == currentId) {
            this.currentType = data;
            this.onTypeUpdate();
          }
        }
      );
    }
  }

  onTypeUpdate() {
    let selectedOutputs = [];
    for (let deviceOutput of this.deviceOutputs) {
      if (deviceOutput.output_type_id == this.currentType.id) {
        selectedOutputs.push(deviceOutput);
      }
    }
    this.selectedOutputs = selectedOutputs;
    this.updateDataSource();

  }

  updateDataSource() {
    let outputs = this.selectedOutputs.concat(this.userInputs);
    outputs.sort((a: any, b: any) => b.timestamp - a.timestamp);
    this.dataSource = outputs;

    this.table.renderRows();
  }

  getDate(timestamp: number) {
    return new Date(Number(timestamp)).toLocaleString();
  }

  getCreateUserInputPath() {
    return `/${this.route.parent.snapshot.url.join('/')}/${AppPaths.CREATE_USER_INPUT_PATH}`
  }

}
