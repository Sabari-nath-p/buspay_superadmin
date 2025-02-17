import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSettlementsComponent } from './list-settlements.component';

describe('ListSettlementsComponent', () => {
  let component: ListSettlementsComponent;
  let fixture: ComponentFixture<ListSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSettlementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
