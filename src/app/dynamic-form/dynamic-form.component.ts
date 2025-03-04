import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../interface/form.interface';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input() formConfig!: IForm;
  dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private toastService: ToastService) {}

  ngOnInit() {
    if (this.formConfig?.formControls) {
      this.dynamicForm = this.createFormGroup(this.formConfig.formControls);
    }

    const formData = this.getLocalStorage('formData');
    if (formData) {
      this.dynamicForm.patchValue(formData);
    }

    this.watchFormChanges();
  }

  createFormGroup(controls: IFormControl[]): FormGroup {
    const formGroup: Record<string, any> = {};
    controls.forEach((control: IFormControl) => {
      formGroup[control.name] = this.createFormControl(control);
    });
    return this.fb.group(formGroup);
  }

  createFormControl(control: IFormControl) {
    let controlValidators: ValidatorFn[] = [];
    if (control.validators) {
      controlValidators = this.checkValidators(control.validators);
    }

    if (control.type === 'nested') {
      const nestedFormGroup: Record<string, any> = {};
      control.nestedControls?.forEach((nestedControl: IFormControl) => {
        nestedFormGroup[nestedControl.name] = [
          nestedControl.value || '',
          this.checkValidators(nestedControl.validators || []),
        ];
      });
      return this.fb.group(nestedFormGroup);
    } else if (control.type === 'array') {
      return this.fb.array([
        this.fb.control(control.value || '', controlValidators),
      ]);
    } else {
      return [control.value || '', controlValidators];
    }
  }

  watchFormChanges() {
    this.dynamicForm.valueChanges.subscribe((values) => {
      this.setLocalStorage('formData', values);
    });
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      this.toastService.showToast('Form submitted successfully!', 'success');
      console.log(this.dynamicForm.value);
      this.dynamicForm.reset();
    } else {
      this.markFormGroupTouched(this.dynamicForm);
    }
  }

  onReset() {
    this.dynamicForm.reset();
  }

  getErrorMessage(control: IFormControl, nestedControl?: IFormControl): string {
    let errorMessage = '';
    let myControl: AbstractControl | null;

    if (nestedControl) {
      const formGroup = this.dynamicForm.get(control.name) as FormGroup;
      myControl = formGroup.get(nestedControl.name);
    } else {
      myControl = this.dynamicForm.get(control.name);
      if (myControl instanceof FormArray) {
        myControl = myControl.controls[0];
      }
    }

    if (myControl?.touched) {
      const validators = nestedControl
        ? nestedControl.validators
        : control.validators;
      validators?.forEach((validator: IValidator) => {
        if (myControl?.hasError(validator.validatorName as string)) {
          errorMessage = validator.message as string;
        }
      });
    }

    return errorMessage;
  }

  checkValidators(validators: IValidator[]): ValidatorFn[] {
    const controlValidators: ValidatorFn[] = [];
    validators.forEach((val: IValidator) => {
      switch (val.validatorName) {
        case 'required':
          controlValidators.push(Validators.required);
          break;
        case 'email':
          controlValidators.push(Validators.email);
          break;
        case 'minlength':
          controlValidators.push(Validators.minLength(val.minLength as number));
          break;
        case 'pattern':
          controlValidators.push(Validators.pattern(val.pattern as string));
          break;
        case 'maxlength':
          controlValidators.push(Validators.maxLength(val.maxLength as number));
          break;
      }
    });
    return controlValidators;
  }

  addNestedControl(control: IFormControl) {
    const formGroup = this.dynamicForm.get(control.name) as FormArray;
    formGroup.push(
      this.fb.control('', this.checkValidators(control.validators || []))
    );
  }

  removeNestedControl(control: IFormControl) {
    const formGroup = this.dynamicForm.get(control.name) as FormArray;
    if (formGroup.length > 1) {
      formGroup.removeAt(formGroup.length - 1);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
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
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getLocalStorage(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }
}
