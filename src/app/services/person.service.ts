import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/i-person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personUrl = "v1/person"
  constructor(private http:HttpClient) { }

  getPerson = ():Observable<IPerson> => this.http.get<IPerson>(`${this.personUrl}/1`).pipe(response=>response);
}
