import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private static baseUrl = "https://workpace-api.azurewebsites.net/admin"

  private static getLocations = "/getLocations";
  private static saveLocation = "/saveLocation";

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  getLocations(): Observable<Location[]> {
    const url = LocationService.baseUrl + LocationService.getLocations
    return this.httpClient.get<Location[]>(url,
      { headers: this.auth.getAuthHeader() })

  }

  saveLocation(location: any): Observable<boolean> {
    const url = LocationService.baseUrl + LocationService.saveLocation
    return this.httpClient.post(url, location, {
      headers: this.auth.getAuthHeader(),
      observe: "response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

}
