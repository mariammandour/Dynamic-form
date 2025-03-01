import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { registerFormConfig } from '../constants/registerForm.constant';
describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormComponent);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.formConfig = registerFormConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.dynamicForm).toBeDefined();
  });
  
  it('should have a form title', () => {
    expect(component.formConfig.formTitle).toBe(registerFormConfig.formTitle);
  });

  it('should have a form controls', () => {
    expect(component.formConfig.formControls).toBe(registerFormConfig.formControls);
  });
  
});
