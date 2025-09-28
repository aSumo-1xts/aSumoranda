#include <xc.h>

#define _XTAL_FREQ 4000000  // クロック周波数 4MHz

#pragma config FOSC = INTRCIO  // 内部クロック          使用
#pragma config WDTE = OFF      // Watch-Dogタイマー     不使用
#pragma config PWRTE = ON      // パワーアップタイマー  使用
#pragma config MCLRE = OFF     // リセットピン          不使用
#pragma config BOREN = ON      // Brown-Out検出         使用
#pragma config CP = ON         // プログラム保護        使用
#pragma config CPD = ON        // データ保護            使用

#define LED GP5  // LEDへの出力