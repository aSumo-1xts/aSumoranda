/**
 * @file        PIC12F675.c
 * @author      aSumo
 * @version     1.0
 * @date        2025-08-03
 * @copyright   (c) 2025 aSumo
 * @brief       PIC12F675に特有の関数を定義するファイル
 */

#include "header.h"

//! EEPROM（0x00~0x07）の初期値を定義するマクロ
__EEPROM_DATA(0, 0, 0, 0, 0, 0, 0, 0);

/**
 * @fn      uint8_t eepRead(uint8_t adress)
 * @brief   EEPROMからデータを読み込む関数
 * @param   adress  データを読み込む番地
 * @return  読み込んだデータ
 */
uint8_t eepRead(uint8_t adress) {
  EEADR = adress; // アドレスを指定
  RD = 1;         // 読み込みを開始
  while (RD) {
    ;
  }; // RD==0まで待つ
  return EEDATA; // 読み込んだ値を返却
}

/**
 * @fn      uint8_t eepWrite(uint8_t adress, uint8_t myData)
 * @brief   EEPROMにデータを書き込む関数
 * @param   adress  データの書き込み番地
 * @param   myData  書き込むデータ（少なくとも数値型であること！）
 */
void eepWrite(uint8_t adress, uint8_t myData) {
  WREN = 1;        // 書き込みを許可
  EEADR = adress;  // アドレスを指定
  EEDATA = myData; // 書き込みたいデータ
  EECON2 = 0x55;   // 暗号その1
  EECON2 = 0xAA;   // 暗号その2
  WR = 1;          // 書き込みをセット
  while (WR) {     // WR==0まで待つ
    ;
  };
  WREN = 0; // 書き込みを禁止
}

/**
 * @fn      void disAnalog(void)
 * @brief   予約語の宣言の有無からチップのアナログ機能の有無を判別する関数
 * @details 少なくともPIC12F629とPIC12F675の両方で使えるようにしている
 */
void disAnalog(void) {
#ifdef ANSEL
  ANSEL = 0x00;
#endif
#ifdef ADCON0
  ADCON0 = 0x00;
#endif
};

/**
 * @fn      void __interrupt isr(void)
 * @brief   bypass_interrupt()の無限whileループ中に呼び出される
 * @details 割り込み処理の中で関数を呼ぶとあんまり良くないらしい
 */
void __interrupt() isr(void) {
  if (GPIF) {      // GPIO変化割り込みフラグが立っているか？
    __delay_ms(5); // チャタリング対策

    if (!SW_foot) {    // 踏まれているか？
      if (momentary) { // モーメンタリ動作ならば
        TURN();        // ひっくり返す
        while (!SW_foot) {
          ; // 離されるまでキープ
        }
        TURN(); // 離されたらもう一度ひっくり返す
      } else {  // オルタネイト動作ならば
        if (timing) { // タイミングの指定によっては離されるまで待つ
          while (!SW_foot) {
            ; // 離されるまでキープ
          }
        }
        TURN(); // ひっくり返す
      }
    }

    GPIF = 0; // 割り込みフラグをクリア
  }
}
