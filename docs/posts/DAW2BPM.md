---
layout: doc

emoji: 🎵
title: ArduinoでDAWからBPMを取得
description: ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ

date: 2024-08-12
permalink: "https://blog.1xtelescope.com/posts/DAW2BPM.html"

prev: false
next: false

tags:
  - arduino
  - ccpp
  - midi
---

[MIDI](../tags/midi) | [Arduino](../tags/arduino) | [C/C++](../tags/ccpp.md)

# ArduinoでDAWからBPMを取得

## はじめに

[「ぼくがかんがえたさいきょうの MIDIコントローラー」](./HeartLand)を作る過程で副産物が少しばかり生まれたので、可能な範囲で書き起こします。諸々の前提知識をすっ飛ばしますのでご了承ください。ソースコードはGitHubにも載せています。

<https://github.com/aSumo-1xts/MIDI-HARD/tree/main/Arduino/Clock-and-BPM>

## 環境

- Windows 11
- Arduino IDE 2.3.3
- Ableton Live 12 Suite

## 背景と目的

ArduinoでAbleton LiveからBPMを取得したいです。適当に検索をかけるとArduino側をMIDIクロックジェネレータとして運用する方法が多くヒットしますが、実際の演奏場面を考えるとクロックの主導権はLive側に握らせた方が安心です。

DAWによってはMIDIタイムコードという内部データ的なものを吐き出してくれるんですが、Ableton Liveは[公式のヘルプページ](https://help.ableton.com/hc/ja/articles/209071149-MIDI%E3%81%A7Live%E3%82%92%E5%90%8C%E6%9C%9F%E3%81%99%E3%82%8B "MIDIでLiveを同期する")曰く

> MIDIタイムコード（MTC）の出力：Liveは受信するMIDIタイムコードと同期することができますが、Liveだけでは、MIDI タイムコードを送信することができません。ただし、MIDIタイムコードを出力するMaxのデバイス を利用することができます（Max Runtimeが必要です）。

とのことなので、タイムコードは諦めて

1. Liveから同期クロックを出力
2. Arduinoで受信してBPMに変換

の方向性で行くことにしました。

**もっともPushシリーズは普通にBPMの読み書きが可能なので、タイムコードの機能自体は備わっていて我々に解放されていないだけなんじゃないかと疑っていますが…**

## スケッチ

実は[MIDIUSBライブラリ](https://github.com/arduino-libraries/MIDIUSB.git "MIDIUSB Library for Arduino")の`example`ディレクトリに、本記事と全く同じ目的で書かれた`MIDIUSB_clock.ino`なるスケッチが存在します。これを下敷きにしつつ、[フォーラム](https://forum.arduino.cc/t/missing-midi-in-messages-with-midiusb-library-and-arduino-micro/453585 "Missing Midi In messages with MIDIUSB library and Arduino Micro")なども参考にしました。

### ベーシック ver

コメントアウトを出鱈目に英語で書いてしまったのでアレですが、大体の流れは以下の通りです。

1. DAWからは 1/24拍の間隔でクロックが送られてくる
2. これをカウントしておいて、24クロックになったら1拍として記録
3. BPMに換算（カウントはリセット）

特に`getSerialMIDI`関数の`0xF8`なる定数、こいつが構造体`midiEventPacket_t`の先頭として飛び込んできたら「クロックが来たぞ！」の合図になるようです。

ほとんど同じ仕組みで、MIDIUSBライブラリじゃなく[Control Surfaceライブラリ](https://github.com/tttapa/Control-Surface.git "Control Surface")を使って書くこともできました。Control Surfaceはめちゃくちゃ便利な神ライブラリです。

::: code-group
<<< @/snippets/DAW2BPM_MIDIUSB.ino{Arduino}
<<< @/snippets/DAW2BPM_Control-Surface.ino{Arduino}
:::

Control Surface版は動作の最中にArduino IDEのシリアルモニタを開閉すると何故か停止しますが、実際の使用状況ではそもそもIDEを開かないのでヨシ！としています。とは言えあまり健全ではないので、~~ゆるゆると原因調査中です~~諦めました！

#### 結果

Liveの再生ボタンを押してBPM=120のクロックを読み込ませたところ、とりあえずBPMを教えてくれました（利用するライブラリに関わらず同様です）。しかしながら、BPM=120のはずなのに値がかなりブレブレです。このあと BPM=200とかになるともっと酷いことになりました。

![ベーシックver](../images/240812_01.webp){width=75%}

### 誤差低減 ver

何とかならないかと思い、四捨五入やらローパスフィルタやら色々と試してみましたが結果はあまり芳しくなかったです（上、スクショ撮り忘れ）。ちなみにLiveよりStudio Oneの方がクロック精度は高いようで（下）、なぜなんだ～と思いつつ手を引くことにしました。

![誤差低減ver](../images/240812_02.webp){width=75%}

![誤差低減ver（Studio One）](../images/240812_03.webp){width=75%}

## おわりに

あわよくばArduino側で7セグLEDを使ってBPMを逐一表示～とか妄想してたんですが、こうも値がブレると演奏中には逆効果です。電源周りとかも含めてそれなりに色々試したんですが今のところ効果は無いので、何か改善案をお持ちの方がいたら是非お知らせください。今のままでも単純に LEDを点滅させれば視覚的なメトロノームぐらいにはなるかな…

<br/>

---
