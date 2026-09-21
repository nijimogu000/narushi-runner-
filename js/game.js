

// ================================================================
// ██████████████████████████████████████████████████████████████
//
//   ステージデータ定義ゾーン
//   ここだけ編集してステージを追加・変更できます
//
// ██████████████████████████████████████████████████████████████
// ================================================================

/*
  【タイル座標の読み方】
  ステージは横100タイル = 3200px
  タイル番号 0 が左端、99 が右端

  地面はタイル行 ty=5（画面下から1段）に自動生成されます
  足場は ty=2～4 が使えます（数字が小さいほど上）

  ty=2 ■■■  ← 一番上の足場
  ty=3 ■■■  ← 中段足場
  ty=4 ■■■  ← 低い足場
  ty=5 ■■■■■■■■■（地面）

  【穴の書き方】
  [開始タイル, 終了タイル]  ← 終了タイルの手前まで穴になる
  例：[18, 20] → タイル18〜19が穴（2タイル幅）
      [30, 33] → タイル30〜32が穴（3タイル幅）

  【敵の書き方】
  { tx: タイル番号, vx: 速度(px/s), range: 往復距離(px) }
  vx が正 → 最初右向き、負 → 最初左向き
  range は片道の移動距離（64px = 2タイル分）

  【アイテムの書き方】
  { tx: タイル番号, ty: 何タイル上に浮かせるか }
  ty=1 → 地面より1タイル（32px）上
  ty=2 → 地面より2タイル（64px）上

  【安全距離のルール】
  敵を穴の手前 4タイル以内に置かないこと
  → 起動時にコンソールで自動チェックします
*/

const STAGE_DATA = [

  // ============================================================
  // STAGE 1 - チュートリアル
  // ============================================================
  {
    label:     'STAGE 1',
    bg:        'harbor',   // 港・クレーン・水平線
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [24, 26],
      [48, 50],
      [72, 74],
    ],

    platforms: [
      { tx:14, ty:3, len:3 },
      { tx:38, ty:3, len:3 },
      { tx:62, ty:3, len:3 },
      { tx:84, ty:3, len:3 },
    ],

    enemies: [
      { tx:34, vx: 35, range:32 },
      { tx:80, vx:-35, range:32 },
    ],

    items: [
      { tx: 8, ty:1 },
      { tx:15, ty:2 },
      { tx:26, ty:1 },
      { tx:34, ty:2 },
      { tx:39, ty:2 },
      { tx:85, ty:2 },
    ],
  },

  // ============================================================
  // STAGE 2 - 穴に慣れる
  // 目標：穴が増える。敵はまだ少ない
  // ============================================================
  {
    label:     'STAGE 2',
    bg:        'school',   // 住宅・学校
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [18, 20],  // 2タイル穴
      [30, 32],  // 2タイル穴
      [45, 47],  // 2タイル穴
      [60, 62],  // 2タイル穴
      [80, 82 ],  // 2タイル穴
    ],

    platforms: [
      { tx:12, ty:3, len:3 },
      { tx:25, ty:3, len:2 },
      { tx:40, ty:3, len:3 },
      { tx:55, ty:3, len:2 },
      { tx:72, ty:3, len:3 },
    ], 

    enemies: [
      { tx: 8, vx:  35, range: 48 },  // 穴[18]から10タイル前：安全
      { tx:36, vx: -40, range: 48 },  // 穴[30,32]から4タイル後：安全
      { tx:86, vx: -40, range: 48 },  // 穴[80,82]から4タイル後：安全
    ],

    items: [
      { tx:  5, ty: 2 },
      { tx: 14, ty: 2 },
      { tx: 23, ty: 1 },
      { tx: 42, ty: 2 },
      { tx: 57, ty: 2 },
      { tx: 74, ty: 2 },
    ],
  },

  // ============================================================
  // STAGE 3 - 敵が増える
  // 目標：穴は前ステージと同数
  // ============================================================
  {
    label:     'STAGE 3',
    bg:        'office',   // 高層ビル・オフィス街
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [18, 20],
      [32, 34],
      [50, 52],
      [68, 70],
      [84, 86],
    ],

    platforms: [
      { tx:10, ty:3, len:3 },
      { tx:26, ty:2, len:2 },
      { tx:42, ty:4 , len:3 },
      { tx:60, ty:3, len:2 },
      { tx:76, ty:4, len:3 },
    ],

    enemies: [
      { tx:  8, vx:  40, range: 48 },  // 穴[18]から10タイル前
      { tx: 24, vx: -48, range: 48 },  // 穴[18]から6タイル後・穴[32]から8タイル前
      { tx: 38, vx:  45, range: 48 },  // 穴[32]から6タイル後・穴[50]から12タイル前
      { tx: 56, vx: -45, range: 48 },  // 穴[50]から6タイル後・穴[68]から12タイル前
      { tx: 74, vx:  50, range: 48 },  // 穴[68]から6タイル後・穴[84]から10タイル前
    ],

    items: [
      { tx:  6, ty: 2 },
      { tx: 13, ty: 2 },
      { tx: 27, ty: 1 },
      { tx: 44, ty: 2 },
      { tx: 62, ty: 1 },
      { tx: 80, ty: 1 },
    ],
  },

  // ============================================================
  // STAGE 4 - 足場が狭くなる
  // 目標：細い足場の上でも正確にジャンプ
  // ============================================================
  {
    label:     'STAGE 4',
    bg:        'downtown', // 繁華街・カラオケ・ゲーセン
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [16, 18],
      [28, 31],  // 3タイル穴（初登場）
      [44, 46],
      [58, 61],  // 3タイル穴
      [74, 76],
      [87, 89],
    ],

    platforms: [
      { tx:10, ty:3, len:2 },  // 短い足場（2タイル）
      { tx:22, ty:2, len:2 },
      { tx:36, ty:3, len:2 },
      { tx:50, ty:2, len:2 },
      { tx:65, ty:3, len:2 },
      { tx:79, ty:2, len:2 },
    ],

    enemies: [
      { tx:  7, vx:  40, range: 48 },
      { tx: 24, vx: -45, range: 48 },
      { tx: 38, vx:  45, range: 48 },
      { tx: 54, vx: -50, range: 48 },
      { tx: 68, vx:  50, range: 48 },
      { tx: 83, vx: -50, range: 48 },
    ],

    items: [
      { tx:  5, ty: 1 },
      { tx: 12, ty: 2 },
      { tx: 26, ty: 1 },
      { tx: 38, ty: 2 },
      { tx: 56, ty: 1 },
      { tx: 77, ty: 1 },
    ],
  },

  // ============================================================
  // STAGE 5 - 敵が速くなる
  // 目標：素早い敵のタイミングを掴む
  // ============================================================
  {
    label:     'STAGE 5',
    bg:        'shopping', // 宝石店・花屋・商業施設
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [16, 18],
      [29, 31],
      [45, 48],  // 3タイル穴
      [60, 62],
      [76, 79],  // 3タイル穴
      [88, 90],
    ],

    platforms: [
      { tx:10, ty:4, len:2 },
      { tx:23, ty:2, len:2 },
      { tx:38, ty:3, len:2 },
      { tx:52, ty:2, len:2 },
      { tx:64, ty:3, len:2 },
      { tx:81, ty:2, len:2 },
    ],

    enemies: [
      { tx:  7, vx:  65, range: 48 },  // 速い敵
      { tx: 23, vx: -65, range: 48 },
      { tx: 39, vx:  70, range: 48 },
      { tx: 56, vx: -67, range: 48 },
      { tx: 64, vx:  70, range: 64 },
      { tx: 83, vx: -75, range: 48 },
      { tx: 94, vx:  75, range: 48 },
    ],

    items: [
      { tx:  7, ty: 1 },
      { tx: 15, ty: 1 },
      { tx: 20, ty: 2 },
      { tx: 40, ty: 2 },
      { tx: 54, ty: 1 },
      { tx: 67, ty: 2 },
    ],
  },

  // ============================================================
  // STAGE 6 - 複合配置
  // 目標：穴・敵・足場すべての組み合わせに対応する
  // ============================================================
  {
    label:     'STAGE 6',
    bg:        'shitamachi',// 下町・駄菓子屋・神社
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [14, 16],
      [25, 28],  // 3タイル穴
      [38, 40],
      [50, 53],  // 3タイル穴
      [64, 66],
      [76, 79],  // 3タイル穴
      [88, 90],
    ],

    platforms: [
      { tx: 8, ty:3, len:2 },
      { tx:18, ty:2, len:2 },
      { tx:30, ty:3, len:2 },
      { tx:42, ty:2, len:2 },
      { tx:55, ty:3, len:2 },
      { tx:68, ty:2, len:2 },
      { tx:81, ty:3, len:2 },
    ],

    enemies: [
      { tx:  6, vx:  60, range: 48 },
      { tx: 20, vx: -65, range: 48 },
      { tx: 32, vx:  65, range: 48 },
      { tx: 44, vx: -70, range: 48 },
      { tx: 57, vx:  70, range: 48 },
      { tx: 71, vx: -70, range: 48 },
      { tx: 83, vx:  75, range: 48 },
      { tx: 94, vx: -75, range: 48 },
    ],

    items: [
      { tx:  7, ty: 1 },
      { tx: 10, ty: 2 },
      { tx: 22, ty: 1 },
      { tx: 35, ty: 2 },
      { tx: 60, ty: 1 },
      { tx: 73, ty: 1 },
    ],
  },

  // ============================================================
  // STAGE 7 - 最終ステージ
  // 目標：全要素の最高難度。慎重かつ素早く
  // ============================================================
  {
    label:     'STAGE 7',
    bg:        'space',    // 宇宙・星空・月
    widthTiles: 100,
    goalTile:   96,

    holes: [
      [13, 15],
      [23, 26],  // 3タイル穴
      [34, 36],
      [45, 48],  // 3タイル穴
      [57, 59],
      [68, 71],  // 3タイル穴
      [80, 82],
      [94, 95],
    ],

    platforms: [
      { tx: 7, ty:3, len:2 },
      { tx:17, ty:2, len:2 },
      { tx:28, ty:3, len:2 },
      { tx:38, ty:2, len:2 },
      { tx:50, ty:3, len:2 },
      { tx:61, ty:2, len:2 },
      { tx:73, ty:3, len:2 },
      { tx:84, ty:2, len:2 },
    ],

    enemies: [
      { tx:  5, vx:  70, range: 48 },
      { tx: 17, vx: -75, range: 48 },
      { tx: 30 , vx: -75, range: 48 },
      { tx: 39, vx: -75, range: 48 },
      { tx: 51, vx:  80, range: 48 },
      { tx: 63, vx: -80, range: 48 },
      { tx: 74, vx:  80, range: 48 },
      { tx: 90, vx: -80, range: 48 },
      { tx: 100, vx:  80, range: 32 },
    ],

    items: [
      { tx:  4, ty: 1 },
      { tx: 12, ty: 2 },
      { tx: 20, ty: 1 },
      { tx: 32, ty: 2 },
      { tx: 48, ty: 1 },
      { tx: 65, ty: 1 },
    ],
  },

]; // ← STAGE_DATA ここまで

// ================================================================
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
//
//   ゲームエンジン（以下は触らなくてOK）
//
// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
// ================================================================

// ---- 定数 ----
const GB = { BG:'#9BBC0F', LIGHT:'#8BAC0F', DARK:'#306230', DARKEST:'#0F380F' };
const INTERNAL_W = 320, INTERNAL_H = 180;
const TILE = 32;
const GROUND_TY   = 5;
const GROUND_Y    = GROUND_TY * TILE;
const PLAYER_SPD  = 170;
const GRAVITY     = 800;
const JUMP_VY     = -320;
const TOTAL_ITEMS = 6;
const NEED_ITEMS  = 5;

// ---- Canvas ----
const canvas = document.getElementById('gameCanvas');
canvas.width  = INTERNAL_W;   // 内部解像度は固定
canvas.height = INTERNAL_H;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// ---- レスポンシブスケーリング ----
// 内部解像度 320×180 を維持しつつ、表示サイズだけを画面に合わせる。
// ・16:9 を維持
// ・画面からはみ出さない
// ・スマホ縦画面でも幅いっぱいを優先
function resizeCanvas() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // 画面に収まる最大スケールを求める（小数OK・整数不要）
  const scaleByW = vw / INTERNAL_W;          // 幅基準
  const scaleByH = vh / INTERNAL_H;          // 高さ基準
  const scale    = Math.min(scaleByW, scaleByH);

  const dispW = Math.floor(INTERNAL_W * scale);
  const dispH = Math.floor(INTERNAL_H * scale);

  canvas.style.width  = dispW + 'px';
  canvas.style.height = dispH + 'px';
}

resizeCanvas(); // 初回実行
window.addEventListener('resize', () => {
  resizeCanvas();
  if (typeof state !== 'undefined') {
    if (state === STATE.TITLE) showTitleLogoImg(true);
    if (state === STATE.GAMEOVER && isAllBeautyComplete()) showCompleteImg(true);
  }
});
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    resizeCanvas();
    if (typeof state !== 'undefined') {
      if (state === STATE.TITLE) showTitleLogoImg(true);
      if (state === STATE.GAMEOVER && isAllBeautyComplete()) showCompleteImg(true);
    }
  }, 100);
});

// ---- スプライト生成 ----
// ================================================================
// アセット管理システム
// ================================================================

const ASSET_PATHS = {
  // プレイヤー：止まる・走り1・走り2・ジャンプ・着地
  player_idle:  'assets/player/idle.gif',  // 止まる
  player_run0:  'assets/player/run0.gif',  // 走り1
  player_run1:  'assets/player/run1.gif',  // 走り2
  player_jump:  'assets/player/jump.gif',  // ジャンプ
  player_land:  'assets/player/land.gif',  // 着地

  // 敵
  enemy_0:      'assets/enemy/enemy0.gif',  // 敵フレーム1
  enemy_1:      'assets/enemy/enemy1.gif',  // 敵フレーム2

  // アイテム
  item_0:       'assets/item/beauty.png',  // 美アイテム画像

  // タイトルロゴ
  title_logo:       'assets/title/title.gif',  // 為士ランナータイトルロゴ

  // コンプリート画像
  complete:     'assets/clear/COMPLETE.gif',  // 全★取得時のCOMPLETE.gif

  // UI・地形
  tile:         null,  // 例: 'assets/ui/tile.png'
  cloud:        null,  // 例: 'assets/ui/cloud.png'
};

// ---- Canvas仮スプライト生成（フォールバック用） ----
function makeSprite(w, h, fn) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.imageSmoothingEnabled = false;
  fn(g);
  return c;
}

