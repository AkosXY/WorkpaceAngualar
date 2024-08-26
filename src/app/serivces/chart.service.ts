import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private static baseUrl = environment.adminUrl
  private static getGeneralStatistics = "/getGeneralStatistics"
  private static getUserStatistics = "/getGeneralStatistics"
  
  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }


  getGeneralStatistics(startDate:string = '1998-12-31', endDate:string = '2030-12-31'): Observable<any> {
    const url = ChartService.baseUrl + ChartService.getGeneralStatistics + `?startDate=${startDate}&endDate=${endDate}`;
    return this.httpClient.get<any>(url, {
      headers: this.auth.getAuthHeader()
    });
  }

  getUserStatistics(startDate:string = '1998-12-31', endDate:string = '2030-12-31', userId?:number): Observable<any> {
    const url = ChartService.baseUrl + ChartService.getUserStatistics + `?startDate=${startDate}&endDate=${endDate}&userId=${userId}`;
    console.log(url)
    return this.httpClient.get<any>(url, {
      headers: this.auth.getAuthHeader()
    });
  }



  
}
