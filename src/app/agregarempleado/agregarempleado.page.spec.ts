import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarempleadoPage } from './agregarempleado.page';

describe('AgregarempleadoPage', () => {
  let component: AgregarempleadoPage;
  let fixture: ComponentFixture<AgregarempleadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarempleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
