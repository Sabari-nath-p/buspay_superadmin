import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementsListComponent } from './settlements-list.component';

describe('SettlementsListComponent', () => {
  let component: SettlementsListComponent;
  let fixture: ComponentFixture<SettlementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
