import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashpowerAnnulationComponent } from './cashpower-annulation.component';

describe('CashpowerAnnulationComponent', () => {
  let component: CashpowerAnnulationComponent;
  let fixture: ComponentFixture<CashpowerAnnulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashpowerAnnulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashpowerAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
