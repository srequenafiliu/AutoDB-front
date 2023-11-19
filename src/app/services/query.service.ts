import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDatabase } from '../interfaces/i-database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private queryUrl = "autodb-backend"
  constructor(private http:HttpClient) { }

  checkHealthQuery = ():Observable<void> => this.http.get<void>(`${this.queryUrl}/checkHealth`);
  sendQuery = (newQuery:IDatabase):Observable<string[]> => this.http.post<string[]>(`${this.queryUrl}/v1/generate-sql`, newQuery).pipe(map(response => response));
}
