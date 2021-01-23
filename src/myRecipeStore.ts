import { writable } from 'svelte/store';

const DEFAULT_WEIGHT_UNIT = 'g';
const DEFAULT_VOLUME_UNIT = 'l';
const DEFAULT_TEMPERATURE_UNIT = 'c';

export const scale = writable(1);

export const weightUnit = writable(DEFAULT_WEIGHT_UNIT);
export const temperatureUnit = writable(DEFAULT_TEMPERATURE_UNIT);
export const volumeUnit = writable(DEFAULT_VOLUME_UNIT);