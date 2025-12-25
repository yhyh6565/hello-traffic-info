export const RADIO_CONSTANTS = {
  FREQUENCY: "FM 88.1 MHz",
  GLITCH_CODE: "식별코드 Qterw-E-63",
  TYPING_SPEED: 30, // ms per character
  MIN_AUDIO_DURATION: 15000, // ms
  CHAR_DURATION: 80, // ms per character
  PROGRESS_UPDATE_INTERVAL: 100, // ms
} as const;

export const GLITCH_TIMING = {
  START_DELAY_MIN: 3000,
  START_DELAY_MAX: 6000,
  DURATION_MIN: 2000,
  DURATION_MAX: 4000,
} as const;

export const THEME_HOURS = {
  DARK_START: 21, // 9 PM
  DARK_END: 6, // 6 AM
} as const;
