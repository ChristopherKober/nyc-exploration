import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapSelectionService {

  private selectionSource = new BehaviorSubject<string>(null);
  currentSelection = this.selectionSource.asObservable();

  private visitedSource = new BehaviorSubject<Array<number>>([]);
  visitedList = this.visitedSource.asObservable();

  constructor() { }

  setSelection(neighborhood) {
    if (neighborhood != this.selectionSource.value) {
      this.selectionSource.next(neighborhood);
    } else {
      this.selectionSource.next(null)
    }
  }
      
  setVisitedList(list) {
    this.visitedSource.next(list);
  }
}
