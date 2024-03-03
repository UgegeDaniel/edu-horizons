import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChatComponent } from './student-chat.component';

describe('StudentChatComponent', () => {
  let component: StudentChatComponent;
  let fixture: ComponentFixture<StudentChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentChatComponent]
    });
    fixture = TestBed.createComponent(StudentChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
