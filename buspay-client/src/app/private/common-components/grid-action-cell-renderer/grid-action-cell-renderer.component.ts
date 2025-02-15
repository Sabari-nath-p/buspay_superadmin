import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SvgIconsComponent } from '../svg-icons/svg-icons.component';

@Component({
  selector: 'app-grid-action-cell-renderer',
  standalone: true,
  imports: [CommonModule, SvgIconsComponent],
  templateUrl: './grid-action-cell-renderer.component.html',
  styleUrl: './grid-action-cell-renderer.component.scss',
})
export class GridActionCellRendererComponent {
  params: any;
  isEditable: boolean = false;
  isDeletable: boolean = false;

  agInit(params: any): void {
    this.params = params;
    if (this.params?.onEdit) {
      this.isEditable = true;
    }
    if (this.params?.onDelete) {
      this.isDeletable = true;
    }
  }

  edit() {
    if (this.params?.onEdit) {
      this.params.onEdit(this.params.data);
    }
  }

  delete() {
    if (this.params?.onDelete) {
      this.params.onDelete(this.params.data);
    }
  }
}
