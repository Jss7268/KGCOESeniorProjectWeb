import { SignupService } from './../../services/signup.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  contactInfo: string = '';
  requestElevated: boolean;
 
  constructor(private service: SignupService) {
  }

  ngOnInit() {
  }

  submit() {
    this.service.submit(this.contactInfo, this.requestElevated);
  }

}
