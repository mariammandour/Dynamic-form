import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IForm, IFormControl } from '../../interface/form.interface';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {
  @Input() dynamicForm!: FormGroup;
  @Input() formConfig!:IForm;
  
  getValues(control: IFormControl, nestedControl?: IFormControl) {
    if (nestedControl) {
      return this.dynamicForm.get(control.name)?.get(nestedControl.name)?.value;
    } else {
      return this.dynamicForm.get(control.name)?.value;
    }
  }

  getStatus(control: IFormControl, nestedControl?: IFormControl) {
    if (nestedControl) {
      return this.dynamicForm.get(control.name)?.get(nestedControl.name)?.valid ? 'table-success' : 'table-danger';
    } else {
      return this.dynamicForm.get(control.name)?.valid ? 'table-success' : 'table-danger';
    }
  }
}
