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

  constructor(private outputTypeService: OutputTypeService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    let name = '';
    let units = '';
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        name = params['name'];
      }
      if (params['units']) {
        units = params['units'];
      }
    });
    this.outputTypeForm = this.formBuilder.group({
      name: new FormControl(name, [Validators.required]),
      units: new FormControl(units, [Validators.required])
    })
  }

  submit() {
    this.submitted = true;
    if (this.outputTypeForm.invalid) {
      return;
    }
    this.outputTypeService.createOutputType(this.outputTypeForm.controls.name.value, this.outputTypeForm.controls.units.value)
      .subscribe(
        (data: any) => {
          this.router.navigate([this.callbackUrl]);
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
        this.router.navigate([this.callbackUrl]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openOverwriteDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {info: 'Do you wish to overwrite existing output type?', cancelDialog: 'Cancel', confirmDialog: 'Continue', callback: this.overwrite}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  register() {
    this.router.navigate(["signup"], { queryParams: (this.outputTypeForm.controls.email.value != '' ? { email: this.outputTypeForm.controls.email.value } : {}) });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }


}
