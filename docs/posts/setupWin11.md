---
layout: doc

title: Windows11をscoopでセットアップ
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2025-04-28
permalink: "https://blog.1xtelescope.com/posts/environment.html"

prev: false
next: false

tags:
  - environment
---

[環境構築](../tags/environment)

# Windows11をscoopでセットアップ

## はじめに

個人的な備忘録です。
新しいWindowsマシンが手元に来たとき自分が何をするのか、書き残しておきます。

## Powershellをインストール

元から入っているWindows Powershellというやつではなく、
OSS版のPowershell（無印）をMIcrosoft Storeからインストールして使います。

https://apps.microsoft.com/detail/9MZ1SNWT0N5D?hl=neutral&gl=JP&ocid=pdpshare

## ひたすらコマンド入力

### 実行ポリシーを変更

Defaultでは`Restricted`になっているようで、そのままでは素のps1ファイルを実行できません。
一時的に`Unrestricted`にしておきます。
`Remotesigned`ではダメで、証明書が云々など面倒くさそうだったので深追いはしていません。

```shell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

### ps1ファイルを実行

スクリプトにまとめて一括に実行したいと思います。

```shell
.\setupWin11.ps1
```

### スタートアップの設定

ターミナル起動時に毎回モジュールを自動で呼び出すため、
`code $PROFILE`を実行して開いたファイルに以下を書き込んで保存します。
おそらくは`C:\Users\username\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`が開きます。
Linuxにおけるrcファイルのようなものと解釈しています。

```shell
Import-Module PSReadLine
Import-Module Terminal-Icons
Import-Module posh-git
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/capr4n.omp.json" | Invoke-Expression;
```

### 実行ポリシーを変更その2

元の`default`に戻すと上記で設定した`profile.ps1`を実行できないので、`Remotesigned`にしておきます。

```shell
# 実行ポリシーをデフォルトに戻す
Set-ExecutionPolicy Remotesigned -Scope CurrentUser
```

### その他

当該のWindowsマシンをカジュアルに利用して良い場合は、追加で以下も実行するかもしれません。

```shell
scoop install discord
scoop install doxygen
scoop install graphviz
```