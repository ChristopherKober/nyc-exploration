import { Component, OnInit } from '@angular/core';
import { MapSelectionService } from '../map-selection.service'
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {

  mapSelection: string;
  _DatabaseService;

  neighborhoodList = [];
  visitedNeighborhoods = [];


  constructor(private http: HttpClient, private mapSelectionService: MapSelectionService) {
    this._DatabaseService = new DatabaseService(http)
  }

  ngOnInit() {
    this.mapSelectionService.currentSelection.subscribe(selection => {
      this.mapSelection = selection
      this.colorizeTimeline();
    });

    this.getData();
  }

  selectNeighborhood(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var neighborhoodName = target.id;
    this.mapSelectionService.setSelection(neighborhoodName);
  }

  colorizeTimeline() {
    var paths = document.getElementsByTagName('path');

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var id = path.id;

      var colorized = false;

      if (this.mapSelection == null) {
        for (var j = 0; j < this.visitedNeighborhoods.length; j++) {
          if (this.visitedNeighborhoods[j]["NEIGHBORHOOD_ID"] == id) {
            colorized = true;
            break;
          }
        }
      } else {
        colorized = id == this.mapSelection;
      }

      if (colorized) {
        paths[i].style.fill = '';
      } else {
        paths[i].style.fill = 'grey';
      }

    }
  }

  getData() {

    this._DatabaseService.getVisitedNeighborhoods().subscribe(
      data => {
        this.visitedNeighborhoods = data;
        this.colorizeTimeline();
      }
    )
  }
}
