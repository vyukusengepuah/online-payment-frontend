import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenirTokenComponent } from './obtenir-token.component';

describe('ObtenirTokenComponent', () => {
  let component: ObtenirTokenComponent;
  let fixture: ComponentFixture<ObtenirTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenirTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenirTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
