import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation, EmailValidation, RepeatPasswordValidator, RepeatPasswordEStateMatcher } from './../../validators';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  animations: [
    trigger('requestedReasonAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-58px)', opacity: 0, height: 0 }),
        animate('100ms', style({ transform: 'translateY(0)', opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1, height: '*' }),
        animate('100ms', style({ transform: 'translateY(-58px)', opacity: 0, height: 0 }))
      ])
    ])
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted: boolean;
  passwordsMatcher = new RepeatPasswordEStateMatcher;

  constructor(private service: AuthService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, public userService: UserService) {
  }

  ngOnInit() {
    let email = '';
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        email = params['email'];
      }
    });
    this.signupForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl(email, EmailValidation),
        password: new FormControl('', PasswordValidation),
        passwordConfirm: new FormControl('', [Validators.required]),
        requestedAccessLevel: new FormControl('', []),
        requestedReason: new FormControl('', [Validators.maxLength(256)]),
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
      this.signupForm.controls.password.value,
      this.signupForm.controls.requestedAccessLevel.value,
      this.signupForm.controls.requestedReason.value,

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
