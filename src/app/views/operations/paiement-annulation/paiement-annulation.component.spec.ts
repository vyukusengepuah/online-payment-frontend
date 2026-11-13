import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementAnnulationComponent } from './paiement-annulation.component';

describe('PaiementAnnulationComponent', () => {
  let component: PaiementAnnulationComponent;
  let fixture: ComponentFixture<PaiementAnnulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementAnnulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
