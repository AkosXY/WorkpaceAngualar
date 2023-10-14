import { Injectable } from '@angular/core';

import { Worker} from "../interface/worker.interface";
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private static getMyWorkersEndpoint = "https://workpace-api.azurewebsites.net/admin/getMyWorkers";
  private static addNewWorker = "https://workpace-api.azurewebsites.net/admin/register";


  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  getMyWorkers():Observable<Worker[]>{
    return this.httpClient.get<Worker[]>(WorkerService.getMyWorkersEndpoint, {headers:this.auth.getAuthHeader()})
    
  }

  postNewWorker(worker: any):Observable<boolean>{
    return this.httpClient.post(WorkerService.addNewWorker, worker, {
        headers:this.auth.getAuthHeader(), 
        observe:"response"
      }).pipe(
        map(resp => resp.status === 200)
    )
  }

}
