import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBustypeComponent } from './add-edit-bustype.component';

describe('AddEditBustypeComponent', () => {
  let component: AddEditBustypeComponent;
  let fixture: ComponentFixture<AddEditBustypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBustypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBustypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
