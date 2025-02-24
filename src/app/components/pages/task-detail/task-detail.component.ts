import { Component, ElementRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { BaseApiService } from '../../../services/base-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  imports: [
    MatCardContent,
    MatCard,
    ReactiveFormsModule,
    MatError,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  templateUrl: './task-detail.component.html',
  standalone: true,
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  isEditMode = signal(false);
  taskId = signal('');
  listId = signal('');
  baseApiService = inject(BaseApiService);
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  location = inject(Location);
  subscriptions = new Subscription();
  taskForm = signal<FormGroup>(this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
  }));

  ngOnInit() {
    this.getQueryParamsValue();
  }

  getQueryParamsValue(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const listId = params.get('listId');
      const taskId = params.get('taskId');
      if(listId){
        this.listId.set(listId);
      }
      if (taskId) {
        this.taskId.set(taskId);
        this.isEditMode.set(true);
        this.setFormDataInEditMode();
      } else {
        this.isEditMode.set(false);
      }
      console.log('List ID:', this.listId());
    });
  }

  setFormDataInEditMode(): void {
    const subscription = this.baseApiService.getTaskById(this.taskId()).subscribe({
      next: (res) => {
        this.taskForm().patchValue(res);
      },
      error: () => {
      }
    });
    this.subscriptions.add(subscription);
  }

  onSubmit() {
    // todo add spinner
    if (this.taskForm().invalid) {
      alert('Not COMPLETED');
      return;
    }
    const task = {...this.taskForm().value , list : this.listId()};

    const api = this.isEditMode() ? this.baseApiService.createTask({
      ...task,
      id: this.taskId()
    }) : this.baseApiService.createTask(task);

    const subscription = api.subscribe(
      {
        next: () => {
          alert('DONE');
          this.taskForm().reset();
          this.location.back();
        },
        error: () => {
          alert('ERROR');
        }
      }
    );
    this.subscriptions.add(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openDatePicker(picker: MatDatepicker<any>) {
    picker.open();
  }
}
