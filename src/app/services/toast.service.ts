import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastState = new BehaviorSubject<{ message: string, type: string, show: boolean }>({ message: '', type: 'success', show: false });
    toast$ = this.toastState.asObservable();

    showToast(message: string, type: string) {
        this.toastState.next({ message, type, show: true });

        setTimeout(() => {
            this.toastState.next({ message: '', type, show: false });
        }, 3000);
    }
}
