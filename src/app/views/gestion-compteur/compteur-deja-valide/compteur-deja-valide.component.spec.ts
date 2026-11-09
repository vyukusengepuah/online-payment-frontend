import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteurDejaValideComponent } from './compteur-deja-valide.component';

describe('CompteurDejaValideComponent', () => {
  let component: CompteurDejaValideComponent;
  let fixture: ComponentFixture<CompteurDejaValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteurDejaValideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteurDejaValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
