import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementCreationComponent } from './paiement-creation.component';

describe('PaiementCreationComponent', () => {
  let component: PaiementCreationComponent;
  let fixture: ComponentFixture<PaiementCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
