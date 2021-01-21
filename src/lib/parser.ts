import type { Duration } from "./time";
import { allUnits, toUnit } from "./units"
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

type Item = Text | Scalable | Time;
type Items = { _type: 'items', value: Item[] };
type Line = Header | Items;

type Recipe = {
    title: string,
    lines: Line[]
}

function header(value: string): Header {
    return { _type: 'header', value };
}

function items(text: string): Items {
    return { _type: 'items', value: toItems(text) };
}

function text(value: string): Text {
    return { _type: 'text', value };
}

function scalable(value: number, unit?: string): Scalable {
    return { _type: 'scalable', value, unit: toUnit(unit) };
}

function line(l: string): Line {
    if (l.startsWith('# ')) return header(l.substring(2));
    return items(l)
}

function toItems(value: string): Item[] {
    return value.split(' ').map(v => {
        const candidateScalable = v.match(new RegExp(`^(\\d+)(\\S*)$`, 'i'));
        if (candidateScalable != null) return scalable(parseFloat(candidateScalable[1]), candidateScalable[2])
        return text(v);
    });
}

export const testing = { line };

export function parse(text: string): Recipe {
    const [title, ...linesText] = text.split('\n');

    const lines = linesText.map(line)

    return { title, lines };
}