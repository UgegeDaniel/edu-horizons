import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedAssignmentsComponent } from './assigned-assignments.component';

describe('AssignedAssignmentsComponent', () => {
  let component: AssignedAssignmentsComponent;
  let fixture: ComponentFixture<AssignedAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedAssignmentsComponent]
    });
    fixture = TestBed.createComponent(AssignedAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
