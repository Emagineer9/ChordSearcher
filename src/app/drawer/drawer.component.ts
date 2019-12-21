import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../object/drawer.service';
import { DrawerMenuKind, FirebaseComment } from '../object/any-object';
import { AngularFirestore } from '@angular/fire/firestore';
import { isNullOrUndefined } from 'util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  constructor(
    public drawerService: DrawerService,
    private db: AngularFirestore
  ) {
    db.collection(environment.koshinRirekiName).valueChanges()
    .subscribe(x => {
      this.rirekiItem = x;
    });
  }

  /** ラジオボタン選択 */
  selectToiawase = false;
  selectSeisaku = false;
  selectRireki = false;

  /** 更新履歴 */
  rirekiItem: any[];

  // 問い合わせバインド用
  name: string;
  mailAddress: string;
  contents: string;

  ngOnInit() {
    this.selectToiawase = true;
    this.name = '';
    this.mailAddress = '';
    this.contents = '';
  }

  /**
   * ラジオボタンクリック
   * @param selectRadio 選択ボタン番号
   */
  onClickRadio(selectRadio: number) {
    switch (selectRadio) {
      case DrawerMenuKind.ENQUIRY:
          this.changeRadioButton(true, false, false);
          break;
      case DrawerMenuKind.SEISAKU:
          this.changeRadioButton(false, true, false);
          break;
      case DrawerMenuKind.RIREKI:
          this.changeRadioButton(false, false, true);
          break;
    }
  }

  /**
   * ラジオボタン変更処理
   * @param toiawase 問い合わせ表示フラグ
   * @param seisaku 制作表示フラグ
   * @param rireki 更新履歴表示フラグ
   */
  private changeRadioButton(toiawase: boolean, seisaku: boolean, rireki: boolean) {
    this.selectToiawase = toiawase;
    this.selectSeisaku = seisaku;
    this.selectRireki = rireki;
  }

  /**
   * コメント送信
   * @param e イベント
   */
  sendComment(e: Event) {
    // バリデーションチェック
    const items = {
      name: this.name, contents: this.contents
    };
    if (this.checkValidation(items)) {
      return;
    }

    // 今日の日付取得
    const nowDate = new Date(Date.now());
    const date = nowDate.getFullYear() + '/' + ('00' + (nowDate.getMonth() + 1)).slice(-2)
    + '/' + ('00' + nowDate.getDate()).slice(-2) + ' '
    + ('00' + nowDate.getHours()).slice(-2) + ':' + ('00' + nowDate.getMinutes()).slice(-2);

    // 更新
    this.db.collection(environment.collectionName)
    .add(new FirebaseComment(this.name, this.mailAddress, this.contents, date).deserialize());
    this.name = '';
    this.mailAddress = '';
    this.contents = '';

    // メッセージ表示
    const element = document.getElementById('toiawase');
    element.insertAdjacentHTML('beforeend', '<div style="text-align: center;"><p>ご意見ありがとうございました！</p></div>');
  }

  /**
   * バリデーションチェック
   * @param items check対象
   */
  checkValidation(items: any): boolean {
    let isValidation = false;
    // クリア処理
    const elementName = document.getElementById('name');
    elementName.classList.remove('is-invalid');
    const elementContents = document.getElementById('contents');
    elementContents.classList.remove('is-invalid');
    // チェック処理
    if (isNullOrUndefined(items.name) || items.name === '') {
      elementName.classList.add('is-invalid');
      isValidation = true;
    }
    if (isNullOrUndefined(items.contents) || items.contents === '') {
      elementContents.classList.add('is-invalid');
      isValidation = true;
    }
    return isValidation;
  }

}
