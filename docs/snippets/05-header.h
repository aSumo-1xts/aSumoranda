#include <stdbool.h>
#include <stdint.h>
#include <xc.h>

#define _XTAL_FREQ 4000000 //!< クロック周波数 4MHz

#pragma config FOSC = INTRCIO // 内部クロック          使用
#pragma config WDTE = OFF     // Watch-Dogタイマー     不使用
#pragma config PWRTE = ON     // パワーアップタイマー  使用
#pragma config MCLRE = OFF    // リセットピン          不使用
#pragma config BOREN = ON     // Brown-Out検出         使用
#pragma config CP = ON        // プログラム保護        使用
#pragma config CPD = ON       // データ保護            使用

// ピンアウト
#define LED GP0      //!< LEDへの出力
#define MUTE_dry GP1 //!< Dry音ミュート用のフォトカプラへの出力
#define MUTE_wet GP2 //!< Wet音ミュート用のトランジスタへの出力
#define SW_foot GP3  //!< フットスイッチからの入力
#define SW_trail GP4 //!< トレイルスイッチからの入力
#define ENABLE_mix GP5 //!< Mixノブ用のFET用のリレーへの出力

// 状態変数など
bool isTrail = false;   //!< バイパスモード: トレイル / ノーマル
bool state = false;     //!< エフェクト: ON / OFF
bool initState = false; //!< ペダルの初期状態
bool momentary = false; //!< モーメンタリ動作の是非
bool timing = false;    //!< オルタネイト動作時、いつ反転するか

/**
 * エフェクトON or OFFの切り替えマクロ
 * 割り込み中に同じ関数を複数回呼ぶと良くないらしいのでマクロ化している
 */
#define TURN()                                                                 \
  do {                                                                         \
    ENABLE_mix = !ENABLE_mix;                                                  \
    if (isTrail) {                                                             \
      MUTE_dry = !MUTE_dry;                                                    \
    } else {                                                                   \
      MUTE_wet = !MUTE_wet;                                                    \
    }                                                                          \
    LED = !LED;                                                                \
    state = !state;                                                            \
  } while (false)

// その他
#define EEPADR_initState 0x00 //!< EEPROM内のアドレスその1
#define EEPADR_momentary 0x02 //!< EEPROM内のアドレスその2
#define EEPADR_timing 0x04    //!< EEPROM内のアドレスその3
#define LED_SHORT_MS 50       //!< LED用のインターバル
#define LED_LONG_MS 250       //!< LED用のインターバル

// 関数のプロトタイプ宣言
uint8_t eepRead(uint8_t adress);
void eepWrite(uint8_t adress, uint8_t myData);
void flashLED(uint8_t interval, uint8_t times);
void disAnalog(void);
void initConfig(void);
void scanModeSw(void);