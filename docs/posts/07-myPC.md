---
layout: doc

emoji: 🖥️
title: マイPC環境
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2025-10-06
permalink: "https://blog.1xtelescope.com/posts/07-myPC.html"

prev: false
next: false

tags:
  - environment
---

[環境構築](../tags/environment)

# マイPC環境

## はじめに

自宅のデスクトップPCをリニューアルしたので、これを機に備忘録として基本的なセットアップをまとめておくことにします。随時更新する予定です。

TODO: 画像

## ハードウェア

| パーツ | 製品名 | 備考 |
| --- | --- | --- |
| ケース | Zalman P30 V2 White | 5.25インチベイがあれば完璧だった |
| 電源 | 玄人志向 hoge 850W | |
| マザーボード | MSI hoge | |
| CPU | Intel Core i7-12700F | |
| メモリ | 96GB（48GB×2） DDR5 | 力こそパワー |
| ストレージ | C: Samsung PM9A1 1TB <br/> D: Samsung PM9A1 1TB <br/> Linux: Samsung 980 PRO 1TB | |
| CPUクーラー | DeepCool AK500 ZERO DARK | |
| ケースファン | SYS_FAN1: hoge <br/> SYS_FAN2: <br/> SYS_FAN3: <br/> SYS_FAN4: | 天面 <br/> 背面 <br/> 底面 <br/> 側面 |
| アクリルスタンド | 『シメジシミュレーション』<br/> 庭師 | 健気で好き |

## Windows 11

今回のような大きめの機会にはクリーンインストールしたいので、wingetでインストールできるアプリは[UniGetUI](https://github.com/marticliment/UniGetUI.git)で管理して、そうでないアプリはローカルでちまちまインストールします。かつてほどDTMをやらなくなり、ライセンス移行を要するものが少なくなったので何とかなっています。

::: details winget一括実行スクリプト

::: code-group
<<< @/snippets/2025/07-myWinget.ps1{powershell} [myWinget.ps1]
:::

クリーンインストールの際には[tiny11builder](https://github.com/ntdevlabs/tiny11builder.git)で不要なデフォルトアプリを悉く削除しておきました。Edgeが消えてちょっと感動！

## Linux - Debian 13

これまでWSL2を開いている時間がかなり長かったので、思い切ってデュアルブートしました。

KDE Plasma

### zsh

TODO: zsh各種設定

### ツール

.zshrc

#### alias

スニペット

## OS間で共通の設定

### Starship

aa

## おわりに

あ
