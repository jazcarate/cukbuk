import { writable } from 'svelte/store';
import type { TemperatureUnit, VolumeUnit, WeightUnit } from './lib/units';

const DEFAULT_WEIGHT_UNIT: WeightUnit = 'g';
const DEFAULT_VOLUME_UNIT: VolumeUnit = 'l';
const DEFAULT_TEMPERATURE_UNIT: TemperatureUnit = 'c';


export const scale = writable(1);
export const weightUnit = writable<WeightUnit>(DEFAULT_WEIGHT_UNIT);
export const temperatureUnit = writable<TemperatureUnit>(DEFAULT_TEMPERATURE_UNIT);
export const volumeUnit = writable<VolumeUnit>(DEFAULT_VOLUME_UNIT);