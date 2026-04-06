# habit-pixel

ピクセルアート習慣トラッカー - 毎日の習慣が未来のアートに

## 概要

**habit-pixel** は、習慣の継続をピクセルアートの完成で報酬するビジュアル習慣トラッカーアプリです。

毎日の記録が16×16のピクセルキャンバスを埋めていき、365日後には1枚のアート作品が完成するというゲーミフィケーション体験を提供します。

## 機能

### MVP機能
- **習慣登録**: 最大3つまで。アイコン選択、目標頻度設定
- **ワンタップ記録**: 当日の習慣達成を簡単記録
- **ピクセルアート進捗**: 継続日数で16×16ピクセルが埋まっていく
- **継続ストリーク表示**: 現在の連続記録とベスト記録
- **SNS共有カード**: 現在のアート進捗を画像でシェア

### アイコン選択肢
💪 筋トレ | 📚 読書 | 💻 プログラミング | ✍️ 執筆  
🏃 ランニング | 🧘 瞑想 | 🎵 音楽 | 🎨 芸術  
🌱 植物 | 💊 サプリメント | 🚰 水分補給 | 🌙 早起き

### 目標頻度
- 毎日
- 週3回
- 週5回

## 技術スタック

- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **データ永続化**: LocalStorage
- **画像生成**: html2canvas
- **PWA**: Service Worker, Web App Manifest

## インストール

### ローカル実行
```bash
# 任意のHTTPサーバーで起動
python -m http.server 8000
# または
npx serve .
```

ブラウザで `http://localhost:8000` を開く

### PWAインストール
1. Chrome/Safariでアプリを開く
2. アドレスバーの「+」アイコン（または共有メニュー）から「ホーム画面に追加」を選択
3. スタンドアロンアプリとして使用可能

## デプロイ

### GitHub Pages
1. リポジトリを作成
2. このフォルダの内容をプッシュ
3. Settings > Pages でmainブランチを選択
4. デプロイURLが生成される

### Vercel
```bash
npm i -g vercel
vercel
```

## データ形式

### LocalStorage構造

```javascript
// 習慣データ
habit-pixel-habits: [
  {
    id: timestamp,
    name: "習慣名",
    icon: "💪",
    frequency: "daily",
    createdAt: "2026-03-20T09:00:00Z"
  }
]

// 記録データ
habit-pixel-logs: {
  "2026-03-20": [habitId1, habitId2],
  "2026-03-21": [habitId1]
}

// ベスト記録
habit-pixel-best: 42
```

## ファイル構成

```
habit-pixel/
├── index.html      # メインページ
├── style.css       # スタイルシート
├── script.js       # メインスクリプト
├── manifest.json   # PWAマニフェスト
├── sw.js           # サービスワーカー
└── README.md       # このファイル
```

## カスタマイズ

### ピクセルカラー
`script.js` の `pixelColors` 配列を編集：

```javascript
const pixelColors = [
    '#FF6B6B', '#FFE66D', '#4ECDC4', // ...
];
```

### 最大習慣数
`script.js` の `saveHabit` 関数内の `3` を変更

## マネタイズ

現在の設定：
- **投げ銭**: Buy Me a Coffee / Ko-fi リンク
-フッターに表示 (`btn-buymeacoffee`)

## 今後の機能（アイデア）

- [ ] 追加アートテーマの有料展開
- [ ] 習慣のアーカイブ機能
- [ ] 週次/月次レポート
- [ ] 習慣ごとの詳細統計
- [ ] 達成バッジシステム

## ライセンス

MIT License

---

Made with 💎 by Forge (AI Company)
