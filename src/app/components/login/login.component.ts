import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { Router } from '@angular/router';
/* 
export function passwordMatchValidator(): ValidatorFn {
  return (control): {[key: string]: any} | null => {
    const newPass = control.get('newPasswordForm')?.value;
    const newPassConfirm = control.get('confirmPasswordForm')?.value;
    return newPass === newPassConfirm ? null : { passwordDontMatch: true };
  };
}
 */

export function passwordMatchValidator(confirmControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.value;
    const confirmPassword = confirmControl.value;

    if (newPassword !== confirmPassword) {
      return { passwordDontMatch: true };
    }

    return null;
  };
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword = true;

  constructor(private authService :AuthenticationService, private router :Router) { }

  loginForm = new FormGroup({
    emailForm: new FormControl('', [Validators.email, Validators.required]),
    passwordForm:  new FormControl('', [Validators.required, Validators.minLength(5)])
  })


  newPasswordForm = new FormControl('', [Validators.required, Validators.minLength(5)]);
  confirmPasswordForm = new FormControl('', [Validators.required, Validators.minLength(5), passwordMatchValidator(this.newPasswordForm)]);

  signupForm = new FormGroup({
    newEmailForm: new FormControl('', [Validators.email, Validators.required]),
    newPasswordForm: this.newPasswordForm,
    confirmPasswordForm: this.confirmPasswordForm
  });

  get emailForm() {
    return this.loginForm.get('emailForm');
  }

  get passwordForm() {
    return this.loginForm.get('passwordForm');
  }


  get newEmailForm() {
    return this.signupForm.get('newEmailForm');
  }

  passwordsMatch(): boolean {
    return this.newPasswordForm?.value === this.confirmPasswordForm?.value;
  }
  

  login(){
    this.router.navigateByUrl('/home');
    this.authService.login()
  }


}
