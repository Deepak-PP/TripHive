import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyLayoutComponent } from './agency-layout.component';

describe('AgencyLayoutComponent', () => {
  let component: AgencyLayoutComponent;
  let fixture: ComponentFixture<AgencyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
