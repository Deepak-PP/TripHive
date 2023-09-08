import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingViewComponent } from './user-booking-view.component';

describe('UserBookingViewComponent', () => {
  let component: UserBookingViewComponent;
  let fixture: ComponentFixture<UserBookingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
