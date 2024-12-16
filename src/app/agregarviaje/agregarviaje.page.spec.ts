import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarviajePage } from './agregarviaje.page';

describe('AgregarviajePage', () => {
  let component: AgregarviajePage;
  let fixture: ComponentFixture<AgregarviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
