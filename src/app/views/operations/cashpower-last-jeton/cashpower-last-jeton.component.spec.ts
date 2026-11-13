import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerLastJetonComponent } from './cashpower-last-jeton.component';

describe('CashpowerLastJetonComponent', () => {
  let component: CashpowerLastJetonComponent;
  let fixture: ComponentFixture<CashpowerLastJetonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerLastJetonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerLastJetonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
