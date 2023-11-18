import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/i-person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = "http://192.168.1.52:8099/autodb-backend/v1/person/1"
  constructor(private http:HttpClient) { }

  getPerson = ():Observable<IPerson> => this.http.get<IPerson>(this.url).pipe(response=>response);
}
