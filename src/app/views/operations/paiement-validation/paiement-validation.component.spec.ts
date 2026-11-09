import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementValidationComponent } from './paiement-validation.component';

describe('PaiementValidationComponent', () => {
  let component: PaiementValidationComponent;
  let fixture: ComponentFixture<PaiementValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
