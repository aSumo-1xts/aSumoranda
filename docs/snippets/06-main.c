#include "header.h"

int main(void) {
  ANSEL = 0x00;         // 全てのピンをデジタルI/Oに設定
  ADCON0 = 0x00;        // A/D変換器不使用
  CMCON = 0b00000111;   // コンパレータ不使用
  TRISIO = 0b00001000;  // GP3は元から入力専用ピン、他は出力
  GPIO = 0;             // 全てのピンをLOWに設定

  while (true) {
    LED = true;
    __delay_ms(1000);
    LED = false;
    __delay_ms(1000);
  }

  return 0;
}