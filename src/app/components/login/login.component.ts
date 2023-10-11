import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthenticationService, private router: Router) { }

  loginForm = new FormGroup({
    usernameForm: new FormControl('', [Validators.required]),
    passwordForm: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  newPasswordForm = new FormControl('', [Validators.required, Validators.minLength(5)]);
  confirmPasswordForm = new FormControl('', [Validators.required, Validators.minLength(5), passwordMatchValidator(this.newPasswordForm)]);

  signupForm = new FormGroup({
    newEmailForm: new FormControl('', [Validators.email, Validators.required]),
    newPasswordForm: this.newPasswordForm,
    confirmPasswordForm: this.confirmPasswordForm
  });


  get usernameForm() {
    return this.loginForm.get('usernameForm');
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

  login() {
    if (this.loginForm.valid) { //TODO authentication
      let username:string = this.usernameForm?.value ? this.usernameForm?.value.toString() : "";
      let password:string = this.passwordForm?.value ? this.passwordForm?.value.toString() : ""
      this.authService.login(username, password)
    }
  }

  signup() {
    if (this.signupForm.valid) { //TODO authentication
      this.router.navigateByUrl('/home');
      //this.authService.login()
    }
  }

}
