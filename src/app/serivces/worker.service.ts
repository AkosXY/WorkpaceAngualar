import { Injectable } from '@angular/core';

import { Worker} from "../interface/worker.interface";
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private static baseUrl = "https://workpace-api.azurewebsites.net/admin"

  private static getMyWorkersEndpoint = "/getMyWorkers";
  private static addNewWorker = "/register";
  private static enableWorker = "/enableUser";
  private static deleteWorker = "/deleteUser?userId=";

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }

  getMyWorkers():Observable<Worker[]>{
    const url = WorkerService.baseUrl + WorkerService.getMyWorkersEndpoint
    return this.httpClient.get<Worker[]>(url, 
      {headers:this.auth.getAuthHeader()})
    
  }

  postNewWorker(worker: any):Observable<boolean>{
    const url = WorkerService.baseUrl + WorkerService.addNewWorker
    return this.httpClient.post(url, worker, {
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
    const url = WorkerService.baseUrl + WorkerService.enableWorker
    return this.httpClient.patch(url, body,{
      headers:this.auth.getAuthHeader(), 
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

  deleteWorker(id: number): Observable<boolean>{
    let url = WorkerService.baseUrl + WorkerService.deleteWorker + id
    return this.httpClient.delete(url,{
      headers:this.auth.getAuthHeader(), 
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

}
