import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridActionCellRendererComponent } from './grid-action-cell-renderer.component';

describe('GridActionCellRendererComponent', () => {
  let component: GridActionCellRendererComponent;
  let fixture: ComponentFixture<GridActionCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridActionCellRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridActionCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
