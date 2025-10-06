/**
 * @file        common.c
 * @author      aSumo
 * @version     1.0
 * @date        2025-08-03
 * @copyright   (c) 2025 aSumo
 * @brief       マイコンによらず共通な関数を定義するファイル
 */

#include "header.h"

/**
 * @fn      void flashLED(uint8_t interval_type, uint8_t times)
 * @param   types   点滅の間隔
 * @param   times   点滅の回数
 * @brief   LEDを点滅させる関数
 */
void flashLED(uint8_t interval_type, uint8_t times) {
  for (uint8_t i = 0; i < times; i++) {
    switch (interval_type) {
    case 1:
      LED = true;
      __delay_ms(LED_SHORT_MS);
      LED = false;
      __delay_ms(LED_SHORT_MS);
    case 2:
      LED = true;
      __delay_ms(LED_LONG_MS);
      LED = false;
      __delay_ms(LED_LONG_MS);
    default:
      break;
    }
  }
}

/**
 * @fn     void initConfig(void)
 * @brief  EEPROMの値を読み書きして初期状態を設定する関数
 */
void initConfig(void) {
  uint16_t flag_i = 0; // 踏まれている時間をカウントする変数

  // EEPROMからuint8_t型をbool型に変換して読み込む（0:false / 1:true）
  initState = (bool)(eepRead(EEPADR_initState));
  momentary = (bool)(eepRead(EEPADR_momentary));
  timing = (bool)(eepRead(EEPADR_timing));

  // 踏みながら電源を入れてモード切り替え
  if (!SW_foot) {
    flashLED(1, 3);

    // Alternate or Momentary
    for (flag_i = 0; flag_i < 300; flag_i++) { // flag_i*10秒間待ってやる
      if (!SW_foot) {
        __delay_ms(10);         // 踏まれている間は待ち続ける
      } else {                  // 離されたら
        momentary = !momentary; // 設定値を更新
        eepWrite(EEPADR_momentary, (uint8_t)momentary);
        break;
      }
    }

    // 電源投入時のエフェクトON or OFF
    if (flag_i > 275) {
      // initStateの設定に入る
      initState = !initState; // 設定値を更新
      eepWrite(EEPADR_initState, (uint8_t)initState);
      flashLED(2, 3);
      while (!SW_foot) {
        ; // 離されるまでキープ
      };
    }
  }
}

/**
 * @fn      void scanModeSw(void)
 * @brief   モードスイッチをスキャンして、適宜モードを切り替える関数
 */
void scanModeSw(void) {
  // トレイル → ノーマル
  if (SW_trail && isTrail) {
    if (!state) { // エフェクトOFFならば（ONのときは状態が共通）
      MUTE_wet = true;  // Wet音をミュート
      MUTE_dry = false; // Dry音をミュート解除
    }
    isTrail = false;
  }

  // ノーマル → トレイル
  else if (!SW_trail && !isTrail) {
    if (!state) { // エフェクトOFFならば（ONのときは状態が共通）
      MUTE_dry = true;  // Dry音をミュート
      MUTE_wet = false; // Wet音をミュート解除
    }
    isTrail = true;

    // 環境によっては最初の切り替えだけポップノイズが発生するので、
    // ここで予め消化しておく
    TURN();
    TURN();
  }
}
