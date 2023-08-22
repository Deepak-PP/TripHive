import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyRequestViewComponent } from './agency-request-view.component';

describe('AgencyRequestViewComponent', () => {
  let component: AgencyRequestViewComponent;
  let fixture: ComponentFixture<AgencyRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyRequestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
