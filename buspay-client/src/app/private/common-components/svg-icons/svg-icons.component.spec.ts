import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconsComponent } from './svg-icons.component';

describe('SvgIconsComponent', () => {
  let component: SvgIconsComponent;
  let fixture: ComponentFixture<SvgIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
