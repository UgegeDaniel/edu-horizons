import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorChatComponent } from './tutor-chat.component';

describe('TutorChatComponent', () => {
  let component: TutorChatComponent;
  let fixture: ComponentFixture<TutorChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorChatComponent]
    });
    fixture = TestBed.createComponent(TutorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
