import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripModalPage } from './trip-modal.page';

describe('TripModalPage', () => {
  let component: TripModalPage;
  let fixture: ComponentFixture<TripModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TripModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
