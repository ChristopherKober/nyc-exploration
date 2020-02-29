import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database.service';
import { MapSelectionService } from '../map-selection.service'


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public timelineData = [{ "EVENT_ID": 1, "EVENT_TYPE": "Meal", "EVENT_NAME": "Da Andrea", "NEIGHBORHOOD_ID": 7, "EVENT_DATE": "1/17/2020", "EVENT_RATING": 4, "COMMENTS": null }, { "EVENT_ID": 2, "EVENT_TYPE": "Meal", "EVENT_NAME": "Jones Wood Foundry", "NEIGHBORHOOD_ID": 36, "EVENT_DATE": "1/18/2020", "EVENT_RATING": 4, "COMMENTS": null }];

  _DatabaseService;
  _headline: string;
  neighborhoodList = [];

  constructor(private http: HttpClient, private mapSelectionService: MapSelectionService) {
    this._DatabaseService = new DatabaseService(http)
  }

  ngOnInit() {
    this.getData()
    this.mapSelectionService.currentSelection.subscribe(selection => { this.updateTimeline(selection); });

  }

  updateTimeline(neighborhood) {
    if (neighborhood == null)
      neighborhood = -1

    var neighborhoodName = "Timeline";

    var neighborhoodElement = this.neighborhoodList.find(n => n["NEIGHBORHOOD_ID"] == neighborhood);

    if (neighborhoodElement == null) {
      neighborhood = -1;
    } else {
      neighborhoodName = neighborhoodElement["DISPLAY_NAME"];
    }

    this._headline = neighborhoodName;
    this.getDataForNeighborhood(neighborhood)

  }

  getData() {
    this._DatabaseService.getEvents().subscribe(
      data => {
        this.timelineData = data.sort((x, y) => (new Date(x.EVENT_DATE)).getTime() - (new Date(y.EVENT_DATE)).getTime())
          .map(x => {
            x.EVENT_DATE = (new Date(x.EVENT_DATE)).toLocaleDateString()

            var neighborhoodItem = this.neighborhoodList.find(n => n["NEIGHBORHOOD_ID"] == x["NEIGHBORHOOD_ID"]);
            if (neighborhoodItem != null) {
              x.DISPLAY_NAME = neighborhoodItem["DISPLAY_NAME"];
            }

            return x;
          })
      },
      err => { console.log(err) },
      () => { }
    )

    this._DatabaseService.getNeighborhoods().subscribe(
      data => {
        this.neighborhoodList = data;
      }
    )
  }

  getDataForNeighborhood(neighborhood) {

    if (neighborhood == -1) {
      this.getData();
      return;
    }

    this._DatabaseService.getEventsFromNeighborhood(neighborhood).subscribe(
      data => {
        this.timelineData = data.sort((x, y) => (new Date(x.EVENT_DATE)).getTime() - (new Date(y.EVENT_DATE)).getTime())
          .map(x => {
            x.EVENT_DATE = (new Date(x.EVENT_DATE)).toLocaleDateString()
            return x;
          })
      },
      err => { console.log(err) },
      () => { }
    )

    this._DatabaseService.getNeighborhoods().subscribe(
      data => {
        this.neighborhoodList = data;
      }
    )
  }

}
