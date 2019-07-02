import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ManageAccessService } from './../../services/manage-access.service';
import { User } from 'src/app/classes/user';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  displayedColumns: string[] = ['name', 'access_level'];
  dataSource: User[] = [];
  static PATH: any = 'settings/manage';

  constructor(private manageAccessService: ManageAccessService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router) {
    }

  ngOnInit() {
    this.manageAccessService.getUsers().subscribe(
      (data: any) => this.dataSource = data
    );
  }

}