// Canvas仮スプライト（画像が未設定の場合に使用）
const FB = {
  player_run0: makeSprite(32,32, g => {
    g.fillStyle = GB.DARKEST;
    g.fillRect(10,4,12,14); g.fillRect(8,18,16,10);
    g.fillStyle = GB.BG;
    g.fillRect(13,8,3,3); g.fillRect(18,8,3,3);
    g.fillStyle = GB.DARK;
    g.fillRect(8,28,6,4); g.fillRect(18,28,6,4);
  }),
  player_run1: makeSprite(32,32, g => {
    g.fillStyle = GB.DARKEST;
    g.fillRect(10,4,12,14); g.fillRect(8,18,16,10);
    g.fillStyle = GB.BG;
    g.fillRect(13,8,3,3); g.fillRect(18,8,3,3);
    g.fillStyle = GB.DARK;
    g.fillRect(6,26,6,4); g.fillRect(20,30,6,4);
  }),
  player_jump: makeSprite(32,32, g => {
    // ジャンプポーズ（足を揃えて少し縮める）
    g.fillStyle = GB.DARKEST;
    g.fillRect(10,4,12,14); g.fillRect(8,18,16,10);
    g.fillStyle = GB.BG;
    g.fillRect(13,8,3,3); g.fillRect(18,8,3,3);
    g.fillStyle = GB.DARK;
    g.fillRect(10,28,12,4);
  }),
  enemy_0: makeSprite(32,32, g => {
    g.fillStyle = GB.DARKEST;
    g.beginPath(); g.ellipse(16,20,13,10,0,0,Math.PI*2); g.fill();
    g.fillRect(6,14,20,10);
    g.beginPath(); g.ellipse(16,14,10,8,0,Math.PI,Math.PI*2); g.fill();
    g.fillStyle = GB.BG;
    g.fillRect(10,13,4,4); g.fillRect(18,13,4,4);
    g.fillStyle = GB.DARKEST;
    g.fillRect(11,14,2,2); g.fillRect(19,14,2,2);
  }),
  enemy_1: makeSprite(32,32, g => {
    // フォールバック：enemy_0と同じ（画像差し替え前の仮）
    g.fillStyle = GB.DARKEST;
    g.beginPath(); g.ellipse(16,20,13,10,0,0,Math.PI*2); g.fill();
    g.fillRect(6,14,20,10);
    g.beginPath(); g.ellipse(16,14,10,8,0,Math.PI,Math.PI*2); g.fill();
    g.fillStyle = GB.BG;
    g.fillRect(10,13,4,4); g.fillRect(18,13,4,4);
    g.fillStyle = GB.DARKEST;
    g.fillRect(11,14,2,2); g.fillRect(19,14,2,2);
  }),
  item_0: makeSprite(16,16, g => {
    g.fillStyle = GB.DARK;
    g.fillRect(4,0,8,2); g.fillRect(2,2,12,2); g.fillRect(1,4,14,8);
    g.fillRect(2,12,12,2); g.fillRect(4,14,8,2);
    g.fillStyle = GB.BG;
    g.fillRect(5,4,6,2); g.fillRect(4,6,8,4);
  }),
  tile: makeSprite(32,32, g => {
    g.fillStyle = GB.DARK;   g.fillRect(0,0,32,32);
    g.fillStyle = GB.LIGHT;  g.fillRect(1,1,30,6);
    g.fillStyle = GB.DARKEST;
    g.fillRect(0,7,32,1); g.fillRect(16,8,1,24); g.fillRect(0,20,32,1);
  }),
  title_logo: null,  // ロゴ画像フォールバック（nullの場合はテキスト描画）
  complete:   null,  // コンプリート画像フォールバック（nullの場合は非表示）
  cloud: makeSprite(48,20, g => {
    g.fillStyle = GB.LIGHT;
    g.fillRect(8,8,32,12); g.fillRect(16,4,20,8); g.fillRect(4,8,12,8);
  }),
};

// ---- ロード済み画像を保持するテーブル ----
// キー = ASSET_PATHS のキー、値 = HTMLImageElement or null（フォールバック使用）
const LOADED = {};

// ---- 画像を1枚非同期ロード（失敗時はnullを返す） ----
function loadImage(key, path) {
  return new Promise(resolve => {
    if (!path) { LOADED[key] = null; resolve(); return; }
    const img = new Image();
    img.onload  = () => { LOADED[key] = img; resolve(); };
    img.onerror = () => {
      console.warn(`[アセット] 画像ロード失敗: ${path} → Canvas仮スプライトを使用`);
      LOADED[key] = null;
      resolve();
    };
    img.src = path;
  });
}

// ---- 全アセットをロード（Promiseで完了を通知） ----
function loadAssets() {
  const tasks = Object.entries(ASSET_PATHS).map(([key, path]) => loadImage(key, path));
  return Promise.all(tasks);
}

// ---- スプライト描画ヘルパー ----
// 画像が存在すれば画像を、なければCanvasフォールバックを描画
// w/h を指定すると画像をその大きさにスケールして描画（省略時は元サイズ）
function drawSprite(key, dx, dy, w, h) {
  const img = LOADED[key];
  const src = img ?? FB[key];
  if (!src) return;
  if (w !== undefined && h !== undefined) {
    ctx.drawImage(src, dx, dy, w, h);
  } else {
    ctx.drawImage(src, dx, dy);
  }
}

// プレイヤーフレーム取得（状態に応じて5種類を切り替え）
// idle : 地面にいて速度ほぼ0（ゲーム開始直後など）
// run0 / run1 : 走りアニメ交互
// jump : 上昇中（vy < 0）
// land : 着地直後（vy が直前まで正で着地した瞬間、数フレーム表示）
function getPlayerSprite(onGround, animFrame, vy) {
  if (!onGround && vy < 0)  return 'player_jump';  // 上昇中
  if (!onGround && vy >= 0) return 'player_jump';  // 落下中もジャンプ画像
  if (playerLandTimer > 0)  return 'player_land';  // 着地直後
  return animFrame === 0 ? 'player_run0' : 'player_run1'; // 走り
}

// ---- オーディオ ----
let audioCtx = null;
function playTone(freq, type, dur, vol=0.3) {
  try {
    if (!audioCtx) audioCtx = new (AudioContext||webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+dur);
    o.start(); o.stop(audioCtx.currentTime+dur);
  } catch(e){}
}
const SFX = {
  jump:  () => { playTone(440,'square',0.1); playTone(660,'square',0.08); },
  item:  () => { playTone(880,'square',0.05); playTone(1100,'square',0.08); playTone(1320,'square',0.1); },
  miss:  () => { playTone(220,'sawtooth',0.3,0.4); playTone(110,'sawtooth',0.4,0.4); },
  goal:  () => { [523,659,784,1047].forEach((f,i)=>setTimeout(()=>playTone(f,'square',0.15),i*100)); },
  stomp: () => { playTone(300,'square',0.1); playTone(150,'square',0.15); },
  unlock:() => { [784,1047].forEach((f,i)=>setTimeout(()=>playTone(f,'square',0.2),i*80)); },
};

// ---- バリデーション ----
function validateEnemyPlacement(enemyDefs, holes, safeZone=4) {
  const warns = [];
  for (const e of enemyDefs) {
    const rt = Math.ceil(e.range / TILE);
    const eMin = e.tx - rt, eMax = e.tx + rt;
    for (const [hs, he] of holes) {
      if (eMax >= hs - safeZone && eMin < he + 1) {
        warns.push(`⚠ 敵(tx=${e.tx}) range[${eMin}〜${eMax}] が 穴[${hs}〜${he}] の危険ゾーンに重複`);
      }
    }
  }
  if (warns.length) { console.warn('[バリデーション]'); warns.forEach(w=>console.warn(w)); }
  else console.log('[バリデーション] OK');
}

// ---- ステージ定義 → ゲームオブジェクト変換 ----
function buildStage(def) {
  const W     = def.widthTiles;
  const holes = def.holes || [];
  const tiles = [];
  const enemies = [];
  const items   = [];

  // バリデーション実行
  validateEnemyPlacement(def.enemies || [], holes);

  // 地面タイル生成（穴の部分はスキップ）→ 当たり判定あり
  for (let tx = 0; tx < W; tx++) {
    const inHole = holes.some(([s, e]) => tx >= s && tx < e);
    if (!inHole) tiles.push({ tx, ty: GROUND_TY });
  }

  // 空中ブロック（platforms）→ 描画のみ・当たり判定なし
  const platformTiles = [];
  for (const p of (def.platforms || [])) {
    for (let i = 0; i < p.len; i++) {
      platformTiles.push({ tx: p.tx + i, ty: p.ty });
    }
  }

  // 敵オブジェクト生成
  for (const d of (def.enemies || [])) {
    const sx = d.tx * TILE;
    enemies.push({ x: sx, y: GROUND_Y - TILE, vx: d.vx, range: d.range, startX: sx, alive: true });
  }

  // アイテムオブジェクト生成
  // ty=1 → GROUND_Y - 1.5*TILE（地面より1タイル半上）
  // ty=2 → GROUND_Y - 2.5*TILE（地面より2タイル半上）
  for (const d of (def.items || [])) {
    const px = d.tx * TILE + 8;
    const py = GROUND_Y - (d.ty + 0.5) * TILE;
    items.push({ x: px, y: py, collected: false });
  }

  return {
    label:         def.label,
    bg:            def.bg || 'harbor',
    tiles,          // 地面のみ（当たり判定あり）
    platformTiles,  // 空中ブロック（描画のみ・当たり判定なし）
    enemies,
    items,
    goalX:    def.goalTile * TILE,
    stageLen: W * TILE,
  };
}

// ================================================================
// タイトル画面用 ビットマップフォント（5×7ドット）
// タイトル画面の fillText() によるにじみを防ぐため、
// 必要な文字だけ fillRect() のドット集合で描画する。
// ================================================================

