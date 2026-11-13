import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDeDonneesComponent } from './base-de-donnees.component';

describe('BaseDeDonneesComponent', () => {
  let component: BaseDeDonneesComponent;
  let fixture: ComponentFixture<BaseDeDonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDeDonneesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDeDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
