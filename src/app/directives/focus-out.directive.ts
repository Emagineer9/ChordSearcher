import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusOut]'
})
export class FocusOutDirective {

  constructor() { }

  /**
   * スマホ用フォーカスアウト時のスクロールもとに戻す処理
   */
  @HostListener('blur')
  onBlur() {
    window.scroll(0, 0);
  }
}
