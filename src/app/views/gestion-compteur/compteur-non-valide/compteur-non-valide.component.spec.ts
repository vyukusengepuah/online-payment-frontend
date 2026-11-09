import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteurNonValideComponent } from './compteur-non-valide.component';

describe('CompteurNonValideComponent', () => {
  let component: CompteurNonValideComponent;
  let fixture: ComponentFixture<CompteurNonValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteurNonValideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteurNonValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
