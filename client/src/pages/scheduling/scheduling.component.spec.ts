import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingComponent } from './scheduling.component';

describe('SchedulingComponent', () => {
  let component: SchedulingComponent;
  let fixture: ComponentFixture<SchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulingComponent]
    });
    fixture = TestBed.createComponent(SchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
