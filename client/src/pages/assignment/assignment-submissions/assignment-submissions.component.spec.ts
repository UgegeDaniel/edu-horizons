import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionsComponent } from './assignment-submissions.component';

describe('AssignmentSubmissionsComponent', () => {
  let component: AssignmentSubmissionsComponent;
  let fixture: ComponentFixture<AssignmentSubmissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentSubmissionsComponent]
    });
    fixture = TestBed.createComponent(AssignmentSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
