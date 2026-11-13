import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitierPaiementComponent } from './initier-paiement.component';

describe('InitierPaiementComponent', () => {
  let component: InitierPaiementComponent;
  let fixture: ComponentFixture<InitierPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitierPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitierPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
