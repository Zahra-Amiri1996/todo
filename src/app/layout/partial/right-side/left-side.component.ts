import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-left-side',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './left-side.component.html',
  standalone: true,
  styleUrl: './left-side.component.scss'
})
export class LeftSideComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'list',
      icon: 'fal fa-home',
      label: 'Main list',
    },
    {
      routeLink: 'another-list',
      icon: 'fa fa-smile',
      label: 'another list',
    },
    {
      routeLink: 'completed-task',
      icon: 'fal fa-box-open',
      label: 'completed task',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
