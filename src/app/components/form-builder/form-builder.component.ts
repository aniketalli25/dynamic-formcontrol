import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  form: FormGroup;
  submittedData: any[] = [];

  constructor(private formService: FormService) {
    this.form = this.formService.getFormGroup();
  }

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  addField(type: string) {
    this.fields.push(this.formService.createField(type));
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  addOption(fieldIndex: number) {
    const field = this.fields.at(fieldIndex);
    const options = field.get('options') as FormArray;
    const newValue = prompt('Enter option value:');

    if (newValue && !options.value.some((opt: any) => opt.value === newValue)) {
      options.push(this.formService.createOption(newValue));
    } else {
      alert('Option already exists or is empty!');
    }

    const type = field.get('type')?.value;
    if (type === 'dropdown' || type === 'radio') {
      field.get('selectedValue')?.setValidators([Validators.required]);
      field.get('selectedValue')?.updateValueAndValidity();
    }

    // For checkbox, we just allow multiple options to be added (no selectedValue)

  }

  removeOption(fieldIndex: number, optionIndex: number) {
    const options = this.fields.at(fieldIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }

  toggleRequired(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const field = this.fields.at(index);
    const isRequired = input.checked;

    field.get('required')?.setValue(isRequired);

    const type = field.get('type')?.value;

    if (type === 'dropdown' || type === 'radio') {
      const selectedControl = field.get('selectedValue');
      selectedControl?.clearValidators();
      if (isRequired) {
        selectedControl?.setValidators([Validators.required]);
      }
      selectedControl?.updateValueAndValidity();
    }

    if (type === 'text' || type === 'textarea') {
      const placeholderControl = field.get('placeholder');
      placeholderControl?.clearValidators();
      if (isRequired) {
        placeholderControl?.setValidators([Validators.required]);
      }
      placeholderControl?.updateValueAndValidity();
    }
  }

  submitForm() {
    if (this.fields.length === 0) {
      alert('⚠️ Please add at least one field.');
      return;
    }

    if (this.form.invalid) {
      alert('⚠️ Please fix all required fields.');
      return;
    }

    this.submittedData.push(this.form.value);
    this.form.reset();
    (this.form.get('fields') as FormArray).clear();
    alert('🎉 Submitted Successfully!');
  }
}
