import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsLibraryComponent } from './icons-library.component';

describe('IconsLibraryComponent', () => {
  let component: IconsLibraryComponent;
  let fixture: ComponentFixture<IconsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
