import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../interface/form.interface';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() formConfig!: IForm;
  @ViewChild('successToast') successToast!: ElementRef;

  dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.formConfig?.formControls) {
      const formGroup: any = {};
      this.formConfig.formControls.forEach((control: IFormControl) => {
        let controlValidators: any = [];
        if (control.type === 'nested') {
          const nestedFormGroup: any = {};
          control.nestedControls?.forEach((nestedControl: IFormControl) => {
            let nestedValidators: any = [];
            if (nestedControl.validators) {
              nestedValidators = this.checkValidators(nestedControl.validators);
            }
            nestedFormGroup[nestedControl.name] = [nestedControl.value || '', nestedValidators];
          });
          formGroup[control.name] = this.fb.group(nestedFormGroup);
        } else if (control.type === 'array') {
          const nestedFormGroup: any = [];
          if (control.validators) {
            controlValidators = this.checkValidators(control.validators);
          }
          nestedFormGroup.push(this.fb.control(
            control.value || '',
            controlValidators
          ));
          formGroup[control.name] = this.fb.array(nestedFormGroup);
        }
        else {
          if (control.validators) {
            controlValidators = this.checkValidators(control.validators);
          }
          formGroup[control.name] = [control.value || '', controlValidators];
        }
      });
      this.dynamicForm = this.fb.group(formGroup);
    }

    const formData = this.getLocalStorage('formData');

    if (formData) {
      this.dynamicForm.patchValue(formData);
    }

    this.watchFormChanges();
  }

  watchFormChanges() {
    this.dynamicForm.valueChanges.subscribe((values) => {
      this.setLocalStorage('formData', values);
    });
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      const toast = new Toast(this.successToast.nativeElement);
      toast.show();
      console.log(this.dynamicForm.value);
      this.dynamicForm.reset();
    } else {
      this.markFormGroupTouched(this.dynamicForm);
    }
  }

  onReset() {
    this.dynamicForm.reset();
  }

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

  getErrorMessage(control: IFormControl, nestedControl?: IFormControl): string {
    let errorMessage = '';
    let myControl: any;

    if (nestedControl) {
      const formGroup = this.dynamicForm.get(control.name) as FormGroup;
      myControl = formGroup.get(nestedControl.name);
      if (myControl?.touched) {
        nestedControl.validators?.forEach((validator: IValidator) => {
          if (myControl?.hasError(validator.validatorName as string)) {
            errorMessage = validator.message as string;
          }
        });
      }
    }
    else {
      myControl = this.dynamicForm.get(control.name);
      if (myControl instanceof FormArray) {
        myControl = myControl.controls[0];
      }
      if (myControl?.touched) {
        control.validators?.forEach((validator: IValidator) => {
          if (myControl?.hasError(validator.validatorName as string)) {
            errorMessage = validator.message as string;
          }
        });
      }
    }

    return errorMessage;
  }

  checkValidators(validators: IValidator[]) {
    const controlValidators: any = [];
    if (validators) {
      validators.forEach((val: IValidator) => {
        if (val.validatorName === 'required') controlValidators.push(Validators.required);
        if (val.validatorName === 'email') controlValidators.push(Validators.email);
        if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minLength as number));
        if (val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern as string));
        if (val.validatorName === 'maxlength') controlValidators.push(Validators.maxLength(val.maxLength as number));
      });
    }
    return controlValidators;
  }

  addNestedControl(control: IFormControl) {
    const formGroup = this.dynamicForm.get(control.name) as FormArray;
    let controlValidators: any = [];
    if (control.validators) {
      controlValidators = this.checkValidators(control.validators);
    }
    formGroup.push(this.fb.control('', controlValidators));
  }

  removeNestedControl(control: IFormControl) {
    const formGroup = this.dynamicForm.get(control.name) as FormArray;
    if (formGroup.length > 1) {
      formGroup.removeAt(formGroup.length - 1);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  getControlArray(control: IFormControl): FormArray {
    return this.dynamicForm.get(control.name) as FormArray;

  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

}
