# サイト編集ガイド (Editing Guide)

このガイドは、慶應義塾體育會ゴルフ部 公式サイト（[keiogolf.com](https://keiogolf.com)）の本文・部員名簿・スケジュール・新歓情報などを **コーディングなしで** 更新するための手順書です。

---

## 1. 編集の基本 (Basics)

サイトに表示されるテキスト・リンク・部員名簿・スケジュールはすべて、リポジトリの **`content/` フォルダ** の中にあるJSONファイルにまとめられています。

| ファイル | 編集できる内容 |
| --- | --- |
| `content/content.json` | サイト名、ナビゲーション、ホーム/部について/お問い合わせの本文、SNSリンク、フッター |
| `content/prospective.json` | 「入部希望の方へ」ページ全体（年度、日程、LINE情報、入部までの流れ、など） |
| `content/members.json` | 主将・副将・主務、部員一覧（学年・性別） |
| `content/schedule.json` | 年間試合・行事スケジュール |

**コードファイル（`src/` 配下）には触らないでください。** 普段の更新はすべて `content/` の中で完結します。

ファイルを更新して `main` ブランチにコミットすると、GitHub Actions が自動的に検証 → ビルド → デプロイを実行し、おおよそ **2〜3分後** にサイトに反映されます。

---

## 2. どのファイルが何を変える (Which file controls what)

| 変えたいもの | 編集するファイル | 変える項目 (key) |
| --- | --- | --- |
| ヘッダー上部の部名 | `content.json` | `siteTitle` |
| メニュー（ホーム／部について…）の表示名 | `content.json` | `nav.*` |
| ホーム画面のヒーロー文字 | `content.json` | `home.heroTitle`, `home.heroSubtitle` |
| ホーム画面の紹介文 | `content.json` | `home.description` |
| 「部について」ページの理念本文 | `content.json` | `about.philosophy` |
| お問い合わせの説明文 | `content.json` | `contact.description` |
| Instagram / X / Facebook のリンクや表示名 | `content.json` | `contact.socialLinks[].url`, `.handle`, `.label` |
| フッターのコピーライト（年度更新など） | `content.json` | `footer.copyright` |
| 新歓ページのタイトル（年度を含む） | `prospective.json` | `pageTitle` |
| 入部説明会の日時・形式 | `prospective.json` | `orientationSession.*` |
| LINE公式アカウントID・送信期限 | `prospective.json` | `line.*` |
| LINE で送信してもらう項目 | `prospective.json` | `requiredFields` |
| 入部までの流れ（タイムライン） | `prospective.json` | `timeline` |
| 主将・副将・主務 | `members.json` | `captains.*` |
| 部員の追加・削除・学年変更 | `members.json` | `members[]` |
| 年間試合スケジュール | `schedule.json` | `schedule[].events` |

---

## 3. GitHubで編集する手順 (Editing on GitHub)

最も簡単な方法は **github.com 上の編集機能** を使うことです。

1. **ブラウザで [github.com/takesta/takesta.github.io](https://github.com/takesta/takesta.github.io) を開く**
2. 編集したいファイル（例：`content/prospective.json`）をクリック
3. 右上の **鉛筆アイコン (Edit this file)** をクリック
4. 値を編集する（**ダブルクオート `"` の中だけを変える** のがポイント。下記「よくあるミス」を参照）
5. 画面下の **Commit changes...** ボタンをクリック
6. 「Commit message」に簡単な説明（例：「新歓説明会の日付を更新」）を入れて、**Commit changes** をクリック
7. リポジトリの **Actions タブ** を開き、最新の実行が緑のチェック ✅ になるのを待つ（通常2〜3分）
8. 緑になったら [keiogolf.com](https://keiogolf.com) を再読み込みし、変更が反映されていることを確認

**もし赤い × が出たら** → 「公開前に検証される」セクションを参照。慌てずに、ファイルを開き直して修正コミットしてください。サイトはエラーが出ている間、**前のままで保たれます**（壊れたバージョンが公開されることはありません）。

---

## 4. github.dev で編集する (Better editing with `.`)

JSON ファイルを少しでも安全に編集したい場合は、**github.dev** を使うのが便利です。

1. ブラウザで github.com のリポジトリページを開いた状態で、キーボードの **`.` (ピリオド)** キーを押す
2. ブラウザ上で VS Code が開く
3. `content/` フォルダを開いて、編集したいファイルをクリック
4. **赤い波線が出たら構文エラー** のサイン。マウスを乗せると説明が表示される
5. **入力中に自動補完が出る**（スキーマがフィールド名をガイドしてくれる）
6. 編集が終わったら、左側の **Source Control** アイコン（枝のマーク）でコミットメッセージを入力し、✓ ボタンでコミット
7. その後の流れは「GitHubで編集する手順」の手順 7〜8 と同じ

---

## 5. よくあるミス (Common mistakes)

JSONはとても厳密な書式です。以下のルールを守ってください。

### ❌ ダブルクオートを忘れる
```jsonc
// 間違い
"date": 2026年4月4日,

// 正しい
"date": "2026年4月4日"
```

### ❌ 末尾にカンマを残す（trailing comma）
```jsonc
// 間違い（最後の項目の後ろにカンマがある）
"requiredFields": [
  "学部",
  "学年",
]

// 正しい
"requiredFields": [
  "学部",
  "学年"
]
```

### ❌ 全角クオート（"" "" など）を使う
日本語入力モードのまま入力すると、自動的に全角の `"` が入ることがあります。**半角の `"` のみ** が正しいJSONです。

```jsonc
// 間違い（全角ダブルクオート）
"name": "山田 太郎"

// 正しい（半角ダブルクオート）
"name": "山田 太郎"
```

### ❌ コメントを書く
JSONには `//` や `/* */` のようなコメントは書けません。説明を残したい場合は、コミットメッセージに書いてください。

### ❌ ファイル先頭の `$schema` を消してしまう
各JSONファイルの最初の行にある `"$schema": "./schemas/..."` は、**自動補完とエラーチェックのための重要な行** です。消さないでください。

---

## 6. 公開前に検証される (CI safety net)

`main` ブランチにコミットされると、GitHub Actions が以下を順に実行します。

1. **Validate content JSON** — JSONの構文と、必須フィールドの有無をチェック
2. **Build** — サイトをビルド
3. **Deploy** — GitHub Pages に公開

もし **1 か 2 でエラーになると、サイトは更新されません**（壊れたサイトが公開されることはありません）。エラー内容は Actions タブのログに表示されます。例：

```
❌ JSON 構文エラー: content/prospective.json
   Unexpected token } in JSON at position 412
   → GitHub の編集画面でファイルを開き、エラー箇所のクオート（"）やカンマ（,）を確認してください。
```

落ち着いてファイルを開き直し、ログに書かれている箇所を直して再度コミットしてください。何度でもやり直せます。

---

## 7. ローカルで確認する (上級者向け / Optional)

リポジトリをクローンして、コミット前にローカルでチェックすることもできます。

```bash
npm install
npm run validate   # JSON の構文・スキーマをチェック
npm run dev        # http://localhost:5173 でプレビュー
```

ただし、上記の手順なしでも GitHub の編集機能 + Actions の検証で十分安全に運用できます。

---

## 8. サイトの見た目のきまり (Design system)

このサイトの見た目は **[デジタル庁デザインシステム（DADS）の基本デザイン](https://design.digital.go.jp/dads/foundations/)** に沿って作られています。色・文字サイズ・余白・角丸・影といった値は、デジタル庁が公開している公式のデザイントークン（`@digital-go-jp/design-tokens`）と同じものを `src/styles/tokens.css` にまとめています。

覚えておくとよいのは次の3点です。

- **色や文字サイズを直接書き足さない。** 新しく手を加えるときは `tokens.css` に定義された変数（`var(--color-key-900)` など）を使います。バラバラの色が混ざるのを防ぐためです。
- **キーカラーは慶應ネイビー `#003366`。** DADSはサービスごとのブランド色を差し込む仕組みを持っており、本サイトではその枠に慶應ネイビーを割り当てています（`--color-key-900`）。
- **アクセシビリティの決まりを崩さない。** 文字と背景のコントラスト、キーボード操作時の黄色いフォーカス表示、タップ領域44px以上などはDADSの要件です。

なお、通常のコンテンツ更新（セクション2の表にあるもの）は `content/` のJSONだけで完結するため、ここを触る必要はありません。

---

## 9. 困ったとき

- **どのファイルを編集すればよいか分からない** → セクション 2 の表を確認
- **緑のチェックが付かない** → Actions タブを開き、エラーログを読む。よくある原因はセクション 5 を参照
- **構文がよく分からない** → github.dev (`.` キー) を使うと自動補完がきいて圧倒的に楽
- **どうしても直らない** → コミットを取り消す（GitHubの履歴から1つ前の状態に戻せます）か、開発担当の先輩に相談
