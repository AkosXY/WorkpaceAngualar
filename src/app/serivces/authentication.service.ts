import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../components/login/dialog/login.dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = "https://workpace-api.azurewebsites.net/login";

  isAuthenticated = false;
  isAdmin = false;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  getAuthenticated() {
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
  }

  openDialog(permissionError: boolean) {
    this.dialog.open(LoginDialogComponent, {
      data: permissionError 
    });
  }

  private createAuthorizationHeader(username: string, password: string): HttpHeaders {
    const headerValue = `Basic ${btoa(`${username}:${password}`)}`;
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
      this.isAdmin = true;
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


}
