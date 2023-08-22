import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDashComponent } from './agency-dash.component';

describe('AgencyDashComponent', () => {
  let component: AgencyDashComponent;
  let fixture: ComponentFixture<AgencyDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
