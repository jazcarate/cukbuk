interface Pivotable {
    toPivot(x: number): number,
    fromPivot(x: number): number,
}

interface Unit {
    name: string,
    pivotable: Pivotable
}

type Family = Unit[];

interface Usage {
    scalable: number, // 0: Not scalable. 1: Linear. 2: Squared. etc.
    families: { [key: string]: Family }
}

function pivot(): Pivotable {
    return { toPivot: (x) => x, fromPivot: (x) => x };
}

function linear(k: number): Pivotable {
    return { toPivot: (x) => x / k, fromPivot: (x) => x * k };
}

export interface UnitType<T> {
    weight: T, volume: T, temperature: T, amount: T, area: T, length: T
}

function entries<T>(k: UnitType<T>): [keyof UnitType<T>, T][] {
    return Object.entries(k) as [keyof UnitType<T>, T][];
}

export type UnitDefinition = {
    type: keyof UnitType<any>,
    pivotable: Pivotable,
    power: number
};

export function find(x: string): UnitDefinition | undefined {
    const found = entries(units)
        .find(([, usage]) =>
            Object.values(usage.families).find((family) =>
                family.find(({ name }) => name == x)));


    if (found == undefined) return undefined;
    const [type, usage] = found;

    const foundFamilies = Object.entries(usage.families).find(([, units]) => units.find(({ name }) => name == x));
    if (foundFamilies == undefined) return undefined;

    const [familyName, familyUnits] = foundFamilies;

    const unit = familyUnits.find(({ name }) => name == x);
    return { type, pivotable: unit.pivotable, power: usage.scalable };
}

// the value is in the pivot of the family
function fit(value: number, family: Family): [number, string] {
    const candidates = Object.values(family).map(f => ({ name: f.name, val: f.pivotable.fromPivot(value) }))
        .sort(({ val: a }, { val: b }) => a - b);

    const { name, val } = candidates.find(({ val }) => val >= 1) || candidates[0]
    return [val, name];
}

interface UnitValue {
    pivotValue: number,
    value: number,
    unit: string
}

// from: unit, to: family
export function transform(x: number, from: string, to: string): UnitValue | undefined {
    const fromUnit = find(from);
    if (fromUnit == undefined) return undefined;
    const { type, pivotable, power } = fromUnit;

    const toFamily = units[type].families[to];

    if (toFamily == undefined) return undefined;

    const pivotValue = pivotable.toPivot(x);
    const [value, unit] = fit(pivotValue, toFamily);
    return { pivotValue, value, unit };
}

// All units should be lowercase to match the parser; but can have additional rendering thingamabobs
export const units: UnitType<Usage> = {
    weight: {
        scalable: 1,
        families: {
            metric: [
                { name: 'g', pivotable: pivot() },
                { name: 'kg', pivotable: linear(1 / 1000) },
            ],
            imperial: [
                { name: 'once', pivotable: linear(1 / 28.35) },
                { name: 'lb', pivotable: linear(1 / 453.59237) }
            ]
        }
    },
    volume: {
        scalable: 1,
        families: {
            metric: [
                { name: 'ml', pivotable: pivot() },
                { name: 'l', pivotable: linear(1 / 1000) },
            ],
            imperial: [
                { name: 'fluid ounce', pivotable: linear(1 / 29.574) },
            ],
            'us imperial': [
                { name: 'us fluid ounce', pivotable: linear(1 / 28.413) },
            ],
            customary: [
                { name: 'teaspoon', pivotable: linear(1 / 4.929) },
                { name: 'tablespoon', pivotable: linear(1 / 14.787) },
                { name: 'cup', pivotable: linear(1 / 236.588) },
                { name: 'pint', pivotable: linear(1 / 473) },
            ]
        }
    },
    temperature: {
        scalable: 0,
        families: {
            metric: [{ name: 'c', pivotable: pivot() }],
            imperial: [{
                name: 'f', pivotable: {
                    toPivot: (f: number) => (f - 32) * 5 / 9,
                    fromPivot: (c: number) => (c * 9 / 5) + 32,
                }
            }]
        }
    },
    length: {
        scalable: 1,
        families: {
            metric: [
                { name: 'm', pivotable: pivot() },
                { name: 'cm', pivotable: linear(1 / 1000) }
            ],
            imperial: [
                { name: 'in', pivotable: linear(0.0254) },
                { name: 'ft', pivotable: linear(0.3048) }
            ]
        }
    },
    area: {
        scalable: 2,
        families: {
            metric: [
                { name: 'm2', pivotable: pivot() },
                { name: 'cm2', pivotable: linear(1 / 10000) }
            ],
            imperial: [
                { name: 'sq in', pivotable: linear(1550) },
                { name: 'sq ft', pivotable: linear(10.7639) }
            ]
        }
    },
    amount: {
        scalable: 1,
        families: {
            _: [{ name: '', pivotable: pivot() }],
        }
    }
};


export const allUnits = Object.values(units).map(({ families }) => Object.values(families).map((units: any) => units.map(({ name }) => name)))
    .reduce((acc, val) => acc.concat(val.reduce((acc2, val2) => acc2.concat(val2), [])), []);