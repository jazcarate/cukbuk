import P, { seqMap } from "parsimmon";
import type { Duration } from "./time";
import { units } from "./units";

export type Item = Text | Ingredient | Scalable | Time | Alternative;
type Text = { _type: 'text', value: string }
type Ingredient = { _type: 'ingredient', name: string, value?: number, unit?: string }
type Scalable = { _type: 'scalable', value: number, unit?: string }
type Time = { _type: 'time', value: Duration };
type Alternative = { _type: 'alternative', value: Item[][] };

export type Line = Header | Paragraph | Step;
type Header = { _type: 'header', value: string };
type Paragraph = { _type: 'paragraph', value: Item[] };
type Step = { _type: 'step', value: Item[] };

type Recipe = {
    title: string,
    lines: Line[]
}

const OPEN_RECIPE_DSL = "["
const CLOSE_RECIPE_DSL = "]";

const allUnits = Object.values(units).map(({ values }) => Object.keys(values)).reduce((acc, val) => acc.concat(val), []);

function wrap<T>(...xs: P.Parser<T>[]): P.Parser<T>[] {
    return xs.map(x => x.trim(P.optWhitespace)
        .wrap(P.string(OPEN_RECIPE_DSL), P.string(CLOSE_RECIPE_DSL)));
}

function time(parts: number[]): Time {
    const [hours, minutes, seconds] = parts[2] == null ? [0, ...parts] : parts;
    return { _type: 'time', value: { hours, minutes, seconds } };
}

const parser = P.createLanguage({
    _: () => P.optWhitespace,
    Decimal: r => P.seqMap(r.Integer, P.string("."), r.Integer, (characteristic, _, mantissa) => characteristic + mantissa / 10).desc("decimal value"),
    Integer: () => P.digit.atLeast(1).tie().map(Number).desc("integer"),
    Fraction: r => P.seqMap(r.Integer, P.string('/'), r.Integer, (denom, _, numerator) => denom / numerator).desc("fraction"),
    Number: r => P.alt<number>(r.Fraction, r.Decimal, r.Integer),

    Text: () => P.takeWhile(c => c !== OPEN_RECIPE_DSL).assert(t => !!t, "it needs to parse something").map<Text>(value => ({ _type: 'text', value })),

    EnclosedString: () => P.takeWhile(c => c !== CLOSE_RECIPE_DSL && c !== "|").assert(t => !!t, "it needs to parse something").desc("string"),

    Unit: () => P.alt(...(allUnits.map(P.string))).skip(P.string("s").or(P.succeed(1))),
    NumberUnit: r => P.seq(r.Number, r.Unit.fallback(null)),
    SimpleIngredient: r => r.EnclosedString.map<Ingredient>(name => ({ _type: 'ingredient', name })),
    NumberIngredient: r => P.seqMap(r.NumberUnit.skip(P.whitespace), r.EnclosedString, ([value, unit], name) => ({ _type: 'ingredient', name, value, unit } as Ingredient)),
    Ingredient: r => P.alt(r.NumberIngredient, r.SimpleIngredient),
    Scalable: r => r.NumberUnit.map<Scalable>(([value, unit]) => ({ _type: 'scalable', value, unit })),
    Time: r => P.seq(r.Number.skip(P.string(":")), r.Number, P.string(":").then(r.Number).fallback(null)).map(time),
    Alternative: r => r.Items.sepBy1(P.string("|")).map<Alternative>(value => ({ _type: 'alternative', value })),

    WrappedItem: r => P.alt(...wrap(r.Alternative, r.Time, r.Scalable, r.Ingredient)),
    Item: r => P.alt<Item>(r.WrappedItem, r.Text),
    Items: r => r.Item.atLeast(1),

    Header: r => P.string("#").then(r._).then(P.all).map<Header>(value => ({ _type: 'header', value })),
    Step: r => P.string("-").then(r._).then(r.Items).map<Step>(value => ({ _type: 'step', value })),
    Paragraph: r => r.Items.map<Paragraph>(value => ({ _type: 'paragraph', value })),
    Line: r => P.alt(r.Header, r.Step, r.Paragraph)
});


function line(l: string): Line {
    return parser.Line.tryParse(l);  // TODO handle failure
}

export const testing = { line };

export function parse(text: string): Recipe {
    const [title, ...linesText] = text.split('\n');

    const lines = linesText.map(line)

    return { title, lines };
}