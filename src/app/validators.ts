import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(24),
];

export class RepeatPasswordEStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password').value !== control.parent.get('passwordConfirm').value && control.dirty)
  }
}
export function RepeatPasswordValidator(group: FormGroup) {
  let password = group.controls.password.value;
  let passwordConfirm = group.controls.passwordConfirm.value;

  return password === passwordConfirm ? null : { passwordsNotEqual: true }    
}