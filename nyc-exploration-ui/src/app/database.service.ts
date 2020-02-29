import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment'

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
    return this.http.get(environment.apiURL + '/events', httpOptions)
  }

  getEventsFromNeighborhood(neighborhoodId) {
    return this.http.get(environment.apiURL + '/events/' + neighborhoodId, httpOptions)
  }

  getNeighborhoods() {
    return this.http.get(environment.apiURL + '/neighborhoods', httpOptions);
  }

  getVisitedNeighborhoods() {
    return this.http.get(environment.apiURL + '/neighborhoods/visited', httpOptions);
  }

  postNewEvent(eventType,eventName,neighborhoodId,eventDate,eventRating,comments,password) {
    var postData =
    {
      "event_type": eventType,
      "event_name": eventName,
      "neighborhood_id": Number(neighborhoodId),
      "event_date": eventDate,
      "event_rating": Number(eventRating),
      "comments": comments,
      "password": password
    }

    return this.http.post(environment.apiURL + '/events', postData, httpOptions);
  }
}
