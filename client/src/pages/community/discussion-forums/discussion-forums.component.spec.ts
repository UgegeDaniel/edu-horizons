import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionForumsComponent } from './discussion-forums.component';

describe('DiscussionForumsComponent', () => {
  let component: DiscussionForumsComponent;
  let fixture: ComponentFixture<DiscussionForumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussionForumsComponent]
    });
    fixture = TestBed.createComponent(DiscussionForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
