import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  form: FormGroup;

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
    const options = this.fields.at(fieldIndex).get('options') as FormArray;
    options.push(this.formService.createOption());
  }

  removeOption(fieldIndex: number, optionIndex: number) {
    const options = this.fields.at(fieldIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }

  submitForm() {
    if (this.form.invalid) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log('Form Data:', this.form.value);
    alert('🎉 Form submitted successfully!');
  }
}