// 各文字の5×7ビットマップ定義（1=塗る、0=空白）
// 行は上から7行、列は左から5列
const BMAP = {
  'A':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'B':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'C':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],
  'D':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'E':[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'F':[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'G':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'H':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'I':[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
  'J':[[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'K':[[1,0,0,0,1],[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'L':[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'M':[[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'N':[[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'O':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'P':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'Q':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],
  'R':[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'S':[[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  'T':[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'U':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'V':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]],
  'W':[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
  'X':[[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,1]],
  'Y':[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'Z':[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  '0':[[0,1,1,1,0],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '1':[[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
  '2':[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],
  '3':[[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  '4':[[0,0,0,1,0],[0,0,1,1,0],[0,1,0,1,0],[1,0,0,1,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,0,1,0]],
  '5':[[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '6':[[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '7':[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  '8':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  '9':[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,1,1,1,0]],
  ' ':[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  '/':[[0,0,0,0,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[1,0,0,0,0]],
  '-':[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
  '!':[[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]],
  ':':[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],
  '★':[[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[1,0,1,0,1],[0,0,0,0,0],[0,0,0,0,0]],
};

// 1文字をdot×dotのドットで描画
// sx=左端x, sy=上端y, dot=1ドットのpxサイズ
function bmapChar(ch, sx, sy, dot, color) {
  const glyph = BMAP[ch];
  if (!glyph) return;
  ctx.fillStyle = color;
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 5; col++) {
      if (glyph[row][col]) {
        ctx.fillRect(
          Math.floor(sx + col * dot),
          Math.floor(sy + row * dot),
          dot, dot
        );
      }
    }
  }
}

// 文字列を中央揃えで描画
// cx=中心x, y=上端y, dot=ドットサイズ, color=色
// 文字間隔: 5dot幅 + 1dot空き = (5+1)*dot
function bmapText(str, cx, y, dot, color) {
  const charW  = (5 + 1) * dot;
  const totalW = str.length * charW - dot;
  const startX = Math.floor(cx - totalW / 2);
  for (let i = 0; i < str.length; i++) {
    bmapChar(str[i], startX + i * charW, y, dot, color);
  }
}

// 文字列を左揃えで描画（sx=左端x）
function bmapTextLeft(str, sx, y, dot, color) {
  const charW = (5 + 1) * dot;
  for (let i = 0; i < str.length; i++) {
    bmapChar(str[i], Math.floor(sx + i * charW), y, dot, color);
  }
}

// 文字列を右揃えで描画（rx=右端x）
function bmapTextRight(str, rx, y, dot, color) {
  const charW  = (5 + 1) * dot;
  const totalW = str.length * charW - dot;
  const startX = Math.floor(rx - totalW);
  for (let i = 0; i < str.length; i++) {
    bmapChar(str[i], startX + i * charW, y, dot, color);
  }
}

// ================================================================
// ★ コンプリート管理（Beauty Stars）
// ================================================================

const BEAUTY_STARS_KEY = 'tameshiRunnerBeautyStars'; // localStorage保存キー

// 各ステージの★取得状況（true=取得済み、false=未取得）
let beautyStars = [];

// localStorageから★状況を読み込む（失敗してもゲームを止めない）
function loadBeautyStars() {
  try {
    const raw = localStorage.getItem(BEAUTY_STARS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === STAGE_DATA.length) {
        beautyStars = parsed.map(v => v === true);
        return;
      }
    }
  } catch(e) {
    console.warn('[BeautyStars] 読み込み失敗:', e);
  }
  beautyStars = new Array(STAGE_DATA.length).fill(false);
}

// localStorageに★状況を保存する（失敗してもゲームを止めない）
function saveBeautyStars() {
  try {
    localStorage.setItem(BEAUTY_STARS_KEY, JSON.stringify(beautyStars));
  } catch(e) {
    console.warn('[BeautyStars] 保存失敗:', e);
  }
}

// 指定ステージに★を付与する（新規取得時のみ保存）
function unlockBeautyStar(idx) {
  if (idx < 0 || idx >= beautyStars.length) return false;
  if (!beautyStars[idx]) {
    beautyStars[idx] = true;
    saveBeautyStars();
    return true; // 新規取得
  }
  return false; // すでに取得済み
}

// 指定ステージが★取得済みか
function isBeautyStar(idx) {
  return beautyStars[idx] === true;
}

// 取得済み★の総数
function getBeautyStarCount() {
  return beautyStars.filter(v => v).length;
}

// 全ステージ★取得済みか
function isAllBeautyComplete() {
  return beautyStars.every(v => v === true);
}

// 開発用：コンソールから resetBeautyStars() で実行
window.resetBeautyStars = function() {
  beautyStars = new Array(STAGE_DATA.length).fill(false);
  try { localStorage.removeItem(BEAUTY_STARS_KEY); } catch(e) {}
  console.log('[BeautyStars] リセット完了');
};

// ---- ゲーム状態 ----
const STATE = { TITLE:'title', PLAY:'play', DEAD:'dead', CLEAR:'clear', GAMEOVER:'gameover' };
let state      = STATE.TITLE;
let stageIndex = 0;   // 現在のステージ番号（0始まり）
let stageData  = null;
let player     = null;
let camera     = null;
let itemCount  = 0;
let animFrame  = 0, animTimer = 0;
let deadTimer  = 0, clearTimer = 0;
let bgClouds   = [];
let popups     = [];
let goalUnlocked = false;
let clearGotStar = false; // このクリアで★を新規取得したか

// ジャンプバッファ・コヨーテタイム
let jumpBuffer  = 0;    // 残り秒数。入力時にセット→毎フレーム減算
let coyoteTime  = 0;    // 残り秒数。地面を離れた瞬間にセット→毎フレーム減算
let jumpPressed = false; // 押しっぱなし防止フラグ
let playerLandTimer = 0; // 着地モーション表示タイマー（秒）
const LAND_DURATION = 0.08; // 着地モーションを表示する時間

const JUMP_BUFFER_TIME = 0.12;
const COYOTE_TIME      = 0.10;

function initClouds() {
  bgClouds = [];
  for (let i = 0; i < 8; i++)
    bgClouds.push({ x: i*420+Math.random()*200, y: 10+Math.random()*40, speed: 10+Math.random()*10 });
}

function initGame(idx) {
  stageIndex   = idx;
  stageData    = buildStage(STAGE_DATA[stageIndex]);
  player       = { x:2*TILE, y:GROUND_Y-TILE, vx:PLAYER_SPD, vy:0, onGround:false, alive:true };
  camera       = { x:0 };
  itemCount    = 0;
  animFrame    = 0; animTimer  = 0;
  deadTimer    = 0; clearTimer = 0;
  popups       = [];
  goalUnlocked = false;
  clearGotStar = false;
  jumpBuffer   = 0;
  coyoteTime   = 0;
  jumpPressed  = false;
  playerLandTimer = 0;
  initClouds();
}

// ---- 衝突判定 ----
function overlaps(ax,ay,aw,ah, bx,by,bw,bh) {
  return ax < bx+bw && ax+aw > bx && ay < by+bh && ay+ah > by;
}

// prevY: 移動前のプレイヤーY座標（update()から渡す）
// 着地判定：「移動前の足元がタイル上端以下」かつ「移動後の足元がタイル上端を越えた」
// → dtに依存しないため、フレームレートが落ちても床すり抜けが起きない
function resolveTiles(p, prevY) {
  const wasOnGround = p.onGround;
  p.onGround = false;

  for (const t of stageData.tiles) {
    const tx = t.tx * TILE, ty = t.ty * TILE;

    // 横方向の重なりチェック（当たり判定幅 20px、左オフセット +6）
    const pLeft  = p.x + 6;
    const pRight = pLeft + 20;
    if (pRight <= tx || pLeft >= tx + TILE) continue; // 横に重なっていなければスキップ

    // 垂直方向：移動前・移動後の足元座標
    const prevBottom = prevY + TILE;   // 移動前の足元（固定値1/60不使用）
    const currBottom = p.y  + TILE;   // 移動後の足元

    // 着地条件：
    //   1. 落下中（vy >= 0）
    //   2. 移動前の足元がタイル上端より上（すり抜け前の位置確認）
    //   3. 移動後の足元がタイル上端を越えた（このフレームで通過）
    if (p.vy >= 0 && prevBottom <= ty + 2 && currBottom >= ty) {
      p.y = ty - TILE;   // タイル上面にスナップ
      p.vy = 0;
      p.onGround = true;
    }
  }

  // 地面から離れた瞬間にコヨーテタイマーをセット
  if (wasOnGround && !p.onGround && p.vy >= 0) {
    coyoteTime = COYOTE_TIME;
  }
}

// ---- 更新 ----
function update(dt) {
  if (state === STATE.TITLE || state === STATE.GAMEOVER) return;
  if (state === STATE.DEAD)  { deadTimer  += dt; return; }
  if (state === STATE.CLEAR) { clearTimer += dt; return; }

  const p = player;
  const wasOnGround = p.onGround; // 着地検出用：前フレームの接地状態を保存
  p.vy += GRAVITY * dt;
  p.x  += p.vx * dt;

  // 移動前のY座標を保存（resolveTilesでトンネリング判定に使用）
  const prevY = p.y;
  p.y += p.vy * dt;

  // 実際のdtに基づく前フレーム位置を渡して床判定
  resolveTiles(p, prevY);

  // タイマー減算
  jumpBuffer -= dt;
  coyoteTime -= dt;
  if (playerLandTimer > 0) playerLandTimer -= dt; // 着地モーションタイマー減算

  // 着地時の処理
  if (p.onGround) {
    coyoteTime = COYOTE_TIME;
    // 落下から着地した瞬間にlandタイマーをセット
    if (p.vy === 0 && !wasOnGround) playerLandTimer = LAND_DURATION;
  }

  // ジャンプ実行判定：
  //   バッファが有効 かつ（地面にいる OR コヨーテタイム内）
  const canJump = p.onGround || coyoteTime > 0;
  if (jumpBuffer > 0 && canJump && p.vy >= 0) {
    p.vy        = JUMP_VY;
    p.onGround  = false;
    coyoteTime  = 0;  // 消費
    jumpBuffer  = 0;  // 消費
    SFX.jump();
  }

  if (p.y > INTERNAL_H + 64) { die(); return; }

  // カメラ
  camera.x = Math.max(0, Math.min(p.x - INTERNAL_W*0.4, stageData.stageLen - INTERNAL_W));

  // アニメ
  animTimer += dt;
  if (animTimer > 0.12) { animTimer = 0; animFrame ^= 1; }

  // 敵
  for (const e of stageData.enemies) {
    if (!e.alive) continue;
    e.x += e.vx * dt;
    if (Math.abs(e.x - e.startX) > e.range) e.vx *= -1;

    const ex = e.x+6, ey = e.y+8;
    if (overlaps(p.x+6, p.y+4, 20, 24, ex, ey, 20, 18)) {
      die(); return;
    }
  }

  // アイテム取得
  for (const item of stageData.items) {
    if (item.collected) continue;
    if (overlaps(p.x+6, p.y+4, 20, 24, item.x, item.y, 16, 16)) {
      item.collected = true;
      itemCount++;
      popups.push({ x: item.x, y: item.y, life: 0.7, vy: -40 });
      SFX.item();
    }
  }

  // ポップアップ更新
  for (const pop of popups) { pop.life -= dt; pop.y += pop.vy*dt; }
  popups = popups.filter(p => p.life > 0);

  // ゴール開放チェック
  if (!goalUnlocked && itemCount >= NEED_ITEMS) {
    goalUnlocked = true;
    SFX.unlock();
  }

  // ゴール判定
  if (goalUnlocked) {
    const gx = stageData.goalX;
    if (p.x+16 > gx && p.x < gx+TILE) {
      // 6/6取得でゴールした場合のみ★を付与
      if (itemCount >= TOTAL_ITEMS) {
        clearGotStar = unlockBeautyStar(stageIndex);
      }
      state = STATE.CLEAR;
      clearTimer = 0;
      SFX.goal();
    }
  }

  // 雲
  for (const c of bgClouds) { c.x -= c.speed*dt; if (c.x < -64) c.x = INTERNAL_W+64; }
}

function die() {
  player.alive = false;
  state = STATE.DEAD;
  deadTimer = 0;
  SFX.miss();
}

// ---- 描画 ----
function draw() {
  ctx.fillStyle = GB.BG;
  ctx.fillRect(0,0,INTERNAL_W,INTERNAL_H);

  if (state === STATE.TITLE)    { drawTitle(); return; }
  if (state === STATE.GAMEOVER) { drawGameOver(); return; }

  // タイトル・GAMEOVER以外の画面ではロゴを非表示
  showTitleLogoImg(false);

  const cx = Math.floor(camera.x);
  const bg = stageData.bg || 'harbor';

  // 背景色をステージごとに変える
  ctx.fillStyle = BG_SKY[bg] || GB.BG;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);

  // 背景オブジェクト描画
  drawBG(bg, cx);

  // 雲（space以外）
  if (bg !== 'space') {
    for (const c of bgClouds) drawSprite('cloud', Math.floor(c.x), Math.floor(c.y));
  }

  // タイル
  // タイル描画（地面 + 空中ブロック）
  for (const t of [...stageData.tiles, ...stageData.platformTiles]) {
    const sx = t.tx*TILE-cx, sy = t.ty*TILE;
    if (sx > -TILE && sx < INTERNAL_W+TILE) drawSprite('tile', sx, sy);
  }

  // ゴール旗（Canvas描画のまま）
  const gsx = stageData.goalX - cx;
  if (gsx > -32 && gsx < INTERNAL_W+32) {
    ctx.fillStyle = GB.DARK;
    ctx.fillRect(gsx+14, GROUND_Y-64, 4, 64);
    if (goalUnlocked) {
      ctx.fillStyle = Math.floor(Date.now()/150)%2===0 ? GB.BG : GB.LIGHT;
    } else {
      ctx.fillStyle = GB.DARKEST;
    }
    ctx.fillRect(gsx+18, GROUND_Y-62, 12, 10);
  }

  // アイテム
  const blink = Math.floor(Date.now()/200)%2===0;
  for (const item of stageData.items) {
    if (item.collected) continue;
    const ix = item.x - cx;
    if (ix < -16 || ix > INTERNAL_W+16) continue;
    ctx.globalAlpha = blink ? 1 : 0.7;
    drawSprite('item_0', ix, item.y);
  }
  ctx.globalAlpha = 1;

  // 敵（animFrameでenemy_0/1を交互に切り替え、vx>0の右向きは左右反転）
  for (const e of stageData.enemies) {
    if (!e.alive) continue;
    const ex = e.x - cx;
    if (ex <= -32 || ex >= INTERNAL_W + 32) continue;
    const sprKey = animFrame === 0 ? 'enemy_0' : 'enemy_1';
    if (e.vx > 0) {
      // 右向き：左右反転して描画
      ctx.save();
      ctx.scale(-1, 1);
      drawSprite(sprKey, -(ex + 32), e.y);
      ctx.restore();
    } else {
      // 左向き：そのまま描画
      drawSprite(sprKey, ex, e.y);
    }
  }

  // プレイヤー
  if (player.alive) {
    const sprKey = getPlayerSprite(player.onGround, animFrame, player.vy);
    drawSprite(sprKey, Math.floor(player.x-cx), Math.floor(player.y));
  }

  // ポップアップ
  ctx.textAlign = 'center';
  ctx.font = '8px monospace';
  for (const pop of popups) {
    ctx.globalAlpha = Math.max(0, pop.life/0.7);
    ctx.fillStyle = GB.DARKEST;
    ctx.fillText('★', Math.floor(pop.x-cx+8), Math.floor(pop.y));
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';

  drawUI();
  if (state === STATE.DEAD)  drawDead();
  if (state === STATE.CLEAR) drawClear();
}

// ---- 背景空色テーブル ----
const BG_SKY = {
  harbor:    '#9BBC0F',  // 昼の空（デフォルトGB緑）
  school:    '#9BBC0F',
  office:    '#8BAC0F',  // 少し曇り気味
  downtown:  '#8BAC0F',
  shopping:  '#9BBC0F',
  shitamachi:'#8BAC0F',
  space:     '#0F380F',  // 宇宙は最暗色
};

// ---- 背景描画メイン ----
function drawBG(bg, cx) {
  switch (bg) {
    case 'harbor':    drawBG_harbor(cx);    break;
    case 'school':    drawBG_school(cx);    break;
    case 'office':    drawBG_office(cx);    break;
    case 'downtown':  drawBG_downtown(cx);  break;
    case 'shopping':  drawBG_shopping(cx);  break;
    case 'shitamachi':drawBG_shitamachi(cx);break;
    case 'space':     drawBG_space(cx);     break;
    default:          drawBG_harbor(cx);
  }
}

// ---- 視差スクロールヘルパー ----
// parallax: 0=固定 1=地面と同速 0.5=半速
function px(worldX, parallax, cx) { return worldX - cx * parallax; }

// ================================================================
//共通補助関数（他ステージの街背景でも流用可能）
// ================================================================

// 街灯（支柱＋アーム＋灯体）
function drawStreetLight(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 3, baseY - 48, 2, 48);   // 支柱
  ctx.fillRect(sx, baseY - 48, 10, 2);        // アーム横
  ctx.fillRect(sx, baseY - 48, 2, 6);         // アーム縦
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx - 1, baseY - 50, 4, 4);     // 灯体
}

// フェンス（柵：杭＋横桟2本）
function drawFence(sx, baseY, width) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 14, width, 2);     // 上桟
  ctx.fillRect(sx, baseY - 7,  width, 2);     // 下桟
  for (let i = 0; i <= width; i += 8) {
    ctx.fillRect(sx + i, baseY - 16, 2, 16);  // 縦杭
  }
}

// 電柱（支柱＋腕木＋碍子）
function drawUtilityPole(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 2, baseY - 80, 4, 80);   // 支柱
  ctx.fillRect(sx - 6, baseY - 72, 20, 3);   // 腕木
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx - 4, baseY - 74, 4, 4);    // 碍子左
  ctx.fillRect(sx + 8, baseY - 74, 4, 4);    // 碍子右
}

// ガードレール（横桟2本＋支柱）
function drawGuardRail(sx, baseY, width) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - 12, width, 3);    // 上レール
  ctx.fillRect(sx, baseY - 6,  width, 3);    // 下レール
  ctx.fillStyle = GB.DARKEST;
  for (let i = 0; i <= width; i += 16) {
    ctx.fillRect(sx + i, baseY - 14, 2, 14); // 支柱
  }
}

// 木箱（クレートっぽい線入り）
function drawCrate(sx, baseY, size) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - size, size, size);
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - size, size, 2);           // 上枠
  ctx.fillRect(sx, baseY - 2, size, 2);              // 下枠
  ctx.fillRect(sx + size / 2 - 1, baseY - size, 2, size); // 中央縦線
  ctx.fillRect(sx, baseY - size / 2, size, 2);       // 中央横線
}

// ドラム缶（縦長の円筒を矩形で表現）
function drawDrum(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 18, 10, 18);      // 本体
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 1, baseY - 18, 8, 3);   // 上蓋
  ctx.fillRect(sx + 1, baseY - 3,  8, 3);   // 下帯
  ctx.fillRect(sx + 1, baseY - 11, 8, 2);   // 中帯
}

// 道路標識（丸看板＋支柱）
function drawRoadSign(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 3, baseY - 36, 2, 36);  // 支柱
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - 36, 8, 8);       // 看板（四角で代用）
  ctx.fillStyle = GB.BG;
  ctx.fillRect(sx + 2, baseY - 34, 4, 4);   // 看板内側
}

// ================================================================
// 港専用補助関数
// ================================================================

// 貨物船シルエット（大型・遠景用）
function drawHarborFreighter(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 20, 80, 14);         // 船体
  ctx.fillRect(sx + 6, baseY - 30, 60, 10);     // 上甲板
  ctx.fillRect(sx + 10, baseY - 46, 24, 16);    // 船橋
  ctx.fillRect(sx + 34, baseY - 56, 6, 26);     // 煙突
  ctx.fillRect(sx + 44, baseY - 40, 6, 20);     // 第2煙突
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 12, baseY - 44, 20, 12);    // 船橋窓帯
  // コンテナ積載
  ctx.fillStyle = GB.DARK;
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(sx + 6 + i * 12, baseY - 38, 10, 8);
  }
}

// コンテナスタック（色違いの箱を積む）
function drawContainerStack(sx, baseY) {
  const pattern = [
    [0, 0, GB.DARKEST], [12, 0, GB.DARK], [24, 0, GB.DARKEST],
    [6, 10, GB.DARK],   [18, 10, GB.DARKEST],
    [12, 20, GB.DARK],
  ];
  for (const [dx, dy, col] of pattern) {
    ctx.fillStyle = col;
    ctx.fillRect(sx + dx, baseY - 32 + dy, 10, 9);
    // コンテナの枠線
    ctx.fillStyle = GB.BG;
    ctx.fillRect(sx + dx, baseY - 32 + dy, 10, 1);
    ctx.fillRect(sx + dx + 5, baseY - 32 + dy, 1, 9);
  }
}

// 倉庫シルエット（大型・のこぎり屋根）
function drawWarehouse(sx, baseY, w, h) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, h);
  // のこぎり屋根（三角を繰り返す）
  ctx.fillStyle = GB.DARK;
  const roofW = Math.floor(w / 3);
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(sx + i * roofW, baseY - h);
    ctx.lineTo(sx + i * roofW + roofW, baseY - h - 12);
    ctx.lineTo(sx + i * roofW + roofW, baseY - h);
    ctx.fill();
  }
  // 窓（横長スリット）
  ctx.fillStyle = GB.LIGHT;
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(sx + 6 + i * (w / 3), baseY - h + 12, w / 3 - 10, 6);
  }
  // シャッター
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + w / 2 - 12, baseY - 24, 24, 24);
  ctx.fillStyle = GB.DARKEST;
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(sx + w / 2 - 12, baseY - 24 + i * 6, 24, 1);
  }
}

// 浮き輪（丸形を矩形で表現）
function drawLifeRing(sx, baseY) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 2, baseY - 12, 8, 12);     // 本体
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 4, baseY - 10, 4, 8);      // 中穴
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 2, baseY - 12, 4, 4);      // 白セクション
  ctx.fillRect(sx + 6, baseY - 4,  4, 4);
}

// ロープコイル
function drawRope(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 4, 14, 4);           // 下段
  ctx.fillRect(sx + 2, baseY - 8, 10, 4);       // 中段
  ctx.fillRect(sx + 4, baseY - 10, 6, 2);       // 上段
}

// カラーコーン
function drawCone(sx, baseY) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 2, baseY - 12, 8, 2);       // 底面
  ctx.fillRect(sx + 3, baseY - 18, 6, 6);       // 中胴
  ctx.fillRect(sx + 4, baseY - 22, 4, 4);       // 上胴
  ctx.fillRect(sx + 5, baseY - 24, 2, 2);       // 先端
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 3, baseY - 16, 6, 2);       // 反射帯
}

