import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { TabItem } from '../../../shared/models/tabs-panel.model';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-tabs-panel',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './tabs-panel.component.html',
  styleUrl: './tabs-panel.component.scss',
})
export class TabsPanelComponent {
  @Input() tabs: TabItem[] = [];
  @Output() tabSelected = new EventEmitter<string>();

  selectedTemplate: TemplateRef<any> | null = null;

  ngOnInit(): void {
    if (this.tabs) {
      this.selectedTab(this.tabs[0].id);
      console.log("Tabs : ",this.tabs)
    }
  }

  selectedTab(tabId: string): void {
    const selectedTab = this.tabs.find((tab) => tab.id === tabId);
    if (selectedTab) {
      this.selectedTemplate = selectedTab.template;
      this.tabSelected.emit(tabId);
    }
  }
}
