import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { OutputTypeService } from './../../services/output-type.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-output-type',
  templateUrl: './create-output-type.component.html',
  styleUrls: ['./create-output-type.component.css']
})
export class CreateOutputTypeComponent implements OnInit {
  ngUnsubscribe = new Subject();
  outputTypeForm: FormGroup;
  submitted: boolean;
  @Input('callbackUrl') callbackUrl: string = '';
  static PATH: any = 'output-types/create';

  constructor(private outputTypeService: OutputTypeService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
      this.route.queryParams.subscribe(params => {
        let name = '';
        let units = '';
        if (params['name']) {
          name = params['name'];
        }
        if (params['units']) {
          units = params['units'];
        }
        if (params['callbackUrl']) {
          this.callbackUrl = params['callbackUrl'];
        }
        this.outputTypeForm = this.formBuilder.group({
          name: new FormControl(name, [Validators.required]),
          units: new FormControl(units, [Validators.required])
        });
      });
     }

  ngOnInit() {}

  updateRoute() {
    this.router.navigate(
      [CreateOutputTypeComponent.PATH], {
        queryParams: {
          name: this.outputTypeForm.controls.name.value,
          units: this.outputTypeForm.controls.units.value,
        }
      });
  }

  submit() {
    this.submitted = true;
    if (this.outputTypeForm.invalid) {
      return;
    }
    this.outputTypeService.createOutputType(this.outputTypeForm.controls.name.value, this.outputTypeForm.controls.units.value)
      .subscribe(
        (data: any) => {
          this.router.navigateByUrl(this.callbackUrl + this.outputTypeForm.controls.name.value);
        },
        (error: any) => {
          this.openOverwriteDialog();
        }
      );
  }

  overwrite() {
    this.outputTypeService.updateOutputType(this.outputTypeForm.controls.name.value, this.outputTypeForm.controls.units.value)
      .subscribe(
        (data: any) => {
          this.router.navigateByUrl(this.callbackUrl + this.outputTypeForm.controls.name.value);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  openOverwriteDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { info: 'Do you wish to overwrite existing output type?', cancelDialog: 'Cancel', confirmDialog: 'Continue', callback: this.overwrite }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }


}
