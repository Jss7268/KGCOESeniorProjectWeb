import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: any;


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
