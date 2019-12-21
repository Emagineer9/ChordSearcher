import { Component, OnInit, Input } from '@angular/core';
import { Chord } from '../object/any-object';
import { isNullOrUndefined } from 'util';
import { SearchService } from '../search-area/search.service';

@Component({
  selector: 'app-code-result',
  templateUrl: './code-result.component.html',
  styleUrls: ['./code-result.component.css']
})
export class CodeResultComponent implements OnInit {

  @Input() searchChordList: Chord[];
  @Input() isAlphabetMode: boolean;

  constructor(
    public searchService: SearchService
  ) { }

  ngOnInit() {
  }

  /**
   * Accordionの開閉記号取得
   * @param index 番号
   */
  getAccordionIcon(index: number) {
    if (isNullOrUndefined(this.searchChordList) || isNullOrUndefined(this.searchChordList[index])) {
      return '＋';
    }
    return this.searchChordList[index].openAcd ? '－' : '＋';
  }

  /**
   * コード検索結果リスト存在取得
   */
  getSearchChordListSonzai() {
    return isNullOrUndefined(this.searchChordList) || this.searchChordList.length <= 0;
  }

  /**
   * 音名イメージファイルパス
   * @param fileName 音名ファイル名
   */
  getOnmeiImageFilePath(fileName: string) {
    return `${this.searchService.ONMEI_FILE_PATH}${fileName}${'.png'}`;
  }

  /**
   * 鍵盤イメージファイルパス
   */
  getKenbanImageFilePath() {
    return `${this.searchService.ONMEI_FILE_PATH}${'kenban'}${'.png'}`;
  }

  /**
   * コードタイトル音名表示
   * @param index 番号
   */
  getTitleOnmeiName(index: number) {
    const onmei = this.searchChordList[index].onmei;
    return this.isAlphabetMode ? onmei.mark : onmei.name;
  }
}
