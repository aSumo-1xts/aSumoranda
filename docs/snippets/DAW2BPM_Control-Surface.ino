#include <Control_Surface.h>
USBMIDI_Interface midi_usb;

uint16_t BPM = 0;        //!< global BPM
uint8_t ppqn = 0;        //!< 24 Pulses Per Quarter Note
uint32_t startTime = 0;  //!< for Timer
bool realTimeMessageCallback(RealTimeMessage rt) {
  float preBPM = 0;  // temporary BPM as a result of a single calculation

  if (ppqn == 0) {         // the first Clock
    startTime = micros();  // start Timer
  }
  ppqn++;  // count up Clock

  if (ppqn > 24) {  // 24 Clocks = 1 bar
    preBPM =
        6.0e+07 / float(micros() - startTime);  // stop Timer, calculate BPM
    if (20 <= preBPM && preBPM <= 999) {        // adopt if reasonable
      BPM = round(preBPM);
    }
    Serial.println(BPM);  // or just "Serial.println(preBPM)"
    ppqn = 0;             // reset Clock
  }

  return true;
}

//! @brief setup function
void setup() {
  Control_Surface.begin();
  Control_Surface.setMIDIInputCallbacks(nullptr, nullptr, nullptr,
                                        realTimeMessageCallback);
}

//! @brief loop function
void loop() { Control_Surface.loop(); }