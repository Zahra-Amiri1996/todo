import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    NgClass,
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();
  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });
}
