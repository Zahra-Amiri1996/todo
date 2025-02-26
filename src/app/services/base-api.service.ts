import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListModel } from '../models/list.model';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})

export class BaseApiService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  getTasksByList(listId: string): Observable<ListModel[]> {
    return this.http.get<ListModel[]>(`${this.baseUrl}/tasks/query/${listId}`);
  }

  getTaskById(taskId: string): Observable<ListModel> {
    return this.http.get<ListModel>(`${this.baseUrl}/tasks/${taskId}`);
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(taskId: string, task: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.baseUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/tasks/${taskId}`);
  }

  getCompletedTasks(): Observable<ListModel[]> {
    return this.http.get<ListModel[]>(`${this.baseUrl}/compeleted`);
  }

  getAllLists(): Observable<ListModel[]> {
    return this.http.get<ListModel[]>(`${this.baseUrl}/lists`);
  }

  getMainList(): Observable<ListModel> {
    return this.http.get<ListModel>(`${this.baseUrl}/mainList`);
  }

  getListById(listId: string): Observable<ListModel> {
    return this.http.get<ListModel>(`${this.baseUrl}/lists/${listId}`);
  }

  createList(list: ListModel): Observable<ListModel> {
    return this.http.post<ListModel>(`${this.baseUrl}/lists`, list);
  }

  updateList(listId: string, list: ListModel): Observable<ListModel> {
    return this.http.put<ListModel>(`${this.baseUrl}/lists/${listId}`, list);
  }

  deleteList(listId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/lists/${listId}`);
  }
}
