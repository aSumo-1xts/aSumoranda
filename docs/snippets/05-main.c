/**
 * @file        main.c
 * @author      aSumo
 * @version     1.0
 * @date        2025-08-03
 * @copyright   (c) 2025 aSumo
 * @brief       FX96のトレイルバイパス用プログラム
 * @details     PIC12F6XX以外を使う場合はPIC12F6XX.cを適宜書き換えること
 */

#include "header.h"

/**
 * @fn      void main(void)
 * @brief   サボり上司
 */
int main(void) {
  disAnalog();         // アナログ機能を備えている場合は無効化
  CMCON = 0b00000111;  // コンパレータ不使用
  TRISIO = 0b00011000; // GP3とGP4が入力、他は出力
  GPIO = 0;            // 全てのピンをLOWに設定してから
  MUTE_wet = true;     // エフェクトOFFなのでWet音をミュート

  INTCON |= 0b10001000; // GIE=1, GPIE=1 (GPIO割り込み有効化）
  IOC3 = 1;             // FootSwのピン変化割り込みを有効化
  di();                 // とは言ったものの、まだ割り込み禁止

  initConfig(); // 電源投入時の設定を行う
  scanModeSw(); // 一旦モードスイッチに合わせてから

  if (initState) { // 初期状態を合わせる
    TURN();
  }

  ei(); // ここでようやく割り込みを解禁

  while (true) {
    scanModeSw(); // モードスイッチを見張りながらフットスイッチの割り込み待ち
  }

  return 0;
}