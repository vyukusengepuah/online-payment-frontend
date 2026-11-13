import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerValidationComponent } from './cashpower-validation.component';

describe('CashpowerValidationComponent', () => {
  let component: CashpowerValidationComponent;
  let fixture: ComponentFixture<CashpowerValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
