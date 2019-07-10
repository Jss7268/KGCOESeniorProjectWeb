import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {MatDivider} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: any;

  page = {
    title: 'Embedded Data Collection System',
    subtitle: 'Welcome Home!',
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  test() {
    this.auth.getUsers().subscribe((data: any) => {
      console.log(data);
      this.info = data;
    })
  }

}
