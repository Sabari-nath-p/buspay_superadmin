import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTypeComponent } from './bus-type.component';

describe('BusTypeComponent', () => {
  let component: BusTypeComponent;
  let fixture: ComponentFixture<BusTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
