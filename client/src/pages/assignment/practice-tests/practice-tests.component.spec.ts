import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTestsComponent } from './practice-tests.component';

describe('PracticeTestsComponent', () => {
  let component: PracticeTestsComponent;
  let fixture: ComponentFixture<PracticeTestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeTestsComponent]
    });
    fixture = TestBed.createComponent(PracticeTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
