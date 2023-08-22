import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTimeComponent } from './services-time.component';

describe('ServicesTimeComponent', () => {
  let component: ServicesTimeComponent;
  let fixture: ComponentFixture<ServicesTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
