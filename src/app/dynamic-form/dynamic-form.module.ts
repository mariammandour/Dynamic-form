import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from '../components/toast/toast.module';


@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports:[
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
