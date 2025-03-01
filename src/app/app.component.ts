import { Component } from '@angular/core';
import { IForm } from './interface/form.interface';
import { registerFormConfig } from './constants/registerForm.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-form';
  formConfig: IForm = registerFormConfig;
}
