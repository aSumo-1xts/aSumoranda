---
layout: doc

title: Win11をScoopでセットアップ
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2025-04-28
permalink: "https://blog.1xtelescope.com/posts/setupWin11.html"

prev: false
next: false

tags:
  - environment
---

[環境構築](../tags/environment)

# Win11をScoopでセットアップ

## はじめに

新しいWindowsマシンが来たとき、アプリケーションを一つずつインストールするのは結構大変です。楽をするため、そして管理しやすくするため、現状ではScoopを利用しているのでその備忘録です。

## Powershellをインストール

元から入っているWindows Powershellというやつではなく、OSS版のPowershell（無印）をMIcrosoft Storeからインストールして使います。

https://apps.microsoft.com/detail/9MZ1SNWT0N5D?hl=neutral&gl=JP&ocid=pdpshare

## ひたすらコマンド入力

### 実行ポリシーを変更

Defaultでは`Restricted`になっているようで、そのままでは素のps1ファイルを実行できず次の手順において少し不便です。従って一時的に`Unrestricted`にしておきます。`Remotesigned`ではダメで、証明書が云々など面倒くさそうだったので深追いはしていません。

```shell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

### ps1ファイルを実行

適当なフォルダに`setupWin11.ps1`を置いて実行します。

```shell
.\setupWin11.ps1
```

::: code-group
<<< @/snippets/setupWin11.ps1{shell}
:::

### スタートアップの設定

ターミナル起動時に毎回モジュールを自動で呼び出すため、`$PROFILE`で指定されているファイルに以下を書き込んで保存します。（`C:\Users\[username]\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`が開くはずですが、存在しなければ自分で作成する必要があるかもしれません。）

```shell
Invoke-Expression (&starship init powershell)
Import-Module posh-git
```

### 実行ポリシーを変更その2

元の`default`に戻すと今しがた設定した`profile.ps1`を実行できないので、`Remotesigned`にしておきます。

```shell
Set-ExecutionPolicy Remotesigned -Scope CurrentUser
```

### Starshipを設定する

`~/.config/starship.toml`を作成・編集します。

::: code-group
<<< @/snippets/starship.toml{toml}
:::

### その他

当該のWindowsマシンをカジュアルに利用して良い場合は、追加で以下も実行するかもしれません。

```shell
scoop install discord
scoop install figma
scoop install kicad
```

<br/>

---
