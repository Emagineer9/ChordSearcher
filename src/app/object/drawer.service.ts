import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }

  /** メニュー開閉フラグ */
  private isClickMenu = false;
  /** メニューアイコン初回クイックフラグ */
  private isFirstClick = false;

  /**
   * Drawer開閉フラグ
   */
  getIsDrawerOpen(): boolean {
    return this.isClickMenu;
  }

  /**
   * DrawerCloseフラグ
   */
  getIsDrawerClose(): boolean {
    return this.isFirstClick && !this.isClickMenu;
  }

  /**
   * メニューアイコンクリック
   */
  onClickMenu() {
    this.isClickMenu = !this.isClickMenu;
    if (!this.isFirstClick) {
      this.isFirstClick = true;
    }
  }

}
