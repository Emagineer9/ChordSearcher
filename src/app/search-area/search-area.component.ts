import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { CheckOnmei, Chord } from '../object/any-object';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css']
})
export class SearchAreaComponent implements OnInit {
  constructor(
    public searchService: SearchService
    ) {}

  /** チェックできる最大数 */
  readonly MAX_CHECK = 4;

  /** ロードフラグ */
  isLoading = true;
  /** 音名リスト */
  onmeiList = Array<CheckOnmei>();
  /** チェックボックス非活性フラグ */
  isCheckBoxDisabled = false;
  /** コード検索結果 */
  searchChordList: Chord[];
  /** 音名アルファベットモード */
  isAlphabetMode = false;

  ngOnInit() {
    this.isLoading = true;
    // リスト初期化
    this.searchService.OnInit();
    this.searchService.OnmeiList.forEach(x =>
      this.onmeiList.push(new CheckOnmei(x.name, x.mark))
    );
    this.searchChordList = this.searchService.ChordList;
    this.isLoading = false;
  }

  /**
   * 音名リストチェックボックス押下
   */
  onClickCheckBox() {
    const list = Array<string>();
    this.onmeiList.forEach(x => {
      if (x.check) {
        list.push(x.name);
      }
    });
    this.isCheckBoxDisabled = list.length >= this.MAX_CHECK;
    this.searchChordList = this.searchService.GetSearchChordList(list);
  }

  /**
   * 音名イメージファイルパス
   * @param index 番号
   */
  getOnmeiImageFilePath(index: number) {
    return `${this.searchService.ONMEI_FILE_PATH}${this.searchService.OnmeiList[index].fileName}${'.png'}`;
  }

  /**
   * 音名表示モード（片仮名、アルファベット）変換
   */
  onClickChangeOnmeiMode() {
    this.isLoading = true;
    this.isAlphabetMode = !this.isAlphabetMode;
    this.isLoading = false;
  }

}
