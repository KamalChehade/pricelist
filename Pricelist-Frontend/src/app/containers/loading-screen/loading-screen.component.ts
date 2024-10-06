import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  @Input() isLoading: boolean = false;

}
