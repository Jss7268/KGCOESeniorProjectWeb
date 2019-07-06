import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ManageAccessService } from './../../services/manage-access.service';
import { User } from 'src/app/classes/user';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  ngUnsubscribe = new Subject();
  displayedColumns: string[] = ['id', 'name', 'access_level'];
  userList: User[] = [];
  static PATH: any = 'settings/manage';

  constructor(private manageAccessService: ManageAccessService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {
    }

  ngOnInit() {
    this.manageAccessService.getUsers().subscribe(
      (data: any) => this.userList = data
    );
  }

  changeAccessLevel(event: any) {
    const access_level = event.target.textContent;

    this.manageAccessService.changeAccessLevel(
      'c6ec2209-661f-46d4-8570-099e878d8865',
      access_level
    ).subscribe(
      (data: any) => {
        const date = new Date();
        this.snackBar.open(`Changed access level on:
        ${date.toLocaleDateString('en-US')} at:
        ${date.toLocaleTimeString('en-US')}`,
          'Dismiss', {
            duration: 5000,
          });
      },
      (error: any) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
