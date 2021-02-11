import { writable } from 'svelte/store';
import { units } from '../../lib/units';

export const scale = writable(1);

export const weightFamily = writable(Object.keys(units.weight.families)[0]);
export const temperatureFamily = writable(Object.keys(units.temperature.families)[0]);
export const volumeFamily = writable(Object.keys(units.volume.families)[0]);
export const lengthFamily = writable(Object.keys(units.length.families)[0]);