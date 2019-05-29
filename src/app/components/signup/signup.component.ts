import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation, EmailValidation, RepeatPasswordValidator, RepeatPasswordEStateMatcher } from './../../validators';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean;
  passwordsMatcher = new RepeatPasswordEStateMatcher;

  constructor(private service: AuthService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let email = '';
    this.router.queryParams.subscribe(params => {
      if (params['email']) {
        email = params['email'];
      }
    });
    this.signupForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl(email, EmailValidation),
        password: new FormControl('', PasswordValidation),
        passwordConfirm: new FormControl('', [Validators.required])
      },
      { validator: RepeatPasswordValidator })
  }

  signup() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.service.createUser(
      this.signupForm.controls.name.value,
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value
    ).subscribe(
      (data: any) => {
        this.login();
      },
      (error: any) => {
        this.signupForm.controls.email.setErrors({duplicateEmail: 'User already exists with this email'});
      }
    );;
  }

  login() {
    this.router.navigate(['login'], { queryParams: (this.signupForm.controls.email.value != '' ? { email: this.signupForm.controls.email.value } : {}) });
  }
}
