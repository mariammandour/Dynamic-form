import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPreviewComponent } from './form-preview.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { registerFormConfig } from '../../constants/registerForm.constant';

describe('FormPreviewComponent', () => {
  let component: FormPreviewComponent;
  let fixture: ComponentFixture<FormPreviewComponent>;
  let formBuilder: FormBuilder;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPreviewComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreviewComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.formConfig = registerFormConfig;
    component.dynamicForm = formBuilder.group({});
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
