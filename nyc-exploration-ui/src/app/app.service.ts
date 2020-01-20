import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class DatabaseService {
  constructor(
    private http: HttpClient
  ) { }

  getEvents() {
    return this.http.get('http://localhost:5000/events', httpOptions)
  }
}
