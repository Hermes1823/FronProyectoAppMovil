import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GastPage } from './gast.page';

describe('GastPage', () => {
  let component: GastPage;
  let fixture: ComponentFixture<GastPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
