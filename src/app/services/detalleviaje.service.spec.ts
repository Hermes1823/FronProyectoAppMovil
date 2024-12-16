import { TestBed } from '@angular/core/testing';

import { DetalleviajeService } from './detalleviaje.service';

describe('DetalleviajeService', () => {
  let service: DetalleviajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleviajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
