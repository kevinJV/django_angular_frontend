import { TestBed } from '@angular/core/testing';

import { JuegosApiService } from './juegos-api.service';

describe('JuegosApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JuegosApiService = TestBed.get(JuegosApiService);
    expect(service).toBeTruthy();
  });
});
