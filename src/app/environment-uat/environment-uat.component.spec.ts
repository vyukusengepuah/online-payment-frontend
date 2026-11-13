import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentUatComponent } from './environment-uat.component';

describe('EnvironmentUatComponent', () => {
  let component: EnvironmentUatComponent;
  let fixture: ComponentFixture<EnvironmentUatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentUatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentUatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
