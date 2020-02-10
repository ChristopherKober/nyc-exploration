import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimelineDatabaseService } from './timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public timelineData = [{ "EVENT_ID": 1, "EVENT_TYPE": "Meal", "EVENT_NAME": "Da Andrea", "NEIGHBORHOOD_ID": 7, "EVENT_DATE": "1/17/2020", "EVENT_RATING": 4, "COMMENTS": null }, { "EVENT_ID": 2, "EVENT_TYPE": "Meal", "EVENT_NAME": "Jones Wood Foundry", "NEIGHBORHOOD_ID": 36, "EVENT_DATE": "1/18/2020", "EVENT_RATING": 4, "COMMENTS": null }];
  _DatabaseService;
  _headline = "Timeline";

  constructor(private http: HttpClient) {
    this._DatabaseService = new TimelineDatabaseService(http)
  }

  ngOnInit() {
    this.getData()
  }

  public setNeighborhood(neighborhoodId) {
    this._headline = "Neighborhood" + neighborhoodId;
  }

  getData() {
    this._DatabaseService.getEvents().subscribe(
      data => {
        this.timelineData = data.sort((x, y) => (new Date(x.EVENT_DATE)).getTime() - (new Date(y.EVENT_DATE)).getTime())
          .map(x => {
            x.EVENT_DATE = (new Date(x.EVENT_DATE)).toLocaleDateString()
            return x;
          })

        console.log(JSON.stringify(data))
        console.log(JSON.stringify(this.timelineData))
      },
      err => { console.log(err) },
      () => { console.log('done loading data') }
    )
  }

}
