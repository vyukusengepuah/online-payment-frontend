import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementHistoriqueComponent } from './paiement-historique.component';

describe('PaiementHistoriqueComponent', () => {
  let component: PaiementHistoriqueComponent;
  let fixture: ComponentFixture<PaiementHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