// ================================================================
// harbor: 港・クレーン・水平線（3層強化版）
// ================================================================
function drawBG_harbor(cx) {

  // ---- 固定背景：海と水平線 ----
  // 水平線
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(0, GROUND_Y - 36, INTERNAL_W, 4);
  // 海面帯
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(0, GROUND_Y - 32, INTERNAL_W, 32);
  // 海面のさざ波（横線を数本）
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(0, GROUND_Y - 28, INTERNAL_W, 2);
  ctx.fillRect(0, GROUND_Y - 20, INTERNAL_W, 1);
  ctx.fillRect(0, GROUND_Y - 12, INTERNAL_W, 1);

  // ================================================================
  // 【レイヤー1】遠景（視差 0.15〜0.25）
  // 薄い色・大きめシルエット
  // ================================================================

  // 遠景：大型貨物船（視差0.18）
  const freighters = [400, 1600, 2800];
  for (const wx of freighters) {
    const sx = Math.floor(px(wx, 0.18, cx));
    if (sx < -90 || sx > INTERNAL_W + 90) continue;
    drawHarborFreighter(sx, GROUND_Y - 32);
  }

  // 遠景：港湾施設シルエット（大型倉庫・視差0.2）
  const warehouses = [
    { wx: 200,  w: 72, h: 52 },
    { wx: 900,  w: 88, h: 60 },
    { wx: 1400, w: 64, h: 48 },
    { wx: 2100, w: 88, h: 60 },
    { wx: 2600, w: 72, h: 52 },
  ];
  for (const wh of warehouses) {
    const sx = Math.floor(px(wh.wx, 0.2, cx));
    if (sx < -wh.w - 4 || sx > INTERNAL_W + 4) continue;
    drawWarehouse(sx, GROUND_Y - 32, wh.w, wh.h);
  }

  // 遠景：大型クレーン（視差0.22）
  const bigCranes = [650, 1300, 2000, 2900];
  for (const wx of bigCranes) {
    const sx = Math.floor(px(wx, 0.22, cx));
    if (sx < -50 || sx > INTERNAL_W + 50) continue;
    ctx.fillStyle = GB.DARKEST;
    ctx.fillRect(sx + 14, GROUND_Y - 110, 5, 78);   // 支柱
    ctx.fillRect(sx,      GROUND_Y - 110, 48, 5);   // 横アーム（長め）
    ctx.fillRect(sx + 32, GROUND_Y - 108, 2, 56);   // ケーブル
    ctx.fillRect(sx + 20, GROUND_Y - 108, 2, 36);   // ケーブル2
    ctx.fillRect(sx + 8,  GROUND_Y - 34,  14, 4);   // 土台
    // クレーンの運転台
    ctx.fillRect(sx + 10, GROUND_Y - 116, 12, 8);
  }

  // ================================================================
  // 【レイヤー2】中景（視差 0.38〜0.55）
  // 倉庫・コンテナ・街灯・フェンスなど
  // ================================================================

  // 中景：コンテナスタック（視差0.42）
  const containerStacks = [150, 520, 820, 1200, 1650, 2050, 2450, 2850];
  for (const wx of containerStacks) {
    const sx = Math.floor(px(wx, 0.42, cx));
    if (sx < -40 || sx > INTERNAL_W + 40) continue;
    drawContainerStack(sx, GROUND_Y - 32);
  }

  // 中景：フェンス（視差0.45、長めに連続配置）
  const fences = [100, 380, 700, 1050, 1380, 1700, 2080, 2400, 2750];
  for (const wx of fences) {
    const sx = Math.floor(px(wx, 0.45, cx));
    if (sx < -80 || sx > INTERNAL_W + 4) continue;
    drawFence(sx, GROUND_Y, 72);
  }

  // 中景：電柱（視差0.48）
  const poles = [250, 650, 1100, 1550, 2000, 2500];
  for (const wx of poles) {
    const sx = Math.floor(px(wx, 0.48, cx));
    if (sx < -16 || sx > INTERNAL_W + 16) continue;
    drawUtilityPole(sx, GROUND_Y);
  }

  // 中景：街灯（視差0.5）
  const lights = [180, 480, 780, 1080, 1480, 1780, 2180, 2580, 2880];
  for (const wx of lights) {
    const sx = Math.floor(px(wx, 0.5, cx));
    if (sx < -16 || sx > INTERNAL_W + 16) continue;
    drawStreetLight(sx, GROUND_Y);
  }

  // ================================================================
  // 【レイヤー3】前景寄りの装飾（視差 0.75〜0.9）
  // 木箱・ドラム缶・標識・小物など
  // ================================================================

  // 前景：ガードレール（視差0.75、地面際に連続）
  const rails = [0, 400, 800, 1200, 1600, 2000, 2400, 2800];
  for (const wx of rails) {
    const sx = Math.floor(px(wx, 0.75, cx));
    if (sx < -96 || sx > INTERNAL_W + 4) continue;
    drawGuardRail(sx, GROUND_Y, 80);
  }

  // 前景：木箱（視差0.8、大小混在）
  const crates = [
    { wx:  90, size: 14 }, { wx: 110, size: 10 },
    { wx: 420, size: 14 }, { wx: 440, size: 10 }, { wx: 456, size: 14 },
    { wx: 750, size: 10 }, { wx: 768, size: 14 },
    { wx:1100, size: 14 }, { wx:1118, size: 10 },
    { wx:1450, size: 10 }, { wx:1466, size: 14 }, { wx:1484, size: 10 },
    { wx:1820, size: 14 }, { wx:1838, size: 10 },
    { wx:2200, size: 10 }, { wx:2216, size: 14 },
    { wx:2600, size: 14 }, { wx:2618, size: 10 },
    { wx:2900, size: 14 }, { wx:2918, size: 10 },
  ];
  for (const c of crates) {
    const sx = Math.floor(px(c.wx, 0.8, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;
    drawCrate(sx, GROUND_Y, c.size);
  }

  // 前景：ドラム缶（視差0.82）
  const drums = [200, 560, 880, 1250, 1600, 1970, 2320, 2680];
  for (const wx of drums) {
    const sx = Math.floor(px(wx, 0.82, cx));
    if (sx < -12 || sx > INTERNAL_W + 12) continue;
    drawDrum(sx, GROUND_Y);
    // 2本並びにする
    drawDrum(sx + 14, GROUND_Y);
  }

  // 前景：浮き輪（視差0.78）
  const rings = [320, 900, 1380, 1900, 2350, 2800];
  for (const wx of rings) {
    const sx = Math.floor(px(wx, 0.78, cx));
    if (sx < -16 || sx > INTERNAL_W + 16) continue;
    drawLifeRing(sx, GROUND_Y);
  }

  // 前景：ロープコイル（視差0.85）
  const ropes = [140, 510, 860, 1210, 1560, 1930, 2300, 2700];
  for (const wx of ropes) {
    const sx = Math.floor(px(wx, 0.85, cx));
    if (sx < -16 || sx > INTERNAL_W + 16) continue;
    drawRope(sx, GROUND_Y);
  }

  // 前景：カラーコーン（視差0.88）
  const cones = [260, 650, 1020, 1400, 1760, 2130, 2510, 2870];
  for (const wx of cones) {
    const sx = Math.floor(px(wx, 0.88, cx));
    if (sx < -12 || sx > INTERNAL_W + 12) continue;
    drawCone(sx, GROUND_Y);
  }

  // 前景：道路標識（視差0.9）
  const signs = [380, 980, 1560, 2140, 2720];
  for (const wx of signs) {
    const sx = Math.floor(px(wx, 0.9, cx));
    if (sx < -12 || sx > INTERNAL_W + 12) continue;
    drawRoadSign(sx, GROUND_Y);
  }
}

// ================================================================
// school専用補助関数
// ================================================================

// 一戸建て住宅
function drawSchoolHouse(sx, baseY, w = 48, h = 52) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 三角屋根
  ctx.fillStyle = GB.DARKEST;
  ctx.beginPath();
  ctx.moveTo(sx - 4, baseY - h);
  ctx.lineTo(sx + w / 2, baseY - h - 16);
  ctx.lineTo(sx + w + 4, baseY - h);
  ctx.fill();

  // 窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 7, baseY - h + 12, 10, 10);
  ctx.fillRect(sx + w - 17, baseY - h + 12, 10, 10);

  // 玄関
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 5, baseY - 20, 10, 20);
}


// 学校校舎
function drawSchoolBuilding(sx, baseY, w = 96, h = 72) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      ctx.fillRect(
        sx + 8 + col * 21,
        baseY - h + 10 + row * 22,
        10,
        10
      );
    }
  }

  // 中央玄関
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 8, baseY - 24, 16, 24);

  // 時計
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 7, baseY - h - 14, 14, 14);
  ctx.fillStyle = GB.BG;
  ctx.fillRect(sx + w / 2 - 4, baseY - h - 11, 8, 8);
}


// 体育館
function drawGymnasium(sx, baseY, w = 80, h = 48) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 屋根
  ctx.fillStyle = GB.DARKEST;
  ctx.beginPath();
  ctx.moveTo(sx - 4, baseY - h);
  ctx.lineTo(sx + w / 2, baseY - h - 18);
  ctx.lineTo(sx + w + 4, baseY - h);
  ctx.fill();

  // 大きな窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 10, baseY - h + 12, 16, 14);
  ctx.fillRect(sx + 32, baseY - h + 12, 16, 14);
  ctx.fillRect(sx + 54, baseY - h + 12, 16, 14);
}


// 遠景マンション
function drawApartment(sx, baseY, w = 52, h = 90) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  ctx.fillStyle = GB.LIGHT;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 3; col++) {
      ctx.fillRect(
        sx + 6 + col * 15,
        baseY - h + 8 + row * 13,
        7,
        7
      );
    }
  }
}


// 学校の門
function drawSchoolGate(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 左右の門柱
  ctx.fillRect(sx, baseY - 30, 8, 30);
  ctx.fillRect(sx + 48, baseY - 30, 8, 30);

  // 門扉
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 8, baseY - 22, 40, 2);
  ctx.fillRect(sx + 8, baseY - 5, 40, 2);

  for (let i = 0; i <= 40; i += 8) {
    ctx.fillRect(sx + 8 + i, baseY - 22, 2, 19);
  }
}


// 街路樹
function drawStreetTree(sx, baseY) {
  // 幹
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 7, baseY - 30, 4, 30);

  // 葉
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 2, baseY - 46, 14, 16);
  ctx.fillRect(sx, baseY - 42, 18, 10);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 5, baseY - 43, 6, 5);
}


// 自販機
function drawVendingMachine(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 30, 16, 30);

  // 商品窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 3, baseY - 26, 10, 10);

  // 商品ボタン
  ctx.fillStyle = GB.BG;
  ctx.fillRect(sx + 4, baseY - 23, 2, 2);
  ctx.fillRect(sx + 7, baseY - 23, 2, 2);
  ctx.fillRect(sx + 10, baseY - 23, 2, 2);

  // 取り出し口
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 4, baseY - 7, 8, 4);
}


// 植木鉢
function drawPlanter(sx, baseY) {
  // 鉢
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 2, baseY - 8, 10, 8);

  // 葉
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 5, baseY - 16, 4, 8);
  ctx.fillRect(sx + 2, baseY - 14, 4, 5);
  ctx.fillRect(sx + 8, baseY - 14, 4, 5);
}


// ================================================================
// school: 住宅街・学校（3層強化版）
// ================================================================
function drawBG_school(cx) {

  // ================================================================
  // 【レイヤー1】遠景（視差0.18〜0.25）
  // 学校・体育館・マンションなど大きな景色
  // ================================================================

  const schools = [450, 1700, 2650];

  for (const wx of schools) {
    const sx = Math.floor(px(wx, 0.20, cx));
    if (sx < -110 || sx > INTERNAL_W + 110) continue;

    drawSchoolBuilding(sx, GROUND_Y, 96, 72);
  }


  const gyms = [1000, 2250];

  for (const wx of gyms) {
    const sx = Math.floor(px(wx, 0.22, cx));
    if (sx < -90 || sx > INTERNAL_W + 90) continue;

    drawGymnasium(sx, GROUND_Y, 80, 48);
  }


  const apartments = [150, 750, 1350, 2050, 2900];

  for (const wx of apartments) {
    const sx = Math.floor(px(wx, 0.18, cx));
    if (sx < -60 || sx > INTERNAL_W + 60) continue;

    drawApartment(sx, GROUND_Y, 52, 90);
  }


  // ================================================================
  // 【レイヤー2】中景（視差0.38〜0.55）
  // 住宅・フェンス・電柱・街路樹・学校門
  // ================================================================

  const houses = [
    { wx:  80, w:48, h:52 },
    { wx: 340, w:44, h:48 },
    { wx: 650, w:48, h:56 },
    { wx: 940, w:44, h:48 },
    { wx:1250, w:48, h:52 },
    { wx:1550, w:44, h:48 },
    { wx:1880, w:48, h:56 },
    { wx:2180, w:44, h:48 },
    { wx:2500, w:48, h:52 },
    { wx:2800, w:44, h:48 },
  ];

  for (const h of houses) {
    const sx = Math.floor(px(h.wx, 0.40, cx));
    if (sx < -60 || sx > INTERNAL_W + 60) continue;

    drawSchoolHouse(sx, GROUND_Y, h.w, h.h);
  }


  // 学校フェンス
  const fences = [
    240, 520, 820, 1120,
    1450, 1760, 2100, 2420, 2740
  ];

  for (const wx of fences) {
    const sx = Math.floor(px(wx, 0.46, cx));
    if (sx < -90 || sx > INTERNAL_W + 20) continue;

    drawFence(sx, GROUND_Y, 80);
  }


  // 電柱
  const poles = [
    180, 580, 1030, 1500,
    1980, 2430, 2860
  ];

  for (const wx of poles) {
    const sx = Math.floor(px(wx, 0.48, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;

    drawUtilityPole(sx, GROUND_Y);
  }


  // 街路樹
  const trees = [
    300, 720, 1180, 1600,
    2030, 2460, 2880
  ];

  for (const wx of trees) {
    const sx = Math.floor(px(wx, 0.52, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;

    drawStreetTree(sx, GROUND_Y);
  }


  // 学校門
  const gates = [900, 1900, 2760];

  for (const wx of gates) {
    const sx = Math.floor(px(wx, 0.50, cx));
    if (sx < -70 || sx > INTERNAL_W + 70) continue;

    drawSchoolGate(sx, GROUND_Y);
  }


  // ================================================================
  // 【レイヤー3】前景寄り（視差0.75〜0.9）
  // ガードレール・標識・自販機・植木鉢
  // ================================================================

  const rails = [
    0, 400, 800, 1200,
    1600, 2000, 2400, 2800
  ];

  for (const wx of rails) {
    const sx = Math.floor(px(wx, 0.76, cx));
    if (sx < -100 || sx > INTERNAL_W + 20) continue;

    drawGuardRail(sx, GROUND_Y, 72);
  }


  const signs = [
    260, 860, 1450, 2050, 2700
  ];

  for (const wx of signs) {
    const sx = Math.floor(px(wx, 0.85, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;

    drawRoadSign(sx, GROUND_Y);
  }


  // 自販機
  const vendingMachines = [
    500, 1320, 2200, 2920
  ];

  for (const wx of vendingMachines) {
    const sx = Math.floor(px(wx, 0.82, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;

    drawVendingMachine(sx, GROUND_Y);
  }


  // 植木鉢
  const planters = [
    130, 680, 1080, 1740,
    2350, 2620
  ];

  for (const wx of planters) {
    const sx = Math.floor(px(wx, 0.88, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;

    drawPlanter(sx, GROUND_Y);
  }


  // 街灯
  const lights = [
    380, 980, 1580,
    2150, 2760
  ];

  for (const wx of lights) {
    const sx = Math.floor(px(wx, 0.80, cx));
    if (sx < -20 || sx > INTERNAL_W + 20) continue;

    drawStreetLight(sx, GROUND_Y);
  }
}
// ================================================================
// office専用補助関数
// ================================================================

// 高層ビル
function drawOfficeTower(sx, baseY, w = 44, h = 120) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, h);

  // 屋上
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 4, baseY - h - 4, w - 8, 4);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  for (let row = 0; row < h - 16; row += 12) {
    for (let col = 6; col < w - 6; col += 10) {
      if ((row + col + w) % 3 !== 0) {
        ctx.fillRect(
          sx + col,
          baseY - h + 8 + row,
          5,
          7
        );
      }
    }
  }

  // アンテナ
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 1, baseY - h - 14, 2, 10);
}


// ガラス張りオフィス
function drawGlassOffice(sx, baseY, w = 64, h = 74) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // ガラス面
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 4, baseY - h + 6, w - 8, h - 16);

  // 窓枠
  ctx.fillStyle = GB.DARKEST;

  for (let x = 12; x < w; x += 14) {
    ctx.fillRect(sx + x, baseY - h + 6, 2, h - 16);
  }

  for (let y = 18; y < h - 10; y += 16) {
    ctx.fillRect(sx + 4, baseY - h + y, w - 8, 2);
  }

  // エントランス
  ctx.fillRect(sx + w / 2 - 8, baseY - 22, 16, 22);
}


// 都会のお店
function drawCityShop(sx, baseY, w = 44, h = 42, type = 'CAFE') {

  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 看板
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, 12);

  ctx.fillStyle = GB.BG;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(type, sx + w / 2, baseY - h + 8);
  ctx.textAlign = 'left';

  // ショーウィンドウ
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 4, baseY - 25, 18, 18);

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w - 16, baseY - 26, 12, 26);

  // ドア窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + w - 13, baseY - 22, 6, 9);
}


// 自動車
function drawOfficeCar(sx, baseY, taxi = false) {

  // 車体
  ctx.fillStyle = taxi ? GB.DARK : GB.DARKEST;
  ctx.fillRect(sx, baseY - 11, 30, 8);
  ctx.fillRect(sx + 7, baseY - 17, 16, 6);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 9, baseY - 15, 6, 4);
  ctx.fillRect(sx + 16, baseY - 15, 5, 4);

  // タクシーランプ
  if (taxi) {
    ctx.fillStyle = GB.DARKEST;
    ctx.fillRect(sx + 13, baseY - 20, 6, 3);
  }

  // タイヤ
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 4,  baseY - 5, 6, 5);
  ctx.fillRect(sx + 21, baseY - 5, 6, 5);
}


