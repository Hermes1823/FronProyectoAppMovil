import { TestBed } from '@angular/core/testing';

import { DetalleViajeService } from './detalle-viaje.service';

describe('DetalleViajeService', () => {
  let service: DetalleViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
