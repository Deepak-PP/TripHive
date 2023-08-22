import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingSummaryComponent } from './user-booking-summary.component';

describe('UserBookingSummaryComponent', () => {
  let component: UserBookingSummaryComponent;
  let fixture: ComponentFixture<UserBookingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookingSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