// ヘリコプター
function drawHelicopter(sx, sy) {

  ctx.fillStyle = GB.DARKEST;

  // 胴体
  ctx.fillRect(sx + 8, sy + 6, 28, 10);
  ctx.fillRect(sx + 14, sy + 3, 14, 6);

  // 尾翼
  ctx.fillRect(sx, sy + 8, 10, 4);
  ctx.fillRect(sx + 2, sy + 3, 3, 10);

  // メインローター
  ctx.fillRect(sx + 10, sy, 32, 2);
  ctx.fillRect(sx + 24, sy - 3, 2, 5);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 26, sy + 7, 7, 5);

  // スキッド
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 12, sy + 18, 22, 2);
  ctx.fillRect(sx + 15, sy + 15, 2, 4);
  ctx.fillRect(sx + 30, sy + 15, 2, 4);
}


// ビル屋上看板
function drawBillboard(sx, baseY) {

  ctx.fillStyle = GB.DARKEST;

  // 支柱
  ctx.fillRect(sx + 4, baseY - 30, 2, 30);
  ctx.fillRect(sx + 34, baseY - 30, 2, 30);

  // 看板
  ctx.fillRect(sx, baseY - 48, 40, 20);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 3, baseY - 45, 34, 14);

  // 適当な広告模様
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 7, baseY - 42, 8, 8);
  ctx.fillRect(sx + 19, baseY - 40, 14, 3);
}


// ================================================================
// office: 高層ビル・オフィス街（3層強化版）
// ================================================================
function drawBG_office(cx) {

  // ================================================================
  // 【レイヤー1】遠景
  // 高層ビル群・都市のスカイライン
  // 視差 0.15〜0.25
  // ================================================================

  const towers = [
    { wx:  50, w:40, h:110 },
    { wx: 260, w:52, h:140 },
    { wx: 520, w:36, h:96  },
    { wx: 760, w:56, h:150 },
    { wx:1050, w:42, h:120 },
    { wx:1320, w:54, h:145 },
    { wx:1600, w:38, h:105 },
    { wx:1880, w:56, h:155 },
    { wx:2180, w:40, h:125 },
    { wx:2450, w:52, h:140 },
    { wx:2760, w:44, h:115 },
    { wx:3020, w:54, h:150 },
  ];

  for (const t of towers) {
    const sx = Math.floor(px(t.wx, 0.20, cx));

    if (sx < -t.w - 10 || sx > INTERNAL_W + 10) continue;

    drawOfficeTower(
      sx,
      GROUND_Y,
      t.w,
      t.h
    );
  }


  // 遠景のガラスビル
  const glassOffices = [
    420,
    1200,
    2050,
    2860
  ];

  for (const wx of glassOffices) {
    const sx = Math.floor(px(wx, 0.24, cx));

    if (sx < -80 || sx > INTERNAL_W + 80) continue;

    drawGlassOffice(
      sx,
      GROUND_Y,
      68,
      86
    );
  }


  // ================================================================
  // 【空】ヘリコプター
  // ゆっくり流れるので都市感が出る
  // ================================================================

  const heliPositions = [
    { wx: 700,  y:32 },
    { wx:1900,  y:46 },
    { wx:2900,  y:25 },
  ];

  for (const h of heliPositions) {

    const sx = Math.floor(
      px(h.wx, 0.28, cx)
    );

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawHelicopter(
      sx,
      h.y
    );
  }


  // ================================================================
  // 【レイヤー2】中景
  // オフィス・店舗・看板・電柱
  // 視差0.38〜0.55
  // ================================================================

  const offices = [
    120,
    650,
    1180,
    1720,
    2320,
    2850
  ];

  for (const wx of offices) {

    const sx = Math.floor(
      px(wx, 0.40, cx)
    );

    if (
      sx < -80 ||
      sx > INTERNAL_W + 80
    ) continue;

    drawGlassOffice(
      sx,
      GROUND_Y,
      64,
      72
    );
  }


  // 店舗
  const shops = [
    { wx: 330, type:'CAFE' },
    { wx: 880, type:'SHOP' },
    { wx:1450, type:'CAFE' },
    { wx:2000, type:'MART' },
    { wx:2570, type:'SHOP' },
    { wx:3100, type:'CAFE' },
  ];

  for (const s of shops) {

    const sx = Math.floor(
      px(s.wx, 0.48, cx)
    );

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawCityShop(
      sx,
      GROUND_Y,
      44,
      42,
      s.type
    );
  }


  // 電柱
  const poles = [
    220,
    720,
    1220,
    1780,
    2300,
    2800
  ];

  for (const wx of poles) {

    const sx = Math.floor(
      px(wx, 0.52, cx)
    );

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawUtilityPole(
      sx,
      GROUND_Y
    );
  }


  // 屋外広告
  const billboards = [
    520,
    1350,
    2150,
    2950
  ];

  for (const wx of billboards) {

    const sx = Math.floor(
      px(wx, 0.44, cx)
    );

    if (
      sx < -50 ||
      sx > INTERNAL_W + 50
    ) continue;

    drawBillboard(
      sx,
      GROUND_Y
    );
  }


  // ================================================================
  // 【レイヤー3】前景寄り
  // 車・タクシー・ガードレール・標識・街灯
  // 視差0.75〜0.9
  // ================================================================

  // ガードレール
  const rails = [
    0,
    400,
    800,
    1200,
    1600,
    2000,
    2400,
    2800
  ];

  for (const wx of rails) {

    const sx = Math.floor(
      px(wx, 0.78, cx)
    );

    if (
      sx < -100 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawGuardRail(
      sx,
      GROUND_Y,
      76
    );
  }


  // 車
  const cars = [
    { wx: 150, taxi:false },
    { wx: 520, taxi:true  },
    { wx: 930, taxi:false },
    { wx:1380, taxi:true  },
    { wx:1810, taxi:false },
    { wx:2250, taxi:true  },
    { wx:2680, taxi:false },
    { wx:3040, taxi:true  },
  ];

  for (const car of cars) {

    const sx = Math.floor(
      px(car.wx, 0.84, cx)
    );

    if (
      sx < -40 ||
      sx > INTERNAL_W + 40
    ) continue;

    drawOfficeCar(
      sx,
      GROUND_Y,
      car.taxi
    );
  }


  // 街灯
  const lights = [
    300,
    760,
    1250,
    1700,
    2200,
    2660,
    3100
  ];

  for (const wx of lights) {

    const sx = Math.floor(
      px(wx, 0.82, cx)
    );

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawStreetLight(
      sx,
      GROUND_Y
    );
  }


  // 道路標識
  const signs = [
    430,
    1080,
    1660,
    2350,
    2950
  ];

  for (const wx of signs) {

    const sx = Math.floor(
      px(wx, 0.88, cx)
    );

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawRoadSign(
      sx,
      GROUND_Y
    );
  }
}

// ================================================================
// downtown専用補助関数
// ================================================================

// 繁華街の雑居ビル
function drawDowntownBuilding(sx, baseY, w = 52, h = 90) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  for (let row = 0; row < h - 18; row += 16) {
    for (let col = 6; col < w - 8; col += 14) {
      ctx.fillRect(
        sx + col,
        baseY - h + 8 + row,
        7,
        8
      );
    }
  }

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 8, baseY - 22, 16, 22);
}


// 大型屋上看板
function drawDowntownBillboard(sx, baseY, label = 'CITY') {
  ctx.fillStyle = GB.DARKEST;

  // 支柱（地面まで伸ばす）
  ctx.fillRect(sx + 5,  baseY - 24, 2, 24);
  ctx.fillRect(sx + 39, baseY - 24, 2, 24);

  // 看板（地面に近い位置）
  ctx.fillRect(sx, baseY - 40, 46, 18);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 3, baseY - 37, 40, 12);

  // 看板文字（ビットマップフォントでくっきり表示）
  bmapText(label, sx + 23, Math.floor(baseY - 34), 1, GB.DARKEST);
}


// カラオケ店
function drawKaraokeShop(sx, baseY, w = 46, h = 52) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 上部看板
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, 14);

  ctx.fillStyle =
    Math.floor(Date.now() / 350) % 2 === 0
      ? GB.BG
      : GB.LIGHT;

  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KARAOKE', sx + w / 2, baseY - h + 10);
  ctx.textAlign = 'left';

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 6, baseY - 28, 16, 28);

  // ポスター
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 28, baseY - 28, 11, 18);
}


// ゲームセンター
function drawGameCenter(sx, baseY, w = 52, h = 56) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 派手な看板
  const blink =
    Math.floor(Date.now() / 220) % 2 === 0;

  ctx.fillStyle = blink ? GB.DARKEST : GB.LIGHT;
  ctx.fillRect(sx, baseY - h, w, 14);

  ctx.fillStyle = blink ? GB.BG : GB.DARKEST;
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GAME', sx + w / 2, baseY - h + 10);
  ctx.textAlign = 'left';

  // 大きなガラス入口
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 6, baseY - 34, w - 12, 26);

  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 1, baseY - 34, 2, 26);

  // クレーンゲームっぽい箱
  ctx.fillRect(sx + 5, baseY - 9, 10, 9);
  ctx.fillRect(sx + w - 15, baseY - 9, 10, 9);
}


// 飲食店
function drawFoodShop(sx, baseY, w = 42, h = 40, label = 'FOOD') {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 看板
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, 11);

  ctx.fillStyle = GB.BG;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(label, sx + w / 2, baseY - h + 8);
  ctx.textAlign = 'left';

  // 暖簾っぽい部分
  ctx.fillStyle = GB.LIGHT;
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(sx + 4 + i * 8, baseY - 26, 6, 10);
  }

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 12, baseY - 16, 18, 16);
}


// 縦長ネオン看板
function drawVerticalSign(sx, baseY, label = 'BAR') {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 72, 14, 46);

  // 内側
  const blink =
    Math.floor(Date.now() / 300) % 2 === 0;

  ctx.fillStyle = blink ? GB.LIGHT : GB.BG;
  ctx.fillRect(sx + 3, baseY - 69, 8, 40);

  // 縦線模様
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 5, baseY - 64, 4, 4);
  ctx.fillRect(sx + 5, baseY - 55, 4, 4);
  ctx.fillRect(sx + 5, baseY - 46, 4, 4);
  ctx.fillRect(sx + 5, baseY - 37, 4, 4);

  // 支柱
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 6, baseY - 26, 2, 26);
}


// 突き出し看板
function drawSideSign(sx, sy, w = 24) {
  ctx.fillStyle = GB.DARKEST;

  // 支え
  ctx.fillRect(sx, sy + 4, 8, 2);

  // 看板
  ctx.fillRect(sx + 8, sy, w, 10);

  ctx.fillStyle =
    Math.floor(Date.now() / 400) % 2 === 0
      ? GB.LIGHT
      : GB.BG;

  ctx.fillRect(sx + 11, sy + 3, w - 6, 4);
}


// 路上立て看板
function drawStandingSign(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  ctx.fillRect(sx + 2, baseY - 22, 14, 18);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 5, baseY - 19, 8, 9);

  // 脚
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 4, 6, 4);
  ctx.fillRect(sx + 12, baseY - 4, 6, 4);
}


