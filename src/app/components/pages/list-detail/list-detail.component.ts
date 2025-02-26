import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { BaseComponentComponent } from '../../share/base-component/base-component.component';

@Component({
  selector: 'app-list-detail',
  imports: [
    MatFormField,
    MatDatepickerToggle,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    ReactiveFormsModule,
    MatCardContent,
    MatCard,
    MatSlideToggle,
    MatLabel,
    MatError
  ],
  templateUrl: './list-detail.component.html',
  standalone: true,
  styleUrl: './list-detail.component.scss'
})
export class ListDetailComponent extends BaseComponentComponent implements OnInit, OnDestroy {
  listForm = signal<FormGroup>(this.formBuilder.group({
    title: ['', Validators.required],
    isMain: [false],
    date: ['', Validators.required],
  }));

  ngOnInit() {
    this.detectEditMode();
  }

  detectEditMode(): void {
    const listId = this.activatedRoute.snapshot.paramMap.get('id');
    if (listId) {
      this.listId.set(listId);
      this.isEditMode.set(true);
      this.setFormDataInEditMode();
    } else {
      this.isEditMode.set(false);
    }
  }

  setFormDataInEditMode(): void {
    const subscription = this.baseApiService.getListById(this.listId()).subscribe({
      next: (res) => {
        this.listForm().patchValue(res);
      },
      error: () => {
      }
    });
    this.subscriptions.add(subscription);
  }

  onSubmit() {
    if (this.listForm().invalid) {
      alert('not completed');
      return;
    }
    const task = this.listForm().value;
    const api = this.isEditMode() ? this.baseApiService.updateList(this.listId(), {
      ...task,
      id: this.listId()
    }) : this.baseApiService.createList(task);

    const subscription = api.subscribe(
      {
        next: () => {
          this.listForm().reset();
          alert('DONE');
          this.location.back();
        },
        error: () => {
          alert('ERROR');
        }
      }
    );
    this.subscriptions.add(subscription);
  }
}
