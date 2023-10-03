import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = "https://workpace-api.azurewebsites.net/login";

  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  getAuthenticated() {
    return this.isAuthenticated;
  }

  login(username:string, password:string) {
    const headers = this.createAuthorizationHeader(username, password);

    this.http.get(this.endpoint, { headers: headers }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
      complete: () => {
        console.log('Request completed.');
        this.router.navigateByUrl('/home');
        this.isAuthenticated = true;
      }
    });

  }

  logout() {
    this.isAuthenticated = false;
  }

  private createAuthorizationHeader(username: string, password: string): HttpHeaders {
    const headerValue = `Basic ${btoa(`${username}:${password}`)}`;
    return new HttpHeaders({
      'Authorization': headerValue
    });
  }


}
