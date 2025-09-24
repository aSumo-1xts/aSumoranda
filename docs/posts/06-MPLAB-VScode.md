---
layout: doc

emoji: 🔠
title: MPLAB VScode Extention入門
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2029-09-23
permalink: "https://blog.1xtelescope.com/posts/06-MPLAB-VScode.html"

prev: false
next: false

tags:
  - environment
  - pic
  - ccpp
---

[環境構築](../tags/environment) | [PIC](../tags/pic) | [C/C++](../tags/ccpp)

# MPLAB VScode Extention入門

## はじめに

今年に入って[MPLABの公式なVScode拡張機能](https://www.microchip.com/en-us/tools-resources/develop/mplab-extensions-vs-code)がリリースされ、触ってみたところかなり良いと感じたのでチュートリアル的な何かを残すことにしました。人によって評価が分かれる可能性があるので、初めに「こんな人におすすめ/おすすめではない」を示しておきます。

### こんな人におすすめ

- これからPICマイコンを始める
- VScodeを好んでいる・使い慣れている
- エディタとしてのMPLAB X IDEに不満を持っている

### おすすめではない

- MPLAB X IDEのGUI機能（MCCなど）を使い倒している

## 環境

- Windows 11

## 各種インストール

### MPLAB X

既にPICKIT4 or 5をお持ちのブルジョワの皆様は、普通に最新版をインストールしてください。そうでない方は、PICKIT3（安い！あとで登場します）に対応している最後のバージョンであるv6.20のインストールをおすすめします。[ここ](https://www.microchip.com/en-us/tools-resources/archives/mplab-ecosystem)から過去のバージョンのインストーラをダウンロードできます。

なお今回の主役は拡張機能とコンパイラなのでIDE（Integrated Development Environment）は不要で、コンパイルされたhexファイルをチップに書き込むために最低限IPE（Integrated Programming Environment）が必要です。これら二つのインストーラは共通ですが、実行後のセットアップ画面で「IDEをインストールしない」という選択をすることができます。もっともPCのストレージに余裕があれば、何も考えずに「Next」を連打しても構いません。

<ImageGroup
  :sources="[
    '/images/06-01.webp',
  ]"
  type="big"
  caption="今回の記事で最低限必要なものだけにチェックを入れた状態"
/>

### コンパイラ

今回の記事では8ビットマイコンを扱うので、XC8をインストールします。[ここ](https://www.microchip.com/en-us/tools-resources/develop/mplab-xc-compilers/xc8#downloads)から最新版のインストーラをダウンロードします。

### VScode

本体のインストール方法は流石に割愛します。拡張機能を探す検索バーで「MPLAB」と入力してみるとそれっぽいものがいくつもヒットしますが、とりあえず以下が入っていれば動きます。

- MPLAB
- Clangd for MPLAB
- CMake Runner for MPLAB
- Platform for MPLAB
- Services for MPLAB
- Toolchain Support for MPLAB
- User Interfaces for MPLAB

試していないので、これが究極な最小構成かどうかは分かりません。Microchip社はひとまとまりの機能ごとに拡張機能を分けてリリースする方針らしいですが、なかなか一長一短であると感じます。

元々MPLABX IDEを使っていてVScode環境に移行したい人には、

- Project Importer for MPLAB

なんてのもあります。

## プロジェクトの作成

サイドバーのMPLABアイコンをクリックして、「新しいプロジェクト」を始めます。今回のプロジェクト名は「Lchika_12F675」としました。12F675とはすなわちマイコンにPIC12F675を使うよということですが、これは筆者がPIC12F675を大量に在庫しているからであり、新しく手を出す人はもっと新しくて安いものを選んでも良いと思います。

あとは「デフォルトの場所」「マイコンの型番（ここではPIC12F675）」「コンパイラ（XC8が出てくるはず）」を順に選択すれば、`Users/MPLABProjects`の中に`Lchika_12F675`なるプロジェクト用ディレクトリが作成されます。

<ImageGroup
  :sources="[
    '/images/06-02.webp',
    '/images/06-03.webp',
  ]"
  type="double"
  caption="← 黄色く囲ったバナーが「新しいプロジェクト」 | プロジェクト用ディレクトリの内部 →"
/>

::: tip

C/C++を触ったことがある方の多くが、Microsoft製の「C/C++」なる拡張機能をインストールしていると思います。この拡張機能のIntelliSense（VScode上でのコード補完機能）がClangd for MPLABと競合する場合、ポップアップに従って「（C/C++の）インテリセンスを無効にする」として再読み込みします。するとこのプロジェクト内ではClangd for MPLABが優先され、`.vscode/setting.json`に`"C_Cpp.intelliSenseEngine": "disabled"`の一行が追加されます。

<ImageGroup
  :sources="[
    '/images/06-04.webp',
  ]"
  type="big"
