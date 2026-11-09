import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerReactionComponent } from './cashpower-reaction.component';

describe('CashpowerReactionComponent', () => {
  let component: CashpowerReactionComponent;
  let fixture: ComponentFixture<CashpowerReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerReactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
