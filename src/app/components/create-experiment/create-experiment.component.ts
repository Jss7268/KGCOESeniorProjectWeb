import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
  static PATH: any = 'experiments/create';

  constructor() { }

  ngOnInit() {
  }

}
