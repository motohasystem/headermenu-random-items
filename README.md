MenuItem100
========

![kintone](https://img.shields.io/badge/kintone-js-F0DB4F.svg?style=flat&labelColor=FFBE00)
![typescript](https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat)
![FontAwesome](https://img.shields.io/badge/-FontAwesome-563D7C.svg?logo=bootstrap&style=flat)
![github license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)


## 機能

kintone用のJSカスタマイズとして適用すると、HeaderMenuSpaceにランダムで100個のアイコンを配置します。プラグイン開発のデバッグ用に必要となって作りました。

![デフォルト表示](img/normal-100.png)

いずれかのアイコンをクリックするとHaderMenuSpaceを広げます。

![HeaderMenuSpaceを拡張](img/extend-100.png)

もう一度アイコンをクリックするともとに戻ります。アイコン画像はみんな大好き[fontawesome](https://fontawesome.com/)です。

クリックイベントでは getHeaderMenuSpaceElement() の結果に'auto'のスタイルをあてたりもとに戻したりしています。

```javascript
    const hms = kintone.app.getHeaderMenuSpaceElement()
    hms.style.height = 'auto'
```

## インストール手順

1. <a href="https://raw.githubusercontent.com/motohasystem/headermenu100/main/dist/js/customize.js">costomize.js</a>をダウンロード
2. お使いのkintoneアプリの設定画面からJavaScriptカスタマイズの項目を開く

![kintoneアプリ設定画面](img/js-cutomize-menu.png)

3. ダウンロードしたcustomize.jsを『PC用のJavaScriptファイル』としてアップロード

![JavaScript / CSSでカスタマイズ](img/for-upload.png)

1. **『アプリを更新』** ボタンを押して更新

インストールは以上です。


## License

MenuItem100はMITライセンスの元で公開しています。
This plugin is licensed under MIT license.

Copyright (c) 2022 Daisuke Motohashi
https://opensource.org/licenses/MIT

