import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/interface/user.interface';
import * as bcrypt from 'bcryptjs';

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
    newNameForm: new FormControl('', [Validators.required]),
    newPhoneForm: new FormControl('', [Validators.required]),
    newUserNameForm: new FormControl('', [Validators.required]),
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

  get newNameForm() {
    return this.signupForm.get('newNameForm');
  }
  
  get newPhoneForm() {
    return this.signupForm.get('newPhoneForm');
  }

  get newUserNameForm() {
    return this.signupForm.get('newUserNameForm');
  }

  get newEmailForm() {
    return this.signupForm.get('newEmailForm');
  }

  passwordsMatch(): boolean {
    return this.newPasswordForm?.value === this.confirmPasswordForm?.value;
  }

  login() {
    if (this.loginForm.valid) { 
      let username:string = this.usernameForm?.value ? this.usernameForm?.value.toString() : "";
      let password:string = this.passwordForm?.value ? this.passwordForm?.value.toString() : ""
      this.authService.login(username, password)
    }
  }

  signup() {
    if (this.signupForm.valid) { 
      const newUser: NewUser = {
        username: this.newUserNameForm?.value || '',
        phone: this.newPhoneForm?.value || '',
        email: this.newEmailForm?.value || '',
        name: this.newNameForm?.value || '',
        admin: true,
        enabled: true,
        password: bcrypt.hashSync(this.newPasswordForm.value || ''),
      }
  
      this.authService.register(newUser).subscribe((success) => {
        console.log("succ: "+success)
        if(success){
          this.router.navigateByUrl('/home');
        }
      })

    }
  }

}
