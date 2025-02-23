import {
  Component, computed,
  effect,
  EffectRef, HostListener,
  inject, input,
  OnDestroy,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './partial/toolbar/toolbar.component';
import { DeviceDetectionService } from '../services/device-detection-service';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MainComponent } from './partial/main/main.component';
import { RightSideComponent } from './partial/right-side/right-side.component';

@Component({
  selector: 'app-layout',
  imports: [
    MainComponent,
    RightSideComponent,
  ],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
