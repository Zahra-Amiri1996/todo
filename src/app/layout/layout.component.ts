import {
  Component , HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { MainComponent } from './partial/main/main.component';
import { LeftSideComponent } from './partial/right-side/left-side.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-layout',
  imports: [
    MainComponent,
    LeftSideComponent
  ],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.scss',
  providers: [
    MatDatepickerModule,
  ],
})
export class LayoutComponent implements OnInit{
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
