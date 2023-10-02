import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/serivces/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword = true;

  constructor(private authService :AuthenticationService, private router :Router) { }

  emailForm = new FormControl('');
  passwordForm = new FormControl('');

  loginForm = new FormGroup({
    emailForm: this.emailForm,
    passwordForm: this.passwordForm
  })

/*   loginForm = new FormGroup({
    emailForm: new FormControl(''),
    passwordForm: new FormControl('')
  })
 */

  newEmailForm = new FormControl('');
  newPasswordForm = new FormControl('');
  confirmPasswordForm = new FormControl('');

  signupForm = new FormGroup({
    newEmailForm: this.newEmailForm,
    newPasswordForm: this.newPasswordForm,
    confirmPasswordForm: this.confirmPasswordForm
  })

  login(){
    this.router.navigateByUrl('/home');
    this.authService.login()
  }


}
