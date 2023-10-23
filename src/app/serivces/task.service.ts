import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Task, TaskResponse } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private static baseUrl = "https://workpace-api.azurewebsites.net/admin"
  private static getMyTasks = "/getMyTasks"
  private static getAllTasks = "/getAllTasks"

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }


  getMyTasks(pageSize: number = 10, skip: number = 0): Observable<TaskResponse> {
    const url = TaskService.baseUrl + TaskService.getMyTasks + `?pageSize=${pageSize}&skip=${skip}`;
    return this.httpClient.get<TaskResponse>(url, {
      headers: this.auth.getAuthHeader()
    });
  }

  getAllTasks(): Observable<Task[]> {
    const url = TaskService.baseUrl + TaskService.getAllTasks;
    return this.httpClient.get<Task[]>(url, {
      headers: this.auth.getAuthHeader()
    });
  }



}
