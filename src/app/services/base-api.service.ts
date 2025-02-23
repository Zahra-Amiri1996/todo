import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ListModel } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})

export class BaseApiService {

  constructor(private http: HttpClient) {
  }


  get(): Observable<ListModel> {
    return of();
  }

  post(): Observable<ListModel> {
    return of();
  }

  delete(): Observable<ListModel> {
    return of();
  }

  put(): Observable<ListModel> {
    return of();
  }
}
