import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementGuichetComponent } from './paiement-guichet.component';

describe('PaiementGuichetComponent', () => {
  let component: PaiementGuichetComponent;
  let fixture: ComponentFixture<PaiementGuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementGuichetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
