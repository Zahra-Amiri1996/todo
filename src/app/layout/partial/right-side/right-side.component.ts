import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-right-side',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './right-side.component.html',
  standalone: true,
  styleUrl: './right-side.component.scss'
})
export class RightSideComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'list',
      icon: 'fal fa-home',
      label: 'لیست کارهای روزمره',
    },
    {
      routeLink: 'completed-task',
      icon: 'fal fa-box-open',
      label: 'لیست کارهای انجام شده',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
