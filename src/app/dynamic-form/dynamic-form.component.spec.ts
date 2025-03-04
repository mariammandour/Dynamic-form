import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { IForm } from '../interface/form.interface';
import { FormPreviewComponent } from './form-preview/form-preview.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const mockFormConfig: IForm = {
    formTitle: 'Register',
    formControls: [
      {
        name: 'firstName',
        label: 'firstName',
        type: 'text',
        value: '',
        validators: [
          { validatorName: 'required', message: 'First name is required' },
        ],
      },
      {
        name: 'email',
        label: 'email',
        type: 'text',
        value: '',
        validators: [{ validatorName: 'email', message: 'Invalid email' }],
      },
    ],
  };

  beforeEach(async () => {
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToast']);

    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent, FormPreviewComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.formConfig = mockFormConfig;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form title', () => {
    expect(component.formConfig.formTitle).toBe("Register");
  });

  it('should initialize the form correctly', () => {
    expect(component.dynamicForm.contains('firstName')).toBeTrue();
    expect(component.dynamicForm.contains('email')).toBeTrue();
  });

  it('should load form data from local storage if available', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ firstName: 'test', email: 'test@example.com' })
    );

    component.ngOnInit();

    expect(component.dynamicForm.value).toEqual({
      firstName: 'test',
      email: 'test@example.com',
    });
  });

  it('should save form changes to local storage', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    component.dynamicForm.patchValue({ firstName: 'test' });

    expect(setItemSpy).toHaveBeenCalledWith(
      'formData',
      JSON.stringify({ firstName: 'test', email: null })
    );
  });

  it('should show a toast message when the form is submitted successfully', () => {
    component.dynamicForm.patchValue({
      firstName: 'test',
      email: 'test@example.com',
    });
    component.onSubmit();

    expect(toastServiceSpy.showToast).toHaveBeenCalledWith(
      'Form submitted successfully!',
      'success'
    );
  });

  it('should reset the form when onReset is called', () => {
    component.dynamicForm.patchValue({ firstName: 'Test' });
    component.onReset();

    expect(component.dynamicForm.value).toEqual({
      firstName: null,
      email: null,
    });
  });
});
