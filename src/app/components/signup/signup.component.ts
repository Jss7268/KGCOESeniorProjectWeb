import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private signupForm: FormGroup;
  private name: string;
  private email: string;
  private password: string;
  private password2;
  private submitted: boolean;

  constructor(private service: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: new FormControl(this.name, [Validators.required]),
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required]),
      password2: new FormControl(this.password2, [Validators.required, () => {
        return (control: AbstractControl): { [key: string]: any } | null => {
          return this.password == this.password2 ? { 'nonMatching': { value: control.value } } : null;
        };
      }]),
    })
  }

  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.service.createUser(this.name, this.email, this.password).subscribe((data: any) => {

    });
  }

  /*submit() {
    this.service.submit(this.contactInfo, this.requestElevated);
  }*/

}
