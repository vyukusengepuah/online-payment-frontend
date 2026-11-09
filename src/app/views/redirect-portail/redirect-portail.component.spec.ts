import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectPortailComponent } from './redirect-portail.component';

describe('RedirectPortailComponent', () => {
  let component: RedirectPortailComponent;
  let fixture: ComponentFixture<RedirectPortailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectPortailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectPortailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