/>

:::

### サンプルコード

プロジェクト名の通り、LEDをチカチカさせます。

TODO: コードの追加

## コンパイル

VScode上のコマンドパレット（`F1`キー）から「MPLAB」と入力すると「CMAKE: ビルドします」という候補が出てくるので、これを実行します。すると`.out/Lchica`ディレクトリに`default.hex`が生成されるはずです。

<ImageGroup
  :sources="[
    '/images/06-05.webp',
  ]"
  type="big"
/>

TODO: PICKIT3とマイコンの配線図

## 書き込み

今しがた生成された`default.hex`をマイコンに書き込みます。

### PICKIT3

庶民の筆者は書き込みにはPICKIT3の~~パチモン~~互換品を使っています。今のところAliExpressやAmazonにて3000円前後で入手できて、最もリーズナブルであると思われます。

（少なくともPIC12F675の場合）書き込みの際にはマイコンに+5Vを与えてやる必要があり、これは本来であればPICKIT3とは別で電源（乾電池とか）を用意してやる必要があるのですが、裏ワザとしてPICKIT3本体に供給されている+5Vをそのまま拝借する民間療法があります。なんちゃってバスパワー化です。ここでは敢えて詳しく書きませんが、PICKIT3の基板上で適宜ジャンパを1本追加すれば良いです。

<ImageGroup
  :sources="[
    '/images/06-06.webp',
  ]"
  type="big"
  caption="筆者は剥き身で使っています。アダプターを自作してかなり便利になりました。"
/>

### CLIツール

MPLAB X IPEを立ち上げてGUIで書き込んでも良いのですが、このIPEにはコマンドラインで使える書き込み用のexeファイルが付属しています。`C:\Program Files\Microchip\MPLABX\v6.20\mplab_platform\mplab_ipe`に`ipecmd.exe`なるexeファイルがあることを確認してください。これを下記のコマンドでVScode上のターミナルから呼び出せば、VScodeに張り付いたまま書き込み作業まで完結できます。

::: code-group
<<< @/snippets/06-writehex.ps1{powershell} [writehex.ps1]
:::

長いので筆者はps1ファイルとして実行しています。見ての通り、マイコンやライターに応じて`-P12F675`や`-TPPK3`のオプションを変更すれば良いです。ファイル内で改行すると、正しいはずなのに何故か怒られてしまうのが目下の不思議です。

さて、上手くいけば次のようにして書き込みが完了します。failedになった場合は、一度PICKIT3を繋ぎなおすと治ることがあります。

```powershell
PS C:\Users\asumo\MPLABProjects\Lchica_PIC12F675> .\writehex.ps1
DFP Version Used : PIC10-12Fxxx_DFP,1.8.184,Microchip
*****************************************************
Connecting to MPLAB PICkit 3...
Currently loaded firmware on PICkit 3
Firmware Suite Version.....01.56.09
Firmware type..............Midrange
Target voltage detected
Target device PIC12F675 found.
Device Revision ID = 10
Device Erased...
Programming...
The following memory area(s) will be programmed:
program memory: start address = 0x0, end address = 0x3ff
Programming/Verify complete
PICKIT3 Program Report
2025-09-23, 06:04:51
Device Type:PIC12F675
Program Succeeded.
Operation Succeeded
```

## おわりに

無事にLEDはチカチカしたでしょうか。この記事が何かしらのお役に立てば幸いです。
