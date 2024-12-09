import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregargastoPage } from './agregargasto.page';

describe('AgregargastoPage', () => {
  let component: AgregargastoPage;
  let fixture: ComponentFixture<AgregargastoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregargastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
