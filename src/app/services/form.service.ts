import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  createField(type: string): FormGroup {
    return this.fb.group({
      type: [type],
      label: ['', Validators.required],
      placeholder: [type === 'text' || type === 'textarea' ? '' : null, type === 'text' || type === 'textarea' ? Validators.required : []],
      required: [false],
      selectedValue: [],
      options: this.fb.array(type === 'dropdown' || type === 'radio' ? [this.createOption()] : []), // Only for dropdown & radio
    });
  }

  createOption(): FormGroup {
    return this.fb.group({
      value: ['', ],
    });
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      fields: this.fb.array([]),
    });
  }
}
