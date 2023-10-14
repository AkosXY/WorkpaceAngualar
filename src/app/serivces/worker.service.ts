import { Injectable } from '@angular/core';

import { Worker} from "../interface/worker.interface";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private static getMyWorkersEndpoint = "https://workpace-api.azurewebsites.net/admin/getMyWorkers";

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }


  getMyWorkers():Observable<Worker[]>{
    return this.httpClient.get<Worker[]>(WorkerService.getMyWorkersEndpoint, {headers:this.auth.getAuthHeader()})
    
  }


}
