import { TestBed } from '@angular/core/testing';

import { MapSelectionService } from './map-selection.service';

describe('MapSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapSelectionService = TestBed.get(MapSelectionService);
    expect(service).toBeTruthy();
  });
});
