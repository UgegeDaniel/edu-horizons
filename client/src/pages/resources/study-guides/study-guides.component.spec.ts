import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGuidesComponent } from './study-guides.component';

describe('StudyGuidesComponent', () => {
  let component: StudyGuidesComponent;
  let fixture: ComponentFixture<StudyGuidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyGuidesComponent]
    });
    fixture = TestBed.createComponent(StudyGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
