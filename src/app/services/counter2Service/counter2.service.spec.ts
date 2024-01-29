import { TestBed } from '@angular/core/testing';

import { Counter2Service } from './counter2.service';

describe('Counter2Service', () => {
  let service: Counter2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Counter2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
