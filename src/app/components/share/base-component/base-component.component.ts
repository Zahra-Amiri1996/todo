import { Directive, inject, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseApiService } from '../../../services/base-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormBuilder } from '@angular/forms';
import { TaskModel } from '../../../models/task.model';

@Directive()
export abstract class BaseComponentComponent implements OnDestroy {
  subscriptions = new Subscription();
  // Injects
  baseApiService = inject(BaseApiService);
  location = inject(Location);
  router = inject(Router);
  dialog = inject(MatDialog);
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  // common signal variables
  isEditMode = signal(false);
  taskId = signal('');
  listId = signal('');


  openDatePicker(picker: MatDatepicker<any>) {
    picker.open();
  }

  changeState(row: TaskModel, ev: MouseEvent): void {
    if (row._id) {
      row.done = (ev.target as HTMLInputElement).checked;
      const subscription = this.baseApiService.updateTask(row._id, row).subscribe({
        next: (res) => {
        },
        error: () => {
          alert('we have an error :(');
        }
      });
      this.subscriptions.add(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
