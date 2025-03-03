import { Component } from '@angular/core';
import { IForm } from './interface/form.interface';
import { registerFormConfig } from './constants/registerForm.constant';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-form';
  formConfig: IForm = registerFormConfig;
  toast = { message: '', type: '', show: false };

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }
}
