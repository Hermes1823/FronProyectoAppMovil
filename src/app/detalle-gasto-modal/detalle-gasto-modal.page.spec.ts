import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleGastoModalPage } from './detalle-gasto-modal.page';

describe('DetalleGastoModalPage', () => {
  let component: DetalleGastoModalPage;
  let fixture: ComponentFixture<DetalleGastoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGastoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
