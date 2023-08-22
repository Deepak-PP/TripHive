import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserServicesListComponent } from './user-services-list.component';

describe('UserServicesListComponent', () => {
  let component: UserServicesListComponent;
  let fixture: ComponentFixture<UserServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserServicesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
