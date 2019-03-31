import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  name: string;
  password: string;
  password2: string;
  error: string;
 
  constructor(private service: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    if (this.password != this.password2) {
      this.error = "Passwords don't match"
    } else {
      this.service.createUser(this.name, this.email, this.password).subscribe((data: any) => {

      });
    }
  }

  /*submit() {
    this.service.submit(this.contactInfo, this.requestElevated);
  }*/

}
