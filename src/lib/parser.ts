import type { Duration } from "./time";
import { allUnits, toUnit } from "./units"
import type { Unit } from "./units"

interface Text {
    _type: 'text',
    value: string
}



interface Scalable {
    _type: 'scalable',
    value: number,
    unit?: Unit
}


export type Item = Text | Scalable | Time | Alternative;
type Time = { _type: 'time', value: Duration };
type Step = { _type: 'step', value: Item[] };
type Paragraph = { _type: 'paragraph', value: Item[] };
type Header = { _type: 'header', value: string };
type Alternative = { _type: 'alternative', value: Line[][] };
export type Line = Header | Paragraph | Step;

type Recipe = {
    title: string,
    lines: Line[]
}

function header(value: string): Header {
    return { _type: 'header', value };
}

function step(text: string): Step {
    return { _type: 'step', value: toItems(text) };
}

function paragraph(text: string): Paragraph {
    return { _type: 'paragraph', value: toItems(text) };
}

function text(value: string): Text {
    return { _type: 'text', value };
}

function scalable(value: number, unit?: string): Scalable {
    return { _type: 'scalable', value, unit: toUnit(unit) };
}

function time(hours: number, minutes: number, seconds: number): Time {
    return { _type: 'time', value: { hours, minutes, seconds } };
}

function line(l: string): Line {
    if (l.startsWith('# ')) return header(l.substring(2));
    if (l.startsWith('- ')) return step(l.substring(2));
    return paragraph(l)
}

function toItems(value: string): Item[] {
    return value.split(' ').map(v => {
        const candidateTimed = v.match(/^(\d+):(\d+)(?::(\d+))?$/i);
        if (candidateTimed != null) {
            if (candidateTimed[3])
                return time(parseFloat(candidateTimed[1]) || 0, parseFloat(candidateTimed[2]) || 0, parseFloat(candidateTimed[3]) || 0)
            return time(0, parseFloat(candidateTimed[1]) || 0, parseFloat(candidateTimed[2]) || 0)
        }

        const candidateScalable = v.match(/^(\d+)(\S*)$/i);
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