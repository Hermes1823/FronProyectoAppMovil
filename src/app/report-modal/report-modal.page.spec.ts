import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportModalPage } from './report-modal.page';

describe('ReportModalPage', () => {
  let component: ReportModalPage;
  let fixture: ComponentFixture<ReportModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
