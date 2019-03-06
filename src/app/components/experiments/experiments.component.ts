import { Component, OnInit } from '@angular/core';
import { ApiGetService } from '../../services/api-get.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  private expData: any;
  private myFunction: any;

  constructor(private svc: ApiGetService) { }

  ngOnInit() {
    //this.svc.getData().subscribe(data => {
    //  this.expData = data;
    //});
    this.expData = ["2/17/2018 4:40PM", "1/17/2018 4:40PM", "3/17/2018 4:40PM", "4/17/2018 4:40PM", "7/17/2018 4:40PM",
    "0/17/2018 4:40PM", "8/17/2018 4:40PM", "9/17/2018 4:40PM", "6/17/2018 4:40PM", "5/17/2018 4:40PM", ];
  }

  downloadCSV() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(this.svc.getExperiments(0)));
    element.setAttribute('download', "some_csv.txt");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
   };

}
