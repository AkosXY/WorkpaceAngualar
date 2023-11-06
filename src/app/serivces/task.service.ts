import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Task, TaskResponse } from '../interface/task.interface';
import { Image } from '../interface/image.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private static baseUrl = "https://workpace-api.azurewebsites.net/admin"
  //private static baseUrl = "http://localhost:8080/admin"
  private static getMyTasks = "/getMyTasks"
  private static getAllTasks = "/getAllTasks"
  private static createTask = "/createTask"
  private static deleteTask = "/deleteTask"
  private static unassignTask = "/unassignTask"
  private static assignTask = "/assignTask"
  private static getImagesForTask = "/getImagesForTask"

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) { }


  getMyTasks(pageSize: number = 1000, skip: number = 0): Observable<TaskResponse> {
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

  getImagesForTask(task: Task): Observable<Image[]> {
    const url = TaskService.baseUrl + TaskService.getImagesForTask + `?taskId=${task.id}`;
    return this.httpClient.get<Image[]>(url, {
      headers: this.auth.getAuthHeader()
    });
  }

  createTask(task: any):Observable<boolean> {
    const url = TaskService.baseUrl + TaskService.createTask
    return this.httpClient.post(url, task, {
        headers:this.auth.getAuthHeader(), 
        observe:"response"
      }).pipe(
        map(resp => resp.status === 200)
    )

  }

  deleteTask(id: number): Observable<boolean>{
    let url = TaskService.baseUrl + TaskService.deleteTask
    const requestBody = { task_id: id }
    return this.httpClient.delete(url, {
      headers:this.auth.getAuthHeader(), 
      body: requestBody,
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

  unassignTask(id: number): Observable<boolean>{
    let url = TaskService.baseUrl + TaskService.unassignTask
    const body = { task_id: id }
    return this.httpClient.patch(url, body, {
      headers:this.auth.getAuthHeader(), 
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }

  assignTask(taskId:number, assigneeId:number){
    let url = TaskService.baseUrl + TaskService.assignTask
    const body = { 
      task_id: taskId,
      assignee_id: assigneeId
     }
    return this.httpClient.patch(url, body, {
      headers:this.auth.getAuthHeader(), 
      observe:"response"
    }).pipe(
      map(resp => resp.status === 200)
    )
  }


}
