import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCompteurComponent } from './gestion-compteur.component';

describe('GestionCompteurComponent', () => {
  let component: GestionCompteurComponent;
  let fixture: ComponentFixture<GestionCompteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCompteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCompteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
