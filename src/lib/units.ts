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
    scalable: boolean,
    families: { [key: string]: Family }
}

function pivot(): Pivotable {
    return { toPivot: (x) => x, fromPivot: (x) => x };
}

function linear(k: number): Pivotable {
    return { toPivot: (x) => x / k, fromPivot: (x) => x * k };
}

export interface UnitType<T> {
    weight: T, volume: T, temperature: T, amount: T, length: T
}

function entries<T>(k: UnitType<T>): [keyof UnitType<T>, T][] {
    return Object.entries(k) as [keyof UnitType<T>, T][];
}

export type UnitDefinition = [keyof UnitType<any>, string, Unit];

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
    return [type, familyName, unit];
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

    const toFamily = units[fromUnit[0]].families[to];

    if (toFamily == undefined) return undefined;

    const pivotValue = fromUnit[2].pivotable.toPivot(x);
    const [value, unit] = fit(pivotValue, toFamily);
    return { pivotValue, value, unit };
}

// All units should be lowercase to match the parser; but can have additional rendering thingamabobs
export const units: UnitType<Usage> = {
    weight: {
        scalable: true,
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
        scalable: true,
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
        scalable: false,
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
        scalable: false,
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
    amount: {
        scalable: true,
        families: {
            _: [{ name: '', pivotable: pivot() }],
        }
    }
};


export const allUnits = Object.values(units).map(({ families }) => Object.values(families).map((units: any) => units.map(({ name }) => name)))
    .reduce((acc, val) => acc.concat(val.reduce((acc2, val2) => acc2.concat(val2), [])), []);