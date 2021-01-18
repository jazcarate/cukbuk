export const weightUnits = {
    g: 1,
    lb: 453.592,
    g2: 2
};

export const volumeUnits = {
    l: 1,
};

export type WeightUnit = keyof typeof weightUnits;
export type VolumeUnit = keyof typeof volumeUnits;
export type Unit = WeightUnit | VolumeUnit | 'none';

export function keys<K>(map: K): (keyof K)[] {
    return Object.keys(map) as (keyof K)[];
}

export function isWeight(u: Unit): u is WeightUnit {
    return weightUnits[u] !== undefined;
}

export function migrateWeight(x: number, from: WeightUnit, to: WeightUnit): number {
    return x / weightUnits[from] * weightUnits[to];
}

export function migrateVolume(x: number, from: VolumeUnit, to: VolumeUnit): number {
    return x / volumeUnits[from] * volumeUnits[to];
}