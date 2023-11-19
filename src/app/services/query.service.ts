import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDatabase } from '../interfaces/i-database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private personUrl = "autodb-backend/v1/generate-sql"
  constructor(private http:HttpClient) { }

  sendQuery = (newQuery:IDatabase):Observable<IDatabase> => this.http.post<IDatabase>(this.personUrl, newQuery).pipe(map(response => response));
}
