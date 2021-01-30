interface Pivotable {
    toPivot(x: number): number,
    fromPivot(x: number): number,
}

interface Unit {
    name: string,
    pivotable: Pivotable
}

function pivot(): Pivotable {
    return { toPivot: (x) => x, fromPivot: (x) => x };
}

function linear(k: number): Pivotable {
    return { toPivot: (x) => x / k, fromPivot: (x) => x * k };
}

export interface UnitFamily<T> {
    weight: T, volume: T, temperature: T
}

// All units should be lowercase to match the parser; but can have additional rendering thingamabobs
export const units = {
    weight: {
        pow: 1,
        values: {
            g: pivot(),
            lb: linear(453.59237)
        }
    },
    volume: {
        pow: 1,
        values: {
            ml: pivot(),
            cup: linear(0.0208333),
            teaspoon: linear(4.92892),
        }
    },
    temperature: {
        pow: 0,
        values: {
            c: pivot(),
            f: {
                toPivot: (c: number) => (c * 9 / 5) + 32,
                fromPivot: (f: number) => (f - 32) * 5 / 9,

            }
        }
    }
};