// ================================================================
// downtown: 繁華街・カラオケ・ゲーセン（3層強化版）
// ================================================================
function drawBG_downtown(cx) {

  // ================================================================
  // 【レイヤー1】遠景
  // 雑居ビル群・大型広告
  // ================================================================

  const buildings = [
    { wx:  30, w:48, h:100 },
    { wx: 220, w:54, h:125 },
    { wx: 480, w:44, h:92  },
    { wx: 720, w:58, h:130 },
    { wx: 980, w:48, h:110 },
    { wx:1240, w:56, h:138 },
    { wx:1530, w:46, h:96  },
    { wx:1800, w:60, h:132 },
    { wx:2090, w:48, h:112 },
    { wx:2380, w:56, h:128 },
    { wx:2680, w:46, h:98  },
    { wx:2960, w:58, h:136 },
  ];

  for (const b of buildings) {
    const sx = Math.floor(px(b.wx, 0.20, cx));

    if (
      sx < -b.w - 10 ||
      sx > INTERNAL_W + 10
    ) continue;

    drawDowntownBuilding(
      sx,
      GROUND_Y,
      b.w,
      b.h
    );
  }


  // 屋上大型看板
  const billboards = [
    { wx: 360, label:'CITY' },
    { wx:1050, label:'LIVE' },
    { wx:1750, label:'NIGHT' },
    { wx:2450, label:'PLAY' },
    { wx:3050, label:'NOW' },
  ];

  for (const b of billboards) {
    const sx = Math.floor(px(b.wx, 0.24, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawDowntownBillboard(
      sx,
      GROUND_Y,
      b.label
    );
  }


  // ================================================================
  // 【レイヤー2】中景
  // カラオケ・ゲーセン・飲食店
  // ================================================================

  const karaokes = [
    100,
    850,
    1600,
    2350,
    3000
  ];

  for (const wx of karaokes) {
    const sx = Math.floor(px(wx, 0.42, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawKaraokeShop(
      sx,
      GROUND_Y
    );
  }


  const games = [
    340,
    1100,
    1900,
    2650
  ];

  for (const wx of games) {
    const sx = Math.floor(px(wx, 0.46, cx));

    if (
      sx < -70 ||
      sx > INTERNAL_W + 70
    ) continue;

    drawGameCenter(
      sx,
      GROUND_Y
    );
  }


  const foodShops = [
    { wx: 580, label:'RAMEN' },
    { wx:1350, label:'CAFE'  },
    { wx:2150, label:'FOOD'  },
    { wx:2850, label:'BAR'   },
  ];

  for (const s of foodShops) {
    const sx = Math.floor(px(s.wx, 0.50, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawFoodShop(
      sx,
      GROUND_Y,
      42,
      40,
      s.label
    );
  }


  // ================================================================
  // 中景上部：縦看板・突き出し看板
  // とにかく看板を増やす
  // ================================================================

  const verticalSigns = [
    210,
    500,
    780,
    1030,
    1320,
    1580,
    1840,
    2080,
    2360,
    2600,
    2880,
    3120
  ];

  for (const wx of verticalSigns) {
    const sx = Math.floor(px(wx, 0.52, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawVerticalSign(
      sx,
      GROUND_Y
    );
  }


 

  // ================================================================
  // 【レイヤー3】前景寄り
  // 路上看板・街灯・自販機・ガードレール
  // ================================================================

  const rails = [
    0,
    400,
    800,
    1200,
    1600,
    2000,
    2400,
    2800
  ];

  for (const wx of rails) {
    const sx = Math.floor(px(wx, 0.78, cx));

    if (
      sx < -100 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawGuardRail(
      sx,
      GROUND_Y,
      72
    );
  }


  // 路上看板
  const standingSigns = [
    180,
    460,
    730,
    1020,
    1290,
    1580,
    1860,
    2180,
    2500,
    2820,
    3100
  ];

  for (const wx of standingSigns) {
    const sx = Math.floor(px(wx, 0.86, cx));

    if (
      sx < -24 ||
      sx > INTERNAL_W + 24
    ) continue;

    drawStandingSign(
      sx,
      GROUND_Y
    );
  }


  // 自販機
  const vendingMachines = [
    320,
    900,
    1480,
    2050,
    2700
  ];

  for (const wx of vendingMachines) {
    const sx = Math.floor(px(wx, 0.83, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawVendingMachine(
      sx,
      GROUND_Y
    );
  }


  // 街灯
  const lights = [
    100,
    560,
    1120,
    1690,
    2250,
    2780
  ];

  for (const wx of lights) {
    const sx = Math.floor(px(wx, 0.82, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawStreetLight(
      sx,
      GROUND_Y
    );
  }


  // 道路標識
  const signs = [
    680,
    1430,
    1980,
    2580,
    3160
  ];

  for (const wx of signs) {
    const sx = Math.floor(px(wx, 0.90, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawRoadSign(
      sx,
      GROUND_Y
    );
  }
}
// ================================================================
// shopping専用補助関数
// 高級商業街・宝石店・花屋・クラブ・ホテル
// ================================================================

// 高級マンション / ホテル
function drawLuxuryTower(sx, baseY, w = 52, h = 118) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, h);

  // 縦のガラス帯
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 6, baseY - h + 6, w - 12, h - 16);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  for (let row = 0; row < h - 24; row += 14) {
    for (let col = 10; col < w - 8; col += 14) {
      ctx.fillRect(
        sx + col,
        baseY - h + 10 + row,
        7,
        8
      );
    }
  }

  // エントランス
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 10, baseY - 25, 20, 25);

  // 入口上の庇
  ctx.fillRect(sx + w / 2 - 15, baseY - 28, 30, 4);
}


// 宝石店
function drawJewelryShop(sx, baseY, w = 48, h = 46) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 上品な看板
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, 12);

  ctx.fillStyle = GB.BG;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('JEWEL', sx + w / 2, baseY - h + 8);
  ctx.textAlign = 'left';

  // 大きなショーウィンドウ
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 5, baseY - 29, w - 10, 20);

  // 宝石ディスプレイ
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 11, baseY - 22, 5, 5);
  ctx.fillRect(sx + 22, baseY - 24, 7, 7);
  ctx.fillRect(sx + 35, baseY - 21, 4, 4);

  // 入口
  ctx.fillRect(sx + w - 14, baseY - 20, 9, 20);
}


// 高級花屋
function drawLuxuryFlowerShop(sx, baseY, w = 46, h = 44) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, 11);

  ctx.fillStyle = GB.BG;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FLOWER', sx + w / 2, baseY - h + 8);
  ctx.textAlign = 'left';

  // ショーウィンドウ
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 4, baseY - 28, 26, 20);

  // 花束っぽい点
  const flowers = [
    [9,17],[15,13],[21,18],[13,21],[24,14]
  ];

  for (const [fx, fy] of flowers) {
    ctx.fillStyle = GB.DARKEST;
    ctx.fillRect(sx + fx, baseY - fy, 4, 4);
  }

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 34, baseY - 22, 8, 22);
}


// 高級クラブ
function drawLuxuryClub(sx, baseY, w = 54, h = 52) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - h, w, h);

  // 看板
  ctx.fillStyle =
    Math.floor(Date.now() / 500) % 2 === 0
      ? GB.LIGHT
      : GB.BG;

  ctx.fillRect(sx + 5, baseY - h + 5, w - 10, 10);

  ctx.fillStyle = GB.DARKEST;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CLUB', sx + w / 2, baseY - h + 12);
  ctx.textAlign = 'left';

  // 重そうな入口
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 17, baseY - 29, 20, 29);

  // ドアの窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 22, baseY - 24, 10, 8);

  // 入口左右の照明
  ctx.fillStyle = GB.BG;
  ctx.fillRect(sx + 8,  baseY - 25, 4, 7);
  ctx.fillRect(sx + 42, baseY - 25, 4, 7);
}


// 高級バー
function drawLuxuryBar(sx, baseY, w = 44, h = 40) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 小さめ看板
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 8, baseY - h - 12, 28, 12);

  ctx.fillStyle = GB.BG;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BAR', sx + 22, baseY - h - 4);
  ctx.textAlign = 'left';

  // 店内窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 5, baseY - 27, 18, 17);

  // ドア
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 29, baseY - 25, 10, 25);
}


// 高級車 / 黒塗りセダン
function drawLuxuryCar(sx, baseY) {
  // 車体
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 11, 34, 8);
  ctx.fillRect(sx + 8, baseY - 17, 18, 6);

  // 窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 10, baseY - 15, 7, 4);
  ctx.fillRect(sx + 18, baseY - 15, 6, 4);

  // タイヤ
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 4, baseY - 5, 6, 5);
  ctx.fillRect(sx + 24, baseY - 5, 6, 5);
}


// ホテル / クラブの入口用キャノピー
function drawCanopy(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 支柱
  ctx.fillRect(sx + 4, baseY - 24, 2, 24);
  ctx.fillRect(sx + 30, baseY - 24, 2, 24);

  // 屋根
  ctx.fillRect(sx, baseY - 26, 36, 5);

  // 内側
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 4, baseY - 25, 28, 2);
}


// 高級街っぽい植え込み
function drawLuxuryPlanter(sx, baseY) {
  // 鉢
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 2, baseY - 10, 16, 10);

  // 木
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 8, baseY - 28, 4, 18);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 4, baseY - 36, 12, 10);
  ctx.fillRect(sx + 2, baseY - 32, 16, 8);
}


// 細身の高級街路灯
function drawLuxuryLamp(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 支柱
  ctx.fillRect(sx + 4, baseY - 52, 2, 52);

  // 灯り
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 1, baseY - 56, 8, 6);

  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, baseY - 58, 10, 2);
}


// ================================================================
// shopping: 高級商業街（3層強化版）
// ================================================================
function drawBG_shopping(cx) {

  // ================================================================
  // 【レイヤー1】遠景
  // 高級ホテル・高層マンション・商業ビル
  // ================================================================

  const luxuryTowers = [
    { wx:  60, w:48, h:110 },
    { wx: 320, w:54, h:132 },
    { wx: 620, w:46, h:104 },
    { wx: 900, w:56, h:140 },
    { wx:1200, w:50, h:116 },
    { wx:1490, w:58, h:136 },
    { wx:1810, w:46, h:108 },
    { wx:2100, w:56, h:142 },
    { wx:2410, w:48, h:120 },
    { wx:2700, w:58, h:138 },
    { wx:3000, w:50, h:112 },
  ];

  for (const b of luxuryTowers) {
    const sx = Math.floor(px(b.wx, 0.20, cx));

    if (
      sx < -b.w - 10 ||
      sx > INTERNAL_W + 10
    ) continue;

    drawLuxuryTower(
      sx,
      GROUND_Y,
      b.w,
      b.h
    );
  }


  // ================================================================
  // 【レイヤー2】中景
  // 宝石店・花屋・クラブ・バー
  // ================================================================

  const jewelries = [
    120,
    960,
    1850,
    2700
  ];

  for (const wx of jewelries) {
    const sx = Math.floor(px(wx, 0.42, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawJewelryShop(
      sx,
      GROUND_Y
    );
  }


  const flowerShops = [
    380,
    1320,
    2220,
    3040
  ];

  for (const wx of flowerShops) {
    const sx = Math.floor(px(wx, 0.46, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawLuxuryFlowerShop(
      sx,
      GROUND_Y
    );
  }


  const clubs = [
    650,
    1580,
    2450
  ];

  for (const wx of clubs) {
    const sx = Math.floor(px(wx, 0.48, cx));

    if (
      sx < -70 ||
      sx > INTERNAL_W + 70
    ) continue;

    drawLuxuryClub(
      sx,
      GROUND_Y
    );
  }


  const bars = [
    800,
    1700,
    2880
  ];

  for (const wx of bars) {
    const sx = Math.floor(px(wx, 0.50, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawLuxuryBar(
      sx,
      GROUND_Y
    );
  }


  // ホテル / クラブのキャノピー
  const canopies = [
    540,
    1450,
    2340
  ];

  for (const wx of canopies) {
    const sx = Math.floor(px(wx, 0.52, cx));

    if (
      sx < -50 ||
      sx > INTERNAL_W + 50
    ) continue;

    drawCanopy(
      sx,
      GROUND_Y
    );
  }


  // ================================================================
  // 【レイヤー3】前景寄り
  // 高級車・植栽・街灯・標識
  // ================================================================

  const cars = [
    180,
    520,
    900,
    1260,
    1650,
    2050,
    2480,
    2900
  ];

  for (const wx of cars) {
    const sx = Math.floor(px(wx, 0.84, cx));

    if (
      sx < -44 ||
      sx > INTERNAL_W + 44
    ) continue;

    drawLuxuryCar(
      sx,
      GROUND_Y
    );
  }


  const planters = [
    80,
    310,
    720,
    1100,
    1500,
    1900,
    2300,
    2630,
    3100
  ];

  for (const wx of planters) {
    const sx = Math.floor(px(wx, 0.86, cx));

    if (
      sx < -24 ||
      sx > INTERNAL_W + 24
    ) continue;

    drawLuxuryPlanter(
      sx,
      GROUND_Y
    );
  }


  const lamps = [
    250,
    680,
    1080,
    1480,
    1880,
    2280,
    2680,
    3080
  ];

  for (const wx of lamps) {
    const sx = Math.floor(px(wx, 0.82, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawLuxuryLamp(
      sx,
      GROUND_Y
    );
  }


  // ガードレールは少なめ
  // 高級街なので道路脇をすっきりさせる
  const rails = [
    400,
    1200,
    2000,
    2800
  ];

  for (const wx of rails) {
    const sx = Math.floor(px(wx, 0.78, cx));

    if (
      sx < -100 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawGuardRail(
      sx,
      GROUND_Y,
      64
    );
  }


  const signs = [
    760,
    1760,
    2760
  ];

  for (const wx of signs) {
    const sx = Math.floor(px(wx, 0.90, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawRoadSign(
      sx,
      GROUND_Y
    );
  }
}
// ================================================================
// shitamachi専用補助関数
// 浅草・下町・寺社・駄菓子屋
// ================================================================

// 古い町家
function drawOldTownHouse(sx, baseY, w = 46, h = 48) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 瓦屋根
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx - 3, baseY - h - 6, w + 6, 7);

  // 二階窓
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 7, baseY - h + 10, 10, 9);
  ctx.fillRect(sx + w - 17, baseY - h + 10, 10, 9);

  // 格子戸
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 8, baseY - 22, 16, 22);

  ctx.fillStyle = GB.DARK;
  for (let i = 2; i < 15; i += 4) {
    ctx.fillRect(sx + w / 2 - 8 + i, baseY - 22, 1, 22);
  }
}


// 駄菓子屋
function drawDagashiShop(sx, baseY, w = 48, h = 42) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 古い屋根
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx - 4, baseY - h - 5, w + 8, 7);

  // のれん
  ctx.fillStyle = GB.LIGHT;
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(sx + 5 + i * 9, baseY - h + 4, 7, 12);
  }

  // 店先
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 5, baseY - 17, w - 10, 17);

  // お菓子箱っぽい点
  ctx.fillStyle = GB.BG;
  ctx.fillRect(sx + 9,  baseY - 13, 5, 4);
  ctx.fillRect(sx + 18, baseY - 12, 6, 5);
  ctx.fillRect(sx + 29, baseY - 14, 5, 6);
}


// 和菓子屋
function drawWagashiShop(sx, baseY, w = 48, h = 44) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, baseY - h, w, h);

  // 看板
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 8, baseY - h - 12, 32, 12);

  ctx.fillStyle = GB.BG;
  ctx.font = '5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('WAGASHI', sx + 24, baseY - h - 4);
  ctx.textAlign = 'left';

  // ショーケース
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 5, baseY - 27, 24, 17);

  // 団子っぽい表示
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 10, baseY - 22, 4, 4);
  ctx.fillRect(sx + 16, baseY - 22, 4, 4);
  ctx.fillRect(sx + 22, baseY - 22, 4, 4);

  // 入口
  ctx.fillRect(sx + 34, baseY - 22, 9, 22);
}


// 寺の本堂っぽい建物
function drawTempleBuilding(sx, baseY, w = 96, h = 56) {
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 8, baseY - h, w - 16, h);

  // 大屋根
  ctx.fillStyle = GB.DARKEST;
  ctx.beginPath();
  ctx.moveTo(sx, baseY - h);
  ctx.lineTo(sx + w / 2, baseY - h - 22);
  ctx.lineTo(sx + w, baseY - h);
  ctx.fill();

  // 二段目の屋根
  ctx.fillRect(sx + 10, baseY - h + 16, w - 20, 5);

  // 柱
  for (let i = 18; i < w - 12; i += 18) {
    ctx.fillRect(sx + i, baseY - 34, 4, 34);
  }

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + w / 2 - 10, baseY - 28, 20, 28);
}


// 五重塔っぽい塔
function drawPagoda(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 軸
  ctx.fillRect(sx + 18, baseY - 110, 8, 110);

  // 各層
  const levels = [
    { y:100, w:44 },
    { y:82,  w:40 },
    { y:64,  w:36 },
    { y:46,  w:32 },
    { y:28,  w:28 },
  ];

  for (const lv of levels) {
    ctx.fillRect(
      sx + 22 - lv.w / 2,
      baseY - lv.y,
      lv.w,
      5
    );
  }

  // 最上部
  ctx.fillRect(sx + 21, baseY - 120, 2, 12);
}


// 鳥居
function drawTorii(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 柱
  ctx.fillRect(sx + 5, baseY - 54, 4, 54);
  ctx.fillRect(sx + 31, baseY - 54, 4, 54);

  // 上部
  ctx.fillRect(sx, baseY - 58, 40, 5);
  ctx.fillRect(sx + 4, baseY - 49, 32, 4);
}


// 石灯籠
function drawStoneLantern(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  ctx.fillRect(sx + 5, baseY - 22, 6, 22);

  ctx.fillRect(sx + 2, baseY - 29, 12, 7);
  ctx.fillRect(sx, baseY - 31, 16, 3);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 5, baseY - 27, 6, 4);
}


// 提灯
function drawLantern(sx, sy) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 5, sy, 2, 4);

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(sx + 2, sy + 4, 8, 10);

  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 2, sy + 7, 8, 2);
  ctx.fillRect(sx + 2, sy + 11, 8, 2);
}


