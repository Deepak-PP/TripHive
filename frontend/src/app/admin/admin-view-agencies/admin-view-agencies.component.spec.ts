import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAgenciesComponent } from './admin-view-agencies.component';

describe('AdminViewAgenciesComponent', () => {
  let component: AdminViewAgenciesComponent;
  let fixture: ComponentFixture<AdminViewAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewAgenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
