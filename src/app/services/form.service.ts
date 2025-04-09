import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  createField(type: string): FormGroup {
    const control = this.fb.group({
      type: [type],
      label: ['', Validators.required],
      placeholder: [type === 'text' || type === 'textarea' ? '' : null],
      required: [false],
      selectedValue: [null],
      options: this.fb.array([]),
    });

    if (type === 'text' || type === 'textarea') {
      control.get('placeholder')?.setValidators([Validators.required]);
    }

    return control;
  }

  createOption(value: string = ''): FormGroup {
    return this.fb.group({
      value: [value, Validators.required],
    });
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      fields: this.fb.array([]),
    });
  }
}
