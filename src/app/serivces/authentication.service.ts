import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login/dialog/login.dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = "https://workpace-api.azurewebsites.net/login";

  isAuthenticated = false;
  isAdmin = false;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private cookieService: CookieService) { }

  getAuthenticated() {
    this.isAuthenticated = this.cookieService.get('authenticated') === "true";
    return this.isAuthenticated;
  }

  login(username:string, password:string) {
    const headers = this.createAuthorizationHeader(username, password);

    this.http.get(this.endpoint, { headers: headers }).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginFailed(error),
      complete: () => this.handleRequestComplete()
    });

  }

  logout() {
    this.isAuthenticated = false;
    this.cookieService.delete("authorizationHeader");
    this.cookieService.delete('authenticated');
  }

  openDialog(permissionError: boolean) {
    this.dialog.open(LoginDialogComponent, {
      data: permissionError 
    });
  }

  private createAuthorizationHeader(username: string, password: string): HttpHeaders {
    const headerValue = `Basic ${btoa(`${username}:${password}`)}`;
    this.cookieService.set('authorizationHeader', headerValue);
    return new HttpHeaders({
      'Authorization': headerValue
    });
  }


  private handleLoginFailed(error: any): void {
    console.error('Login failed:', error);
    this.openDialog(false)
  }

  private handleLoginSuccess(response: any): void {
    if (response && response.admin === true) {
      console.log('Admin login successful:', response);
      this.storeDataInCookies(response);

    } else {
      console.error('Login failed: Not an admin user.');
    }
  }
  
  private handleRequestComplete(): void {
    console.log('Request completed.');
    if (this.isAdmin) {
      this.router.navigateByUrl('/home');
      this.isAuthenticated = true;
    } else {
      this.openDialog(true)
    }
  }

  storeDataInCookies(response: any){ 
    this.cookieService.set('userData', JSON.stringify(response));
    this.isAdmin = true;
    this.cookieService.set('authenticated', "true");

  }
  
  getUserData(): User{
    return JSON.parse(this.cookieService.get('userData'));
  }


}