// 提灯列
function drawLanternRow(sx, sy, count = 5) {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx, sy, count * 18, 2);

  for (let i = 0; i < count; i++) {
    drawLantern(
      sx + 5 + i * 18,
      sy
    );
  }
}


// 人力車っぽい背景小物
function drawRickshaw(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 大車輪
  ctx.beginPath();
  ctx.arc(sx + 12, baseY - 10, 8, 0, Math.PI * 2);
  ctx.strokeStyle = GB.DARKEST;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 車体
  ctx.fillRect(sx + 16, baseY - 22, 15, 12);

  // 屋根
  ctx.fillRect(sx + 18, baseY - 27, 11, 5);

  // 引き棒
  ctx.fillRect(sx + 30, baseY - 10, 18, 2);
}


// ベンチ
function drawBench(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  ctx.fillRect(sx, baseY - 12, 28, 4);
  ctx.fillRect(sx, baseY - 22, 28, 4);

  ctx.fillRect(sx + 4, baseY - 8, 2, 8);
  ctx.fillRect(sx + 22, baseY - 8, 2, 8);
}


// ================================================================
// shitamachi: 浅草風の下町（3層強化版）
// ================================================================
function drawBG_shitamachi(cx) {

  // ================================================================
  // 【レイヤー1】遠景
  // 寺社・五重塔・古い町並み
  // ================================================================

  const pagodas = [
    500,
    1900,
    2900
  ];

  for (const wx of pagodas) {
    const sx = Math.floor(px(wx, 0.18, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawPagoda(
      sx,
      GROUND_Y
    );
  }


  const temples = [
    900,
    2300
  ];

  for (const wx of temples) {
    const sx = Math.floor(px(wx, 0.22, cx));

    if (
      sx < -110 ||
      sx > INTERNAL_W + 110
    ) continue;

    drawTempleBuilding(
      sx,
      GROUND_Y,
      96,
      56
    );
  }


  // 遠景の町家
  const farHouses = [
    100,
    350,
    700,
    1200,
    1500,
    1750,
    2100,
    2550,
    2800,
    3100
  ];

  for (const wx of farHouses) {
    const sx = Math.floor(px(wx, 0.26, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawOldTownHouse(
      sx,
      GROUND_Y,
      44,
      46
    );
  }


  // ================================================================
  // 【レイヤー2】中景
  // 駄菓子屋・和菓子屋・町家・鳥居
  // ================================================================

  const dagashiShops = [
    120,
    880,
    1680,
    2500
  ];

  for (const wx of dagashiShops) {
    const sx = Math.floor(px(wx, 0.42, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawDagashiShop(
      sx,
      GROUND_Y
    );
  }


  const wagashiShops = [
    420,
    1300,
    2100,
    2950
  ];

  for (const wx of wagashiShops) {
    const sx = Math.floor(px(wx, 0.46, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawWagashiShop(
      sx,
      GROUND_Y
    );
  }


  const oldHouses = [
    650,
    1050,
    1520,
    1900,
    2350,
    2750
  ];

  for (const wx of oldHouses) {
    const sx = Math.floor(px(wx, 0.48, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawOldTownHouse(
      sx,
      GROUND_Y,
      46,
      48
    );
  }


  // 鳥居
  const torii = [
    760,
    1800,
    2700
  ];

  for (const wx of torii) {
    const sx = Math.floor(px(wx, 0.52, cx));

    if (
      sx < -50 ||
      sx > INTERNAL_W + 50
    ) continue;

    drawTorii(
      sx,
      GROUND_Y
    );
  }


  // ================================================================
  // 【上部装飾】提灯列
  // 浅草っぽい賑わいを出す
  // ================================================================

  const lanternRows = [
    { wx: 250,  y:32, count:5 },
    { wx:1100,  y:38, count:6 },
    { wx:2000,  y:30, count:5 },
    { wx:2850,  y:36, count:6 },
  ];

  for (const row of lanternRows) {
    const sx = Math.floor(px(row.wx, 0.55, cx));

    if (
      sx < -120 ||
      sx > INTERNAL_W + 120
    ) continue;

    drawLanternRow(
      sx,
      row.y,
      row.count
    );
  }


  // ================================================================
  // 【レイヤー3】前景寄り
  // 石灯籠・人力車・ベンチ・植木鉢
  // ================================================================

  const lanterns = [
    170,
    580,
    980,
    1420,
    1880,
    2250,
    2650,
    3050
  ];

  for (const wx of lanterns) {
    const sx = Math.floor(px(wx, 0.82, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawStoneLantern(
      sx,
      GROUND_Y
    );
  }


  // 人力車
  const rickshaws = [
    320,
    1180,
    2050,
    2920
  ];

  for (const wx of rickshaws) {
    const sx = Math.floor(px(wx, 0.86, cx));

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawRickshaw(
      sx,
      GROUND_Y
    );
  }


  // ベンチ
  const benches = [
    500,
    1480,
    2420
  ];

  for (const wx of benches) {
    const sx = Math.floor(px(wx, 0.84, cx));

    if (
      sx < -40 ||
      sx > INTERNAL_W + 40
    ) continue;

    drawBench(
      sx,
      GROUND_Y
    );
  }


  // 植木鉢はschoolで作ったものを流用
  const planters = [
    80,
    720,
    1360,
    1750,
    2320,
    2780
  ];

  for (const wx of planters) {
    const sx = Math.floor(px(wx, 0.88, cx));

    if (
      sx < -20 ||
      sx > INTERNAL_W + 20
    ) continue;

    drawPlanter(
      sx,
      GROUND_Y
    );
  }
}
// ================================================================
// space専用補助関数
// 最終ステージ：宇宙・星・月
// ================================================================

// 月
function drawSpaceMoon(sx, sy, r = 28) {
  ctx.fillStyle = GB.LIGHT;
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.fill();

  // クレーター
  ctx.fillStyle = GB.DARK;

  ctx.beginPath();
  ctx.arc(sx - 9, sy - 7, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(sx + 10, sy + 6, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(sx - 3, sy + 13, 3, 0, Math.PI * 2);
  ctx.fill();
}


// 輪のある惑星
function drawSpacePlanet(sx, sy, r = 14) {
  // 輪
  ctx.strokeStyle = GB.LIGHT;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.ellipse(
    sx,
    sy,
    r + 12,
    6,
    -0.15,
    0,
    Math.PI * 2
  );
  ctx.stroke();

  // 惑星本体
  ctx.fillStyle = GB.DARK;

  ctx.beginPath();
  ctx.arc(
    sx,
    sy,
    r,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // 模様
  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(
    sx - r + 3,
    sy - 2,
    r * 2 - 6,
    3
  );
}


// 人工衛星
function drawSatellite(sx, sy) {
  ctx.fillStyle = GB.DARKEST;

  // 本体
  ctx.fillRect(sx + 14, sy + 6, 14, 12);

  // 左右パネル
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx, sy + 5, 12, 14);
  ctx.fillRect(sx + 30, sy + 5, 12, 14);

  // パネル格子
  ctx.fillStyle = GB.LIGHT;

  ctx.fillRect(sx + 5, sy + 5, 2, 14);
  ctx.fillRect(sx + 35, sy + 5, 2, 14);

  ctx.fillRect(sx, sy + 11, 12, 2);
  ctx.fillRect(sx + 30, sy + 11, 12, 2);

  // アンテナ
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(sx + 20, sy, 2, 7);
}


// ロケット
function drawRocket(sx, sy) {
  ctx.fillStyle = GB.LIGHT;

  // 胴体
  ctx.fillRect(sx + 7, sy + 7, 10, 24);

  // 先端
  ctx.fillStyle = GB.DARKEST;

  ctx.beginPath();
  ctx.moveTo(sx + 7, sy + 7);
  ctx.lineTo(sx + 12, sy);
  ctx.lineTo(sx + 17, sy + 7);
  ctx.fill();

  // 翼
  ctx.fillRect(sx + 3, sy + 23, 5, 9);
  ctx.fillRect(sx + 16, sy + 23, 5, 9);

  // 窓
  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx + 10, sy + 11, 4, 4);

  // 噴射
  ctx.fillStyle = GB.LIGHT;

  const flame =
    Math.floor(Date.now() / 120) % 2 === 0
      ? 8
      : 12;

  ctx.fillRect(
    sx + 9,
    sy + 31,
    6,
    flame
  );
}


// 流星
function drawMeteor(sx, sy) {
  ctx.fillStyle = GB.LIGHT;

  ctx.fillRect(sx, sy, 5, 5);

  ctx.fillStyle = GB.DARK;
  ctx.fillRect(sx - 7, sy + 2, 7, 2);
  ctx.fillRect(sx - 12, sy + 3, 5, 1);
}


// 月面岩
function drawMoonRock(sx, baseY, size = 14) {
  ctx.fillStyle = GB.DARK;

  ctx.beginPath();
  ctx.moveTo(sx, baseY);
  ctx.lineTo(sx + 2, baseY - size + 4);
  ctx.lineTo(sx + size / 2, baseY - size);
  ctx.lineTo(sx + size, baseY - size + 6);
  ctx.lineTo(sx + size + 2, baseY);
  ctx.fill();

  // 岩の影
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(
    sx + size / 2,
    baseY - size + 5,
    3,
    5
  );
}


// 宇宙アンテナ
function drawSpaceAntenna(sx, baseY) {
  ctx.fillStyle = GB.DARKEST;

  // 支柱
  ctx.fillRect(
    sx + 12,
    baseY - 30,
    3,
    30
  );

  // 皿
  ctx.beginPath();
  ctx.arc(
    sx + 13,
    baseY - 31,
    11,
    Math.PI,
    Math.PI * 2
  );
  ctx.fill();

  // アンテナ先
  ctx.fillRect(
    sx + 12,
    baseY - 45,
    2,
    14
  );

  ctx.fillStyle = GB.LIGHT;
  ctx.fillRect(
    sx + 11,
    baseY - 47,
    4,
    4
  );
}


// 宇宙基地
function drawSpaceBase(sx, baseY, w = 64) {
  ctx.fillStyle = GB.DARK;

  // 本体
  ctx.fillRect(
    sx,
    baseY - 34,
    w,
    34
  );

  // ドーム
  ctx.fillStyle = GB.LIGHT;

  ctx.beginPath();
  ctx.arc(
    sx + w / 2,
    baseY - 34,
    18,
    Math.PI,
    Math.PI * 2
  );
  ctx.fill();

  // 入口
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(
    sx + w / 2 - 7,
    baseY - 19,
    14,
    19
  );

  // 窓
  ctx.fillStyle = GB.BG;

  ctx.fillRect(
    sx + 8,
    baseY - 24,
    10,
    7
  );

  ctx.fillRect(
    sx + w - 18,
    baseY - 24,
    10,
    7
  );
}


// ================================================================
// space: 宇宙・星・月（最終ステージ強化版）
// ================================================================
function drawBG_space(cx) {

  // ================================================================
  // 【固定背景】星空
  // ================================================================

  const stars = [
    [12,18],[30,40],[48,12],[68,56],
    [88,27],[110,8],[130,44],[148,20],
    [166,65],[185,35],[205,13],[224,52],
    [244,28],[265,7],[282,61],[300,20],
    [316,46],[54,78],[100,86],[154,74],
    [210,88],[270,82],[310,94],
  ];

  for (const [x, y] of stars) {

    // 少しだけ動かす
    const sx =
      ((x - cx * 0.04) % INTERNAL_W + INTERNAL_W)
      % INTERNAL_W;

    const blink =
      Math.floor(Date.now() / 500 + x) % 3;

    ctx.fillStyle =
      blink === 0
        ? GB.LIGHT
        : GB.DARK;

    const size =
      blink === 0
        ? 2
        : 1;

    ctx.fillRect(
      Math.floor(sx),
      y,
      size,
      size
    );
  }


  // ================================================================
  // 【レイヤー1】超遠景
  // 月・惑星
  // ================================================================

  // 巨大な月
  const moonX =
    Math.floor(
      px(1350, 0.06, cx)
    );

  if (
    moonX > -80 &&
    moonX < INTERNAL_W + 80
  ) {
    drawSpaceMoon(
      moonX,
      48,
      34
    );
  }


  // 輪のある惑星
  const planets = [
    { wx: 400,  y:35, r:11 },
    { wx:2400,  y:55, r:15 },
  ];

  for (const p of planets) {

    const sx =
      Math.floor(
        px(p.wx, 0.10, cx)
      );

    if (
      sx < -50 ||
      sx > INTERNAL_W + 50
    ) continue;

    drawSpacePlanet(
      sx,
      p.y,
      p.r
    );
  }


  // ================================================================
  // 【レイヤー2】中景
  // 宇宙基地・人工衛星・ロケット
  // ================================================================

  const bases = [
    250,
    1200,
    2150,
    2980
  ];

  for (const wx of bases) {

    const sx =
      Math.floor(
        px(wx, 0.30, cx)
      );

    if (
      sx < -80 ||
      sx > INTERNAL_W + 80
    ) continue;

    drawSpaceBase(
      sx,
      GROUND_Y
    );
  }


  // 人工衛星
  const satellites = [
    { wx: 700,  y:24 },
    { wx:1800,  y:46 },
    { wx:2750,  y:20 },
  ];

  for (const s of satellites) {

    const sx =
      Math.floor(
        px(s.wx, 0.24, cx)
      );

    if (
      sx < -60 ||
      sx > INTERNAL_W + 60
    ) continue;

    drawSatellite(
      sx,
      s.y
    );
  }


  // ロケット
  const rockets = [
    { wx:1050, y:26 },
    { wx:2550, y:38 },
  ];

  for (const r of rockets) {

    const sx =
      Math.floor(
        px(r.wx, 0.34, cx)
      );

    if (
      sx < -40 ||
      sx > INTERNAL_W + 40
    ) continue;

    drawRocket(
      sx,
      r.y
    );
  }


  // ================================================================
  // 流星
  // ================================================================

  const meteors = [
    { wx:500,  y:35 },
    { wx:1450, y:60 },
    { wx:2300, y:28 },
    { wx:3100, y:50 },
  ];

  for (const m of meteors) {

    const sx =
      Math.floor(
        px(m.wx, 0.42, cx)
      );

    if (
      sx < -30 ||
      sx > INTERNAL_W + 30
    ) continue;

    drawMeteor(
      sx,
      m.y
    );
  }


  // ================================================================
  // 【レイヤー3】前景寄り
  // 月面岩・アンテナ
  // ================================================================

  const rocks = [
    { wx: 100, size:12 },
    { wx: 320, size:16 },
    { wx: 650, size:10 },
    { wx: 920, size:15 },
    { wx:1220, size:11 },
    { wx:1500, size:16 },
    { wx:1820, size:12 },
    { wx:2150, size:15 },
    { wx:2470, size:10 },
    { wx:2750, size:16 },
    { wx:3050, size:13 },
  ];

  for (const r of rocks) {

    const sx =
      Math.floor(
        px(r.wx, 0.84, cx)
      );

    if (
      sx < -24 ||
      sx > INTERNAL_W + 24
    ) continue;

    drawMoonRock(
      sx,
      GROUND_Y,
      r.size
    );
  }


  const antennas = [
    450,
    1100,
    1750,
    2400,
    2980
  ];

  for (const wx of antennas) {

    const sx =
      Math.floor(
        px(wx, 0.80, cx)
      );

    if (
      sx < -30 ||
      sx > INTERNAL_W + 30
    ) continue;

    drawSpaceAntenna(
      sx,
      GROUND_Y
    );
  }
}
 
function drawUI() {
  // 上部バー背景
  ctx.fillStyle = GB.DARKEST; ctx.globalAlpha = 0.7;
  ctx.fillRect(0, 0, INTERNAL_W, 12);
  ctx.globalAlpha = 1;

  const D = 1; // ドットサイズ（1px）
  // バーの縦中央にテキストを合わせる（7px高のグリフ → y=3で上端）
  const TY = 3;

  // 左：ステージラベル（例 "STAGE 1"）
  bmapTextLeft(stageData.label, 3, TY, D, GB.BG);

  // 右：アイテム数 or GOAL OPEN!
  if (goalUnlocked) {
    if (Math.floor(Date.now() / 300) % 2 === 0) {
      bmapTextRight('GOAL OPEN!', INTERNAL_W - 3, TY, D, GB.BG);
    }
  } else {
    const txt = `ITEM ${itemCount}/${NEED_ITEMS}`;
    bmapTextRight(txt, INTERNAL_W - 3, TY, D, GB.BG);
  }
}

function drawTitle() {
  // ---- 背景（GB緑）----
  ctx.fillStyle = GB.BG;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
  ctx.imageSmoothingEnabled = false;

  const cx = Math.floor(INTERNAL_W / 2); // 水平中心 = 160px

  // ----------------------------------------------------------------
  // ① タイトルロゴ（imgタグで表示・アニメGIF対応）
  // ----------------------------------------------------------------
  showTitleLogoImg(true);

  // ----------------------------------------------------------------
  // ③ BEAUTY COLLECTION（ビットマップフォント）
  // ----------------------------------------------------------------
  const D = 1;
  bmapText('BEAUTY COLLECTION', cx, 62, D, GB.DARKEST);

  // ----------------------------------------------------------------
  // ④ ★状況（ビットマップフォント）
  // ----------------------------------------------------------------
  const starCount   = getBeautyStarCount();
  const allComplete = isAllBeautyComplete();
  const starStr     = beautyStars.map(v => v ? '★' : '-').join(' ');
  bmapText(starStr, cx, 74, D, GB.DARKEST);

  // ④-b カウント or BEAUTY COMPLETE!
  if (allComplete) {
    const blink = Math.floor(Date.now() / 400) % 2 === 0;
    if (blink) bmapText('BEAUTY COMPLETE!', cx, 84, D, GB.DARKEST);
  } else {
    bmapText(`${starCount} / ${STAGE_DATA.length} COMPLETE`, cx, 84, D, GB.DARKEST);
  }

  // ----------------------------------------------------------------
  // ⑤ START（dot=2 で大きめ表示）
  // ----------------------------------------------------------------
  bmapText('START', cx, 104, 2, GB.DARKEST);

  // ----------------------------------------------------------------
  // ⑥ PRESS SPACE / TAP（点滅）
  // ----------------------------------------------------------------
  if (Math.floor(Date.now() / 500) % 2 === 0) {
    bmapText('PRESS SPACE / TAP', cx, 128, D, GB.DARKEST);
  }
}

function drawDead() {
  ctx.fillStyle = GB.DARKEST; ctx.globalAlpha = 0.6;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
  ctx.globalAlpha = 1;

  const D = 1;
  const cx = Math.floor(INTERNAL_W / 2);
  const cy = Math.floor(INTERNAL_H / 2);

  // MISS!（大きめにdot=2で表示）
  bmapText('MISS!', cx, cy - 14, 2, GB.BG);

  // R / TAP to RETRY（点滅）
  if (deadTimer > 0.5 && Math.floor(Date.now() / 400) % 2 === 0) {
    bmapText('R / TAP to RETRY', cx, cy + 6, D, GB.BG);
  }
}

function drawClear() {
  ctx.fillStyle = GB.DARKEST; ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);
  ctx.globalAlpha = 1;

  const D = 1;
  const cx = Math.floor(INTERNAL_W / 2);
  const cy = Math.floor(INTERNAL_H / 2);
  const isPerfect = itemCount >= TOTAL_ITEMS;

  if (isPerfect) {
    // 6/6クリア
    bmapText('PERFECT BEAUTY!', cx, cy - 26, 2, GB.BG);
    bmapText(`ITEMS: ${itemCount}/${TOTAL_ITEMS}`, cx, cy - 6, D, GB.LIGHT);
    bmapText('★ COMPLETE!', cx, cy + 6, D, GB.BG);
  } else {
    // 5/6以下クリア
    bmapText('STAGE CLEAR!', cx, cy - 22, 2, GB.BG);
    bmapText(`ITEMS: ${itemCount}/${TOTAL_ITEMS}`, cx, cy - 2, D, GB.LIGHT);
  }

  // 次へ促すテキスト（点滅）
  if (clearTimer > 1.5 && Math.floor(Date.now() / 400) % 2 === 0) {
    const isLast = stageIndex >= STAGE_DATA.length - 1;
    const nextTxt = isLast ? 'TAP / SPACE for Title' : 'TAP / SPACE for Next';
    bmapText(nextTxt, cx, cy + 22, D, GB.BG);
  }
}

function drawGameOver() {
  ctx.fillStyle = GB.DARKEST;
  ctx.fillRect(0, 0, INTERNAL_W, INTERNAL_H);

  const D = 1;
  const cx = Math.floor(INTERNAL_W / 2);
  const cy = Math.floor(INTERNAL_H / 2);
  const starCount   = getBeautyStarCount();
  const allComplete = isAllBeautyComplete();

  // ALL CLEAR!（大きめ）
  bmapText('ALL CLEAR!', cx, cy - 76, 2, GB.BG);

  if (allComplete) {
    // 全★取得：COMPLETE.gif を中央に表示（imgタグ経由）
    bmapText('★ PERFECT BEAUTY ★', cx, cy - 54, D, GB.BG);
    // COMPLETE.gif の領域（64×70px を2倍 → 128×140px）はimgタグで担当
    bmapText('ALL BEAUTY COMPLETE!', cx, cy + 54, D, GB.LIGHT);
    showCompleteImg(true);
  } else {
    // 未コンプリート
    bmapText(`BEAUTY ${starCount} / ${STAGE_DATA.length}`, cx, cy - 4, D, GB.LIGHT);
    showCompleteImg(false);
  }

  // タイトルへ（点滅）
  if (Math.floor(Date.now() / 500) % 2 === 0) {
    bmapText('TAP / SPACE to Title', cx, cy + 66, D, GB.BG);
  }
}

// タイトルロゴimgの表示・非表示・位置制御
let _titleLogoImgSetup = false;
function showTitleLogoImg(show) {
  const img = document.getElementById('title-logo-img');
  if (!img) return;

  if (!show) { img.style.display = 'none'; return; }

  if (!_titleLogoImgSetup) {
    const src = LOADED['title_logo'];
    if (!src) { img.style.display = 'none'; return; }
    img.src = src.src || '';
    _titleLogoImgSetup = true;
  }

  const scaleX = canvas.offsetWidth  / INTERNAL_W;
  const scaleY = canvas.offsetHeight / INTERNAL_H;

  // 元サイズ 192×40px → そのままスケール適用
  const dispW = Math.round(192 * scaleX);
  const dispH = Math.round(40  * scaleY);

  // タイトル画面内のロゴY位置（内部座標 y=10）に合わせる
  const logoTop = Math.round(10 * scaleY);

  img.style.display        = 'block';
  img.style.position       = 'absolute';
  img.style.width          = dispW + 'px';
  img.style.height         = dispH + 'px';
  img.style.left           = Math.round((canvas.offsetWidth - dispW) / 2) + 'px';
  img.style.top            = logoTop + 'px';
  img.style.imageRendering = 'pixelated';
}

// COMPLETE.gifのimgタグ表示・非表示・位置制御
let _completeImgSetup = false;
function showCompleteImg(show) {
  const img = document.getElementById('complete-img');
  if (!img) return;

  if (!show) {
    img.style.display = 'none';
    return;
  }

  // 読み込み済み画像のsrcを設定（初回のみ）
  if (!_completeImgSetup) {
    const src = LOADED['complete'];
    if (!src) { img.style.display = 'none'; return; } // 読み込み失敗時は非表示
    img.src = src.src || ''; // HTMLImageElementのsrcを使用
    _completeImgSetup = true;
  }

  // Canvas のスケール比を計算して位置合わせ
  const scaleX = canvas.offsetWidth  / INTERNAL_W;
  const scaleY = canvas.offsetHeight / INTERNAL_H;

  // 表示サイズ：64×70px（元サイズのまま1倍）→ スケール適用
  const dispW = Math.round(64 * scaleX);
  const dispH = Math.round(70 * scaleY);

  // Canvas上の中央Y（内部座標90px付近）をCanvas表示座標に変換
  const centerX = Math.round(canvas.offsetWidth  / 2);
  const centerY = Math.round(canvas.offsetHeight / 2);

  img.style.display   = 'block';
  img.style.position  = 'absolute';
  img.style.width     = dispW + 'px';
  img.style.height    = dispH + 'px';
  img.style.left      = (centerX - dispW / 2) + 'px';
  img.style.top       = (centerY - dispH / 2) + 'px';
  img.style.imageRendering = 'pixelated';
}

// ---- 入力 ----
function handleJump() {
  // ポップアップ表示中はゲーム入力を一切受け付けない
  if (popupActive) return;

  if (state === STATE.TITLE) {
    initGame(0); state = STATE.PLAY;
    bgmPlay(); // ゲーム開始でBGM再生
    return;
  }
  if (state === STATE.GAMEOVER) {
    state = STATE.TITLE;
    bgmStop();
    showCompleteImg(false);
    return;
  }
 if (state === STATE.DEAD && deadTimer > 0.3) {
  initGame(stageIndex); state = STATE.PLAY;
  return;
  }
 if (state === STATE.CLEAR && clearTimer > 1.0) {
  const next = stageIndex + 1;
  if (next >= STAGE_DATA.length) {
    state = STATE.GAMEOVER;
    bgmStop(); // 全ステージクリアでBGM停止

    // 7/7コンプリート時だけファンファーレを1回再生
    if (isAllBeautyComplete() && bgmEnabled && completeSEAudio) {
      completeSEAudio.currentTime = 0;
      completeSEAudio.play().catch(e =>
        console.warn('[SE] コンプリートSE再生失敗:', e)
      );
    }
  } else {
    initGame(next); state = STATE.PLAY;
    // 次ステージへ：BGMはそのまま継続
  }
  return;
}
  // ゲーム中：押しっぱなし防止チェック後、バッファをセット
  if (state === STATE.PLAY && player?.alive && !jumpPressed) {
    jumpPressed = true;
    jumpBuffer  = JUMP_BUFFER_TIME;
  }
}

window.addEventListener('keydown', e => {
  if (popupActive) return; // ポップアップ中はキー入力を無視
  if (e.code==='Space'||e.code==='KeyZ') { e.preventDefault(); handleJump(); }
  if (e.code==='KeyR' && (state===STATE.DEAD||state===STATE.CLEAR)) {
    initGame(stageIndex); state=STATE.PLAY;
  }
});
window.addEventListener('keyup', e => {
  // キーを離したら次の入力を受け付ける
  if (e.code==='Space'||e.code==='KeyZ') jumpPressed = false;
});

// touchstart後にclickが発火するダブルトリガーを防ぐ
let lastTouch = 0;
canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  lastTouch   = Date.now();
  jumpPressed = false; // タッチは毎回新規入力として扱う
  handleJump();
}, { passive: false });
canvas.addEventListener('click', () => {
  if (Date.now() - lastTouch < 500) return;
  jumpPressed = false;
  handleJump();
});

// ---- メインループ ----
let lastTime = 0;
function loop(ts) {
  const dt = Math.min((ts-lastTime)/1000, 0.05);
  lastTime = ts;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}
// ================================================================
// BGM管理
// ================================================================
// ファイル名だけここを変える
// 同じフォルダに置く場合: 'bgm.mp3'
// サブフォルダの場合:     'assets/bgm.mp3'
const BGM_SRC = 'assets/bgm/bgm.mp3';
const COMPLETE_SE_SRC = 'assets/se/complete.mp3';

let bgmAudio = null;
let completeSEAudio = null;
let bgmEnabled = true;

// localStorageからBGM設定を読み込む
function loadBGMSetting() {
  try {
    const saved = localStorage.getItem('tameshiRunnerBGM');
    bgmEnabled = saved !== 'off'; // 未設定またはonならON
  } catch(e) {}
}

// BGM設定をlocalStorageに保存
function saveBGMSetting() {
  try {
    localStorage.setItem('tameshiRunnerBGM', bgmEnabled ? 'on' : 'off');
  } catch(e) {}
}

// BGM初期化（ページ読み込み時）
function initBGM() {
  loadBGMSetting();
  try {
    // BGM
    bgmAudio = new Audio(BGM_SRC);
    bgmAudio.loop    = true;
    bgmAudio.volume  = 0.25;
    bgmAudio.preload = 'auto';
    bgmAudio.addEventListener('error', () => {
      console.warn(`[BGM] ${BGM_SRC} の読み込みに失敗。ファイルを配置してください。`);
    });

    // コンプリート時のファンファーレ
    completeSEAudio = new Audio(COMPLETE_SE_SRC);
    completeSEAudio.volume  = 0.35;
    completeSEAudio.preload = 'auto';
    completeSEAudio.addEventListener('error', () => {
      console.warn(`[SE] ${COMPLETE_SE_SRC} の読み込みに失敗。ファイルを配置してください。`);
    });

  } catch(e) {
    console.warn('[BGM/SE] 初期化失敗:', e);
  }
}
// BGM再生（ユーザー操作後に呼ぶ）
function bgmPlay() {
  if (!bgmAudio || !bgmEnabled) return;
  bgmAudio.currentTime = 0;
  bgmAudio.play().catch(e => console.warn('[BGM] 再生失敗:', e));
}

// BGM停止
function bgmStop() {
  if (!bgmAudio) return;
  bgmAudio.pause();
  bgmAudio.currentTime = 0;
}

// ================================================================
// 案内ポップアップ制御
// ================================================================
let popupActive = true; // ポップアップ表示中フラグ


(function setupPopup() {
  const overlay    = document.getElementById('popup-overlay');
  const btn        = document.getElementById('popup-start-btn');
  const toggleBtn  = document.getElementById('bgm-toggle-btn');
  if (!overlay || !btn) return;

  // BGMトグルボタンの初期表示を設定
  function updateToggleUI() {
    if (!toggleBtn) return;
    if (bgmEnabled) {
      toggleBtn.textContent = 'ON';
      toggleBtn.classList.remove('off');
    } else {
      toggleBtn.textContent = 'OFF';
      toggleBtn.classList.add('off');
    }
  }
  updateToggleUI();

  // トグルボタンのON/OFF切り替え
  function onToggle(e) {
    e.stopPropagation();
    bgmEnabled = !bgmEnabled;
    saveBGMSetting();
    updateToggleUI();
  }
  toggleBtn.addEventListener('click',    onToggle);
  toggleBtn.addEventListener('touchend', function(e) {
    e.preventDefault(); e.stopPropagation(); onToggle(e);
  }, { passive: false });

  // ポップアップを閉じてゲームを開始する
  function closePopup() {
    overlay.style.display = 'none';
    popupActive = false;
    // GAME STARTのクリック/タップがゲーム側に漏れないよう遅延
    setTimeout(() => { jumpPressed = false; }, 200);
  }

  // GAME STARTボタン
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    closePopup();
  });
  btn.addEventListener('touchend', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closePopup();
  }, { passive: false });

  // リンクのクリックがゲームに伝播しないようにする
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => e.stopPropagation());
    a.addEventListener('touchend', e => e.stopPropagation());
  });

  // オーバーレイ全体のタッチ/クリックをゲームに渡さない
  overlay.addEventListener('click',      e => e.stopPropagation());
  overlay.addEventListener('touchstart', e => e.stopPropagation(), { passive: false });
  overlay.addEventListener('touchend',   e => e.stopPropagation(), { passive: false });
})();

// ----------------------------------------------------------------
// ゲーム入力をポップアップ表示中にブロックするガード
// handleJump の先頭でチェック
// ----------------------------------------------------------------
initClouds();
loadBeautyStars(); // ★状況をlocalStorageから読み込む
initBGM();         // BGM初期化・ON/OFF設定読み込み
loadAssets().then(() => {
  console.log('[アセット] ロード完了 → ゲーム開始');
  requestAnimationFrame(loop);
});

