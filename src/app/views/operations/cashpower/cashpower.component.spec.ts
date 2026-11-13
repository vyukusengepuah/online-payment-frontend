import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerComponent } from './cashpower.component';

describe('CashpowerComponent', () => {
  let component: CashpowerComponent;
  let fixture: ComponentFixture<CashpowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
