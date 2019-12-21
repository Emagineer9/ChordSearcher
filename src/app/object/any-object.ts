import { environment } from 'src/environments/environment';

export class CheckOnmei {
  readonly name: string;
  readonly mark: string;
  public check = false;
  constructor(name: string, mark: string) {
    this.name = name;
    this.mark = mark;
  }
}

export class Chord {
  onmei: Onmei;
  /** コード名 */
  codeName: string;
  /** コードの構成音名 */
  onmeiList: Onmei[];
  /** アコーディオンOpenフラグ */
  openAcd = false;

  constructor(onmei: Onmei, name: string, list: Onmei[]) {
    this.onmei = onmei;
    this.codeName = name;
    this.onmeiList = list;
  }
}

export class Onmei {
  name: string;
  mark: string;
  fileName: string;
  constructor(name: string, mark: string, fileName: string) {
    this.name = name;
    this.mark = mark;
    this.fileName = fileName;
  }
}

export class OnkaiName {
  static readonly C = 'ド';
  static readonly C_SHARP = 'ド♯';
  static readonly D = 'レ';
  static readonly D_SHARP = 'レ♯';
  static readonly E = 'ミ';
  static readonly F = 'ファ';
  static readonly F_SHARP = 'ファ♯';
  static readonly G = 'ソ';
  static readonly G_SHARP = 'ソ♯';
  static readonly A = 'ラ';
  static readonly A_SHARP = 'ラ♯';
  static readonly B = 'シ';
}
export class OnkaiMark {
  static readonly C = 'C';
  static readonly C_SHARP = 'C♯';
  static readonly D = 'D';
  static readonly D_SHARP = 'D♯';
  static readonly E = 'E';
  static readonly F = 'F';
  static readonly F_SHARP = 'F♯';
  static readonly G = 'G';
  static readonly G_SHARP = 'G♯';
  static readonly A = 'A';
  static readonly A_SHARP = 'A♯';
  static readonly B = 'B';
}
export class OnkaiFileName {
  static readonly C = 'C';
  static readonly C_SHARP = 'CS';
  static readonly D = 'D';
  static readonly D_SHARP = 'DS';
  static readonly E = 'E';
  static readonly F = 'F';
  static readonly F_SHARP = 'FS';
  static readonly G = 'G';
  static readonly G_SHARP = 'GS';
  static readonly A = 'A';
  static readonly A_SHARP = 'AS';
  static readonly B = 'B';
}

export class DrawerMenuKind {
  static readonly ENQUIRY = 1;
  static readonly SEISAKU = 2;
  static readonly RIREKI = 3;
}

export class KoshinRirekiDto {
  title: string;
  date: string;
  text: string;
}

/**
 * Firebase通信用ユーザー
 */
export class User {
  uid = environment.uid;
  name = environment.name;

  deserialize() {
    return Object.assign({}, this);
  }
}

/**
 * Firebase用問い合わせObject
 */
export class FirebaseComment {
  user = new User();
  name: string;
  mail: string;
  text: string;
  date: string;

  constructor(name: string, mail: string, text: string, date: string) {
    this.name = name;
    this.mail = mail;
    this.text = text;
    this.date = date;
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }
}
