import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEmailVerifyComponent } from './agent-email-verify.component';

describe('AgentEmailVerifyComponent', () => {
  let component: AgentEmailVerifyComponent;
  let fixture: ComponentFixture<AgentEmailVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentEmailVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentEmailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
