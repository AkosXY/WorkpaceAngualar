import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private static baseUrl = environment.apiUrl
  private static reportBug = "/reportBug"
  
  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  sendFeedback(feedback: any): Observable<boolean> {
    const url = FeedbackService.baseUrl + FeedbackService.reportBug
    return this.httpClient.post(url, feedback, {
      headers: this.auth.getAuthHeader(),
      observe: 'response'
    }).pipe(
      map(resp => {
        return resp.status === 200 
      }),
      catchError(() => {
        return of(false);
      })
    );
  }


}
