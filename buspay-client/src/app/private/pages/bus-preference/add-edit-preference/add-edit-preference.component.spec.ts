import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPreferenceComponent } from './add-edit-preference.component';

describe('AddEditPreferenceComponent', () => {
  let component: AddEditPreferenceComponent;
  let fixture: ComponentFixture<AddEditPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPreferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
