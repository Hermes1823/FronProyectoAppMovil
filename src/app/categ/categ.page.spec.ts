import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategPage } from './categ.page';

describe('CategPage', () => {
  let component: CategPage;
  let fixture: ComponentFixture<CategPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
