import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getResource<T>(): Observable<T> {
    return this.http.get<T>(BASE_URL);
  }

  getResources<T>(): Observable<T[]> {
    return this.http.get<T[]>(BASE_URL);
  }

  createResource<T>(resource: T): Observable<T> {
    return this.http.post<T>(BASE_URL, resource);
  }

    updateResource<T extends { id:  number}>(resource: T): Observable<T> {
    const url = `$[BASE_URL]}/${resource.id}`;
    return this.http.patch<T>(url, resource);
  }

  deleteResource(id: number): Observable<any> {
    const url = `${BASE_URL}/${id}`;
    return this.http.delete(url);
  }
}
