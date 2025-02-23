import {
  Component,
  effect,
  EffectRef,
  inject,
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

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContent,
    RouterOutlet,
    MatSidenavContainer,
    MatIcon,
    MatListItem,
    MatSidenav,
    ToolbarComponent,
    MatNavList,
    RouterLink,
    NgClass,
    MatDrawer,
    MatDrawerContainer,
    MatButton,
    NgIf
  ],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy, OnInit {
  deviceDetectionServiceService = inject(DeviceDetectionService);
  sidenav = viewChild(MatSidenav);
  isMobile = signal(false);
  isCollapsed = signal(false);
  items = signal<{ id: number, name: string, route: string, icon: string }[]>([]);

  private isMobileEffectRef: EffectRef;

  constructor() {
    this.isMobileEffectRef = effect(() => {
      this.isMobile.set(this.deviceDetectionServiceService.isMobile());
    });
  }

  toggleSidebar() {
    if (this.isMobile()) {
      this.sidenav()?.toggle();
      this.isCollapsed.set(true);
    } else {
      this.sidenav()?.open();
      this.isCollapsed.set(!this.isCollapsed());
    }
  }

  ngOnDestroy(): void {
    this.isMobileEffectRef.destroy();
  }

  setStaticRoutes() {
    this.items.set([
      {id: 1, name: 'لیست کارهای روزمره', icon: 'view_list', route: 'home'},
      {id: 2, name: 'لیست کارهای روزمره', icon: 'done_outline', route: 'completed-task'},
    ]);
  }

  ngOnInit(): void {
    this.setStaticRoutes();
  }
}
