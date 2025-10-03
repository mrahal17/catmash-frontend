import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from '../model/cat.model';

@Injectable({
  providedIn: 'root'
})

export class CatService {
  private apiUrl = '/api/cats';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl + '/');
  }

  getAllRanked(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl + '/ranked');
  }
}
