import { TestBed, inject } from '@angular/core/testing';

import { PokeSearchService } from './poke-search.service';

describe('PokeSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokeSearchService]
    });
  });

  it('should be created', inject([PokeSearchService], (service: PokeSearchService) => {
    expect(service).toBeTruthy();
  }));
});
