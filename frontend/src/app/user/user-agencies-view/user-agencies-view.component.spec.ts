import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgenciesViewComponent } from './user-agencies-view.component';

describe('UserAgenciesViewComponent', () => {
  let component: UserAgenciesViewComponent;
  let fixture: ComponentFixture<UserAgenciesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgenciesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAgenciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
