---
layout: doc

title: MPLAB VScode Extentionを試す
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2025-05-01
permalink: "https://blog.1xtelescope.com/posts/MPLAB-VScode_intro.html"

prev: false
next: false

tags:
  - environment
  - mplab
  - vscode
  - embedded
---

# MPLAB VScode Extentionを試す

## はじめに

昨年、Microchip社からMPLABのVScode向け拡張機能がリリースされました。
まだ新しいということもあってかネット上にユーザー目線の情報があまり落ちていませんが、
実際に使ってみたところVScodeを好んで使う人
（より正確には、コードエディターとしてのMPLAB X IDEに不満がある人）
にはかなり良いものであるという印象を受けました。
一方でMPLAB X IDEからの完全な脱却は厳しいかもしれません。
その辺りの簡単なレビューとチュートリアルを兼ねて記事に残しておきます。

## 環境

- Windows 11
- VScode 1.99.3
- MPLAB Extention Pack 1.0.0
- MPLAB XC8 v3.0
- MPLAB IPE hoge

### 最小構成

最低限、以下がインストールされていればプログラムのコンパイルから書き込みまで行えます。

- VScode
- MPLAB Extention Pack
- 任意のXCコンパイラ（今回はXC8）
- MPLAB IPE

それから、当然ながら手元にプログラマとマイコンそのものが必要です。
最新のMPLAB X IDEでサポートされているものなら大丈夫かと思われます。
この記事では以下を使用します。

- PICkit Basic
- PIC12F675

::: details PICkit3がサポートされていない件について
最新版のMPLAB X IDEと同様でPICkit3はもうサポート対象外です。悲しい。

私はわざわざIDEのバージョンを落としてPICkit3を使っていた身で、かと言ってPICkit5は高すぎる…と思っていたら2025年になって
[PICkit Basic](https://www.marutsu.co.jp/pc/i/48870304/?srsltid=AfmBOooaTKKqB4YG5x8K9bOEZ0EZQnAcfXHax0IRxatuXqqoOTDb9DZ8)
なる廉価なものが発売されたのでした。
廉価と言ってもそれなりのお値段ですが、今のところは買って良かったかなと思えています。
:::

### インストール

VScodeについては割愛します。余談ですが私は最近Scoopでインストールしなおしました。

MPLAB Extention PackはVScode内のマーケットプレイスで「mplab」と打てば出てきます。
インストールすると付随して同じアイコンの拡張機能（「MPLAB Platform」とか「MPLAB Kconfig」とか）が
10個ぐらいセットでインストールされますが、仕様です。
人によってはアンインストールして良いものもあるのですが、ひとまず放置で良いでしょう。

XCコンパイラは元々インストールされていればそれで良いですし、
インストールされていなくてもプロジェクトを新規作成するときに最新版のダウンロードまで誘導してくれます。

MPLAB IPEはMPLAB X IDEのインストール時に付随してくる書き込み専用ソフトです。
ここにきて肝心なことを書くのですが、Extでは**ビルドまでしか対応しておらず、書き込みはできません**。
そのため、ビルドしたhexファイルをuploadするためにこいつが必要
幸いコマンドがあるのでいちいちこのソフトを開いたりはしないが、必要。
MPLAB X IDEのインストーラを起動すると「MPLAB IPEだけ」インストールする選択肢もあるにはあるので、
よほど容量がひっ迫している人はそうしてください。MPLAB X IDEは13.5GBあって意外と馬鹿にならん。

## プロジェクトの作成

サイドバーにロゴが現れる
「」をクリックしてプロジェクト名と使用するマイコンを順に入力します。
このときデフォルトでは「MPLAB Project」なるディレクトリに生成されますが、マジでどこでも良いみたいです。

プロジェクトの構成がMPLAB X IDEのそれとは異なるのでMPLAB.X Projectとは分けて保存されます。

::: tip MPLAB.X Projectsとの違い
元々MPLAB X IDEで進めていたプロジェクトをインポートしたい場合は、「MPLAB Importer」で云云かんぬん
この必要がない場合は同拡張機能をアンインストール可能
:::

ヘッダーにWarningが出るかも
.vscodeにこれを記述すると解消

あとgit管理するときはreadmeに従って

```txt
_build/
cmake/
out/
```

## ビルド

右上のハンマーのマークをクリックするとコンパイルが実行され、elmファイルが生成
別のディレクトリにhexファイルもあるよ

`F1`または`ctrl+shift+p`でコマンド一覧を開いて「mplab」と入力すると、他にもcleanやFull buildの選択肢が現れると思います。
uploadはありません。

## アップロード（書き込み）

MPLAB IPEを開いてGUIで書き込んでも良いが、幸いにもコマンドが使えるのでVScode上で完結しよう。

まず環境変数→PATHにexeのディレクトリを通しておく

空でコマンド打って確認。再起動が必要かも。

デバイスマネージャでCOMを確認
