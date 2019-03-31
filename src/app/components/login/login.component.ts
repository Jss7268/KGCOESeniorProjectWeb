import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.email, this.password);
  }

}
