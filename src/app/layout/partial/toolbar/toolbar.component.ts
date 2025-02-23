import { Component, output, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatIcon,
    MatToolbar,
    MatIconButton
  ],
  templateUrl: './toolbar.component.html',
  standalone: true,
  styleUrl: './toolbar.component.scss',
  encapsulation : ViewEncapsulation.None
})
export class ToolbarComponent {
  menuToggle = output();

  toggleMenu() {
    this.menuToggle.emit();
  }
}
