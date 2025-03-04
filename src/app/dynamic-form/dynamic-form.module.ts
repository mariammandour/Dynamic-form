import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from '../components/toast/toast.module';
import { CapitalizeWordsPipe } from '../pipes/capitalize-words.pipe';
import { SeeMoreLessDirective } from '../directives/see-more-less.directive';
import { FormPreviewComponent } from './form-preview/form-preview.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    CapitalizeWordsPipe,
    SeeMoreLessDirective,
    FormPreviewComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  exports: [DynamicFormComponent, FormPreviewComponent],
})
export class DynamicFormModule {}
