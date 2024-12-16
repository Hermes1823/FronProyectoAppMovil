import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkModalPage } from './work-modal.page';

describe('WorkModalPage', () => {
  let component: WorkModalPage;
  let fixture: ComponentFixture<WorkModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
