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
            l: pivot()
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