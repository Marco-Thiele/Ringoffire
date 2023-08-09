import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-player-mobile',
  templateUrl: './app-player-mobile.component.html',
  styleUrls: ['./app-player-mobile.component.scss']
})
export class AppPlayerMobileComponent {
  @Input() name;
  @Input() playerActive : boolean = false;
}
