import { Component, OnInit, Input } from '@angular/core';
import { DrawerService } from '../object/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public drawerService: DrawerService
  ) {
  }

  static readonly HEADER_BOTTOM = 70;
  @Input() isTransformHeader: boolean;

  iOSMovefun = (event) => {
    event.preventDefault();
  }
  // スクロール関連メソッド
  scroll_control(event) {
    event.preventDefault();
  }

  ngOnInit() {
  }

  /**
   * メニューアイコンクリック
   */
  onClickMenuIcon() {
    // スクロールバーを上まで戻す
    window.scroll(0, 0);
    this.drawerService.onClickMenu();
    if (this.drawerService.getIsDrawerOpen()) {
      // スクロール禁止
      // パソコン
      document.addEventListener('mousewheel', this.scroll_control, { passive: false });
      // スマホ
      window.addEventListener( 'touchmove' , this.iOSMovefun , { passive: false } );
    } else {
      // スクロール禁止解除
      // パソコン
      document.removeEventListener('mousewheel', this.scroll_control);
      // スマホ
      window.removeEventListener( 'touchmove' , this.iOSMovefun);
    }
  }

}
