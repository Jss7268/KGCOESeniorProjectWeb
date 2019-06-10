import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  loginForm: FormGroup;
  submitted: boolean;
  static PATH: string = 'login';

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let email = '';
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        email = params['email'];
      }
    });
    this.loginForm = this.formBuilder.group({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.authenticate(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(
        (data: any) => {
          this.router.navigate(['']);
        },
        (error: any) => {
          this.loginForm.controls.password.setErrors({ invalidCredentials: 'Invalid email or password' });
        }
      );
  }

  register() {
    this.router.navigate(["signup"], { queryParams: (this.loginForm.controls.email.value != '' ? { email: this.loginForm.controls.email.value } : {}) });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
