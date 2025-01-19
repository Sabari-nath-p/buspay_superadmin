import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPreferenceComponent } from './bus-preference.component';

describe('BusPreferenceComponent', () => {
  let component: BusPreferenceComponent;
  let fixture: ComponentFixture<BusPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusPreferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
