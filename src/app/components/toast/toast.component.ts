import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string= 'success';
  @Input() show: boolean = false;

  ngOnInit(): void {}

  closeToast() {
    this.show = false;
  }
}

