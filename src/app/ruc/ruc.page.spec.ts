import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RucPage } from './ruc.page';

describe('RucPage', () => {
  let component: RucPage;
  let fixture: ComponentFixture<RucPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RucPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
