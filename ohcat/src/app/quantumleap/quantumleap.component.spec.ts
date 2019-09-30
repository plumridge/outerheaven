import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantumLeapComponent } from './quantumleap.component';

describe('QuantumLeapComponent', () => {
  let component: QuantumLeapComponent;
  let fixture: ComponentFixture<QuantumLeapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantumLeapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantumLeapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
