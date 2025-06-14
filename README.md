# フラッシュ暗算ゲーム - ツクリテイデア

## 📝 プロジェクト概要
そろばん・暗算のフラッシュ練習ができるWebアプリケーションです。
級位・段位別の設定で、本格的な暗算練習ができます。

## 🚀 デプロイ情報
- **本番URL**: https://flash-event.vercel.app/
- **認定証**: https://flash-event.vercel.app/certificate.html
- **開発元**: [ツクリテイデア](https://tsukuriteidea.com/)

## 📁 ファイル構成

### メインファイル（使用中）
- `index.html` - メインのゲーム画面（モダンUI版）
- `script.js` - ゲームロジック（ES6クラス、5問制テスト）
- `style.css` - スタイル（レスポンシブデザイン）
- `certificate.html` - QRコード認定証ページ

### 旧版ファイル（参考用）
- `wp-flash.html` - WordPress版UI
- `wp-flash.js` - jQuery版ロジック 
- `wp-flash.css` - 旧スタイル

### 設定ファイル
- `package.json` - プロジェクト設定
- `vercel.json` - Vercel設定
- `.gitignore` - Git除外設定

## 🎮 機能

### ✨ 新機能（script.js版）
- **5問制テスト**: 3問正解で合格
- **QRコード認定証**: 合格時に生成
- **進捗表示**: リアルタイム正解数表示
- **やめる機能**: ゲーム中断可能
- **待ち受け画面**: 美しいウェルカム画面

### 📊 レベル設定
- **20級〜1級**: 級位（1桁〜2桁）
- **準初段〜十段**: 段位（3桁）
- **マニュアル設定**: カスタム設定可能

## 🛠 開発・運用

### ローカル開発
```bash
npm install
npm run dev
```

### デプロイ
Vercelに自動デプロイ設定済み

## 🌟 今後の予定
- [ ] 成績記録機能
- [ ] 問題履歴表示
- [ ] 音効果追加
- [ ] 多言語対応

---
**Powered by ツクリテイデア**  
[https://tsukuriteidea.com/](https://tsukuriteidea.com/)
