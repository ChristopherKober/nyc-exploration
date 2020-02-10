import { Component, OnInit } from '@angular/core';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectNeighborhood(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var neighborhoodName = target.id;
    console.log("Clicked. " + target.id);
    
  }

}
