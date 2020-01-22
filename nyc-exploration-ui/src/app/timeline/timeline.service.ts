import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class TimelineDatabaseService {
  constructor(
    private http: HttpClient
  ) { }

  getEvents() {
    return this.http.get(environment.apiURL + '/events', httpOptions)
  }
}
