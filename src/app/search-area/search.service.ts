import { Injectable } from '@angular/core';
import { Chord, Onmei, OnkaiName, OnkaiMark, OnkaiFileName } from '../object/any-object';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() {}

  /** 音画像保存パス */
  readonly ONMEI_FILE_PATH = '../../assets/';

  /** 全コードリスト */
  public ChordList: Chord[];
  /** 音名リスト */
  public OnmeiList: Onmei[];

  public OnInit() {
    this.OnmeiList = this.CreateOnmeiList();
    this.ChordList = this.CreateChordList(this.CreateBaseChordList());
  }

  /**
   * 日本語と英語の音名リスト作成
   */
  private CreateOnmeiList() {
    return [
      new Onmei(OnkaiName.C, OnkaiMark.C, OnkaiFileName.C),
      new Onmei(OnkaiName.C_SHARP, OnkaiMark.C_SHARP, OnkaiFileName.C_SHARP),
      new Onmei(OnkaiName.D, OnkaiMark.D, OnkaiFileName.D),
      new Onmei(OnkaiName.D_SHARP, OnkaiMark.D_SHARP, OnkaiFileName.D_SHARP),
      new Onmei(OnkaiName.E, OnkaiMark.E, OnkaiFileName.E),
      new Onmei(OnkaiName.F, OnkaiMark.F, OnkaiFileName.F),
      new Onmei(OnkaiName.F_SHARP, OnkaiMark.F_SHARP, OnkaiFileName.F_SHARP),
      new Onmei(OnkaiName.G, OnkaiMark.G, OnkaiFileName.G),
      new Onmei(OnkaiName.G_SHARP, OnkaiMark.G_SHARP, OnkaiFileName.G_SHARP),
      new Onmei(OnkaiName.A, OnkaiMark.A, OnkaiFileName.A),
      new Onmei(OnkaiName.A_SHARP, OnkaiMark.A_SHARP, OnkaiFileName.A_SHARP),
      new Onmei(OnkaiName.B, OnkaiMark.B, OnkaiFileName.B)
    ];
  }

  /**
   * ベースコード(ﾄﾞ)リスト作成
   */
  private CreateBaseChordList() {
    return [
      // ド
      { mark: 'M', koseiOn: [0, 4, 7] },
      { mark: 'm', koseiOn: [0, 3, 7] },
      { mark: '7', koseiOn: [0, 4, 7, 10] },
      { mark: 'M7', koseiOn: [0, 4, 7, 11] },
      { mark: 'm7', koseiOn: [0, 3, 7, 10] },
      { mark: 'mM7', koseiOn: [0, 3, 7, 11] },
      { mark: 'sus4', koseiOn: [0, 6, 7] },
      { mark: '7sus4', koseiOn: [0, 5, 7, 10] },
      { mark: 'dim', koseiOn: [0, 3, 6, 9] },
      { mark: 'm7-5', koseiOn: [0, 3, 6, 10] },
      { mark: 'aug', koseiOn: [0, 4, 8] },
      { mark: 'add9', koseiOn: [0, 2, 4, 7] },
      { mark: '6', koseiOn: [0, 4, 7, 9] },
      { mark: 'm6', koseiOn: [0, 3, 7, 9] }
    ];
  }

  /**
   * 全コード作成
   * @param BaseChordList ベースコード(ﾄﾞ)リスト
   */
  private CreateChordList(BaseChordList: any) {
    const result = new Array();
    for (let index = 0; index < this.OnmeiList.length; index++) {
      const onkai = this.OnmeiList[index];
      // tslint:disable-next-line: prefer-for-of
      for (let ib = 0; ib < BaseChordList.length; ib++) {
        const base = BaseChordList[ib];
        const list = new Array();
        base.koseiOn.forEach(x => {
          const koseiOnkai = this.OnmeiList[this.GetOnkaiBango(x, index)];
          list.push(koseiOnkai);
        });
        result.push(new Chord(onkai, base.mark, list));
      }
    }
    return result;
  }

  /**
   * ドを0と考えたときの音階番号取得
   * @param x ベースリストの構成番号
   * @param y 求めたいコードの番号
   */
  private GetOnkaiBango(x: number, y: number): number {
    let z = x + y;
    if (z >= this.OnmeiList.length) {
      z = z - this.OnmeiList.length;
    }
    return z;
  }

  /**
   * コード検索
   * @param onmeiNameList 音名リスト
   */
  public GetSearchChordList(onmeiNameList: string[]): Chord[] {
    const result = Array<Chord>();
    this.ChordList.forEach(chord => {
      const isPush = Array();
      for (const x of onmeiNameList) {
        // チェックされた音を含むか
        isPush.push(chord.onmeiList.some(onmei => x === onmei.name));
      }
      // チェックされた音をすべて含むか
      if (isPush.every(x => x)) {
        // アコーディオン閉じる
        chord.openAcd = false;
        result.push(chord);
      }
    });
    return result;
  }
}
