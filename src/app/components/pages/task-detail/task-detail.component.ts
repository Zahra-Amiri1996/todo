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
    MatButtonModule,  MatDatepickerModule,
    MatNativeDateModule,
  ],

  templateUrl: './task-detail.component.html',
  standalone: true,
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  isEditMode = signal(false);
  taskId = signal('');
  baseApiService = inject(BaseApiService);
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  subscriptions = new Subscription();
  taskForm = signal<FormGroup>(this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],

  }));

  ngOnInit() {
    this.detectEditMode();
  }

  detectEditMode(): void {
    const taskId = this.activatedRoute.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskId.set(taskId);
      this.isEditMode.set(true);
    } else {
      this.isEditMode.set(false);
    }
  }

  onSubmit() {
    // todo add spinner
    if (this.taskForm().invalid) {
      alert('فرمت رو کامل پر نکردی :(');
      return;
    }
    const task = this.taskForm().value;

    const api = this.isEditMode() ? this.baseApiService.createTask({
      ...task,
      id: this.taskId()
    }) : this.baseApiService.createTask(task);

    const subscription = api.subscribe(
      {
        next: () => {
          alert('کار به خوبیییییی و موفقیت ثبت شد!!!!! :)');
          this.taskForm().reset();
        },
        error: () => {
          alert('متاسفانه کار ثبت نشد میتونی دوباره تلاش کنی :)');
        }
      }
    );
    this.subscriptions.add(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openDatePicker(picker : MatDatepicker<any>){
    picker.open()
  }
}
