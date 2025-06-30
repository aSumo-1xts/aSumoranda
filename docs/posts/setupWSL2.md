---
layout: doc

title: WSL2を私的にセットアップ
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2025-06-30
permalink: "https://blog.1xtelescope.com/posts/setupWSL2.html"

prev: false
next: false

tags:
  - environment
---

[環境構築](../tags/environment)

# WSL2を私的にセットアップ

## はじめに

自分なりの環境構築というものがようやく固まってきたので、その備忘録です。

## UbuntuまたはDebianをWSL2上に用意

ここは割愛します。

## 先回りして`~/.zshrc`を埋める

::: code-group
<<< @/snippets/.zshrc{shell}
:::

## まとめてインストール

::: code-group
<<< @/snippets/setupWSL2.sh{shell}
:::

## Starshipを設定する

`~/.config/starship.toml`を作成・編集します。

::: code-group
<<< @/snippets/starship.toml{toml}
:::