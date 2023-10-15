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
  private static enableWorker = "https://workpace-api.azurewebsites.net/admin/enableUser";
  private static deleteWorker = "https://workpace-api.azurewebsites.net/admin/deleteUser?userId=";

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  getMyWorkers():Observable<Worker[]>{
    return this.httpClient.get<Worker[]>(WorkerService.getMyWorkersEndpoint, 
      {headers:this.auth.getAuthHeader()})
    
  }

  postNewWorker(worker: any):Observable<boolean>{
    return this.httpClient.post(WorkerService.addNewWorker, worker, {
        headers:this.auth.getAuthHeader(), 
        observe:"response"
      }).pipe(
        map(resp => resp.status === 200)
    )
  }

  enableWorker(worker: any):Observable<boolean>{
    let body = {
      user_id: worker.id,
      enabled: worker.enabled? 1:0
    }
    console.log(body)
    return this.httpClient.patch(WorkerService.enableWorker, body,{
      headers:this.auth.getAuthHeader(), 
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

  deleteWorker(id: number): Observable<boolean>{
    let url = WorkerService.deleteWorker + id
    return this.httpClient.delete(url,{
      headers:this.auth.getAuthHeader(), 
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

}
