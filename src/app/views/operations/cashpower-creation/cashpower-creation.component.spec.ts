import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerCreationComponent } from './cashpower-creation.component';

describe('CashpowerCreationComponent', () => {
  let component: CashpowerCreationComponent;
  let fixture: ComponentFixture<CashpowerCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
