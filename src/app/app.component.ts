import { Component } from '@angular/core';
import { DrawerService } from './object/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isTransformHeader: boolean;

  constructor(
    public drawerService: DrawerService
  ) {
    window.onscroll = () => {
      const searchElement = document.getElementById('search-area');
      const clientRect = searchElement.getBoundingClientRect();
      const top = clientRect.top;
      this.isTransformHeader = top < 0;
    };
  }

  title = 'ChordSearcher';

  /**
   * TOPに戻る
   */
  onClickReturnTop() {
    window.scroll(0, 0);
  }
}
