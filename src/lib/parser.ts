import type { Duration } from "./time";
import type { Unit } from "./units"

interface Text {
    _type: 'text',
    value: string
}

interface Header {
    _type: 'header',
    value: string
}

interface Scalable {
    _type: 'scalable',
    value: number,
    unit?: Unit
}

interface Time {
    _type: 'time',
    value: Duration
}

type Item = Text | Scalable | Time
type Line = Header | { _type: 'items', value: Item[] }

type Recipe = {
    title: string,
    lines: Line[]
}

export function parse(text: string): Recipe {
    let recipe = {};
    return {
        title: 'Cheesecake de zapallo',
        lines: [
            { _type: 'items', value: [{ _type: 'text', value: 'Sale una tarta medianita' }] },
            { _type: 'header', value: 'Parte blanca' },
            { _type: 'items', value: [{ _type: 'text', value: 'Mezclar' }, { _type: 'scalable', value: 3 }, { _type: 'text', value: ' huevos' }] },
            { _type: 'items', value: [{ _type: 'text', value: 'Cocinar' }, { _type: 'scalable', value: 2, unit: 'g' }] },
            { _type: 'items', value: [{ _type: 'time', value: { hours: 0, minutes: 0, seconds: 5 } }, { _type: 'text', value: ' de horno' }] },
        ],
    }
}