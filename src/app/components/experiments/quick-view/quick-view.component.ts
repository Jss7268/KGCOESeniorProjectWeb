import { DeviceOutput } from './../../../classes/device-output';
import { UserInputsService } from 'src/app/services/user-inputs.service';
import { DeviceOutputService } from 'src/app/services/device-output.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { OutputType } from 'src/app/classes/output-type';
import { Router, ActivatedRoute } from '@angular/router';
import { OutputTypeService } from 'src/app/services/output-type.service';
import { MatTable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  static PATH = 'quick-view';

  private experimentId: string;
  private deviceOutputs: DeviceOutput[];
  private userInputs: any[];
  private outputTypes: OutputType[];
  private currentType: OutputType;
  columnsToDisplay = ['timestamp', 'output_value'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([{timestamp: 12, output_value: 11}]);

  @ViewChild(MatTable) table: MatTable<any>;


  constructor(private deviceOutputService: DeviceOutputService, private userInputsService: UserInputsService,
    private experimentService: ExperimentService, private router: Router, private route: ActivatedRoute,
    private outputTypeService: OutputTypeService) { }

  ngOnInit() {
    this.deviceOutputService.$deviceOutputsByExperiment.subscribe(
      (experimentId: string)  => {
        if (experimentId == this.experimentId) {
          this.deviceOutputs = this.deviceOutputService.deviceOutputsByExperiment;
          delete this.currentType;
          delete this.dataSource;
          this.updateTypes();
        }
      }
    );
    this.userInputsService.$userInputsByExperiment.subscribe(
      (experimentId: string)  => {
        if (experimentId == this.experimentId) {
          this.userInputs = this.userInputsService.userInputsByExperiment;
        }
      }
    );

    this.experimentId = this.experimentService.experimentId;
    this.onExperimentUpdate();
    this.experimentService.$experimentId.subscribe((experimentId) => {
      this.experimentId = experimentId;
      this.onExperimentUpdate();
    })
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['currentType']) {
        this.currentType = queryParams['currentType'];
      }
    });
  }

  onExperimentUpdate() {
    this.deviceOutputService.fillByExperiment(this.experimentId);
    this.userInputsService.fillByExperiment(this.experimentId);
  }

  updateTypes() {
    this.outputTypes = [];
    for (let outputTypeId of this.deviceOutputService.outputTypeIds) {
      this.outputTypeService.getOutputType(outputTypeId).subscribe(
        (data: any) => {
          this.outputTypes.push(data);
          if (!this.currentType) {
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
    selectedOutputs.sort((a: DeviceOutput, b: DeviceOutput) => b.timestamp - a.timestamp);
    this.dataSource = new MatTableDataSource(selectedOutputs);

    this.table.renderRows();
  }

  getDate(timestamp: number) {
    return new Date(Number(timestamp)).toLocaleString();
  }

  

}
