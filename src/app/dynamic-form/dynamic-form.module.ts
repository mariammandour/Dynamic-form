import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from '../components/toast/toast.module';
import { CapitalizeWordsPipe } from '../pipes/capitalize-words.pipe';


@NgModule({
  declarations: [
    DynamicFormComponent,
    CapitalizeWordsPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports:[
    DynamicFormComponent,
    
  ]
})
export class DynamicFormModule { }
