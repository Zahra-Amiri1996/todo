import { Component, Inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './delete-dialog.component.html',
  standalone: true,
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  message = signal<string>('');

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message.set(data.message);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

