import { TestBed } from '@angular/core/testing';

import { AgencyInterceptor } from './agency.interceptor';

describe('AgencyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AgencyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AgencyInterceptor = TestBed.inject(AgencyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
