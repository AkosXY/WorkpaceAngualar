import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Location } from '../interface/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private static baseUrl = "https://workpace-api.azurewebsites.net"
  private static adminUrl = "https://workpace-api.azurewebsites.net/admin"

  private static getLocations = "/getLocations";
  private static getLocation = "/getLocation";
  private static saveLocation = "/saveLocation";
  private static deleteLocation = "/deleteLocation";

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  getLocations(): Observable<Location[]> {
    const url = LocationService.adminUrl + LocationService.getLocations
    return this.httpClient.get<Location[]>(url,
      { headers: this.auth.getAuthHeader() })

  }

  getLocation(locationId: number): Observable<Location> {
    const url = LocationService.baseUrl + LocationService.getLocation + `?locationId=${locationId}`
    return this.httpClient.get<Location>(url,
      { headers: this.auth.getAuthHeader() })

  }

  saveLocation(location: any): Observable<boolean> {
    const url = LocationService.adminUrl + LocationService.saveLocation
    return this.httpClient.post(url, location, {
      headers: this.auth.getAuthHeader(),
      observe: "response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

  deleteLocation(id: number): Observable<boolean> {
    let url = LocationService.adminUrl + LocationService.deleteLocation
    const requestBody = { location_id: id }
    return this.httpClient.delete(url, {
      headers: this.auth.getAuthHeader(),
      body: requestBody,
      observe: "response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

}
