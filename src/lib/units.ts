export const weightUnits = {
    g: 1,
    lb: 453.592,
    g2: 2
};

export const volumeUnits = {
    l: 1,
};

export const temperatureUnits = {
    c: 1,
    f: 999 // TODO
}

export const allUnits = [...keys(weightUnits), ...keys(volumeUnits), 'none'];

export type WeightUnit = keyof typeof weightUnits;
export type VolumeUnit = keyof typeof volumeUnits;
export type TemperatureUnit = keyof typeof temperatureUnits;
export type Unit = WeightUnit | VolumeUnit | TemperatureUnit | 'none';

export function keys<K>(map: K): (keyof K)[] {
    return Object.keys(map) as (keyof K)[];
}

export function toUnit(u: string): Unit {
    if (allUnits.includes(u))
        return u as Unit;
    return 'none';
}

export function isWeight(u: Unit): u is WeightUnit {
    return weightUnits[u] !== undefined;
}

export function isTemp(u: Unit): u is TemperatureUnit {
    return temperatureUnits[u] !== undefined;
}

export function migrateWeight(x: number, from: WeightUnit, to: WeightUnit): number {
    return x / weightUnits[from] * weightUnits[to];
}

export function migrateVolume(x: number, from: VolumeUnit, to: VolumeUnit): number {
    return x / volumeUnits[from] * volumeUnits[to];
}