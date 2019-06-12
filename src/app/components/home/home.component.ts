import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;
  static PATH: any = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  test() {
    this.auth.getUsers().subscribe((data: any) => {
      console.log(data);
      this.info = data;
    })
  }

}
