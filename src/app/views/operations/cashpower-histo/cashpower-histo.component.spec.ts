import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerHistoComponent } from './cashpower-histo.component';

describe('CashpowerHistoComponent', () => {
  let component: CashpowerHistoComponent;
  let fixture: ComponentFixture<CashpowerHistoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerHistoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerHistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
