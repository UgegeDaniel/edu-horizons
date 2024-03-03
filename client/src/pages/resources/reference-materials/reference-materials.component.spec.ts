import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceMaterialsComponent } from './reference-materials.component';

describe('ReferenceMaterialsComponent', () => {
  let component: ReferenceMaterialsComponent;
  let fixture: ComponentFixture<ReferenceMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceMaterialsComponent]
    });
    fixture = TestBed.createComponent(ReferenceMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
