import { parse, testing } from './parser';

const exampleRecipe = `Cheesecake de zapallo
# Parte blanca
19g de chocolate amargo
45g de azucar de mentira
100g de pure de zapagoo
3 claras de huevo
baking powder

# Parte negra
4g pure de zapallo
5g cream cheese
8g azucar de mentira
3g yema`

describe('toItems', () => {
    test('one word', () => {
        expect(testing.line("foo").value).toEqual([{ _type: 'text', value: "foo" }]);
    });

    test('many words', () => {
        expect(testing.line("foo bar biz").value).toEqual([
            { _type: 'text', value: "foo" },
            { _type: 'text', value: "bar" },
            { _type: 'text', value: "biz" },
        ]);
    });

    test('a number', () => {
        expect(testing.line("5").value).toEqual([{ _type: 'scalable', value: 5, unit: 'none' }]);
    });

    test('number and text', () => {
        expect(testing.line("5 foo").value).toEqual([
            { _type: 'scalable', value: 5, unit: 'none' },
            { _type: 'text', value: 'foo' }
        ]);
    });

    test('number and unit', () => {
        expect(testing.line("5g").value).toEqual([{ _type: 'scalable', value: 5, unit: 'g' }]);
    });

    test('number and other unit', () => {
        expect(testing.line("5lb").value).toEqual([{ _type: 'scalable', value: 5, unit: 'lb' }]);
    });

    test('text and number', () => {
        expect(testing.line("foo 5").value).toEqual([
            { _type: 'text', value: 'foo' },
            { _type: 'scalable', value: 5, unit: 'none' }
        ]);
    });

    test('heading', () => {
        expect(testing.line("# foo bar")).toEqual(
            { _type: 'header', value: "foo bar" }
        );
    });

    describe('timed', () => {
        test("short", () => {
            expect(testing.line("30:00").value).toEqual(
                [{ _type: 'time', value: { hours: 0, minutes: 30, seconds: 0 } }]
            );
        });

        test("complete", () => {
            expect(testing.line("1:30:00").value).toEqual(
                [{ _type: 'time', value: { hours: 1, minutes: 30, seconds: 0 } }]
            );
        })

    });
})

test.skip('basic', () => {
    expect(parse(exampleRecipe)).toBe({
        title: 'Cheesecake de zapallo',
        lines: [
            { _type: 'header', value: 'Parte blanca' },
            { _type: 'items', value: [{ _type: 'scalable', value: 19, uni: 'g' }, { _type: 'text', value: ' de chocolate amargo' }] },
            { _type: 'items', value: [{ _type: 'scalable', value: 45, unit: 'g' }, { _type: 'text', value: ' de azucar de mentira' }] },
            { _type: 'items', value: [{ _type: 'scalable', value: 100, unit: 'g' }, { _type: 'text', value: ' de pure de zapagoo' }] },
            {
                _type: 'items', value: [{ _type: 'alternative', values: [{ _type: 'scalable', value: 24, unit: 'g' }, { _type: 'scalable', value: 3 }] },
                { _type: 'text', value: ' claras de huevo' }]
            },
            {
                _type: 'items', value: [{ _type: 'text', value: 'baking powder' }]
            },
            { _type: 'header', value: 'Parte negra' },
            { _type: 'items', value: [{ _type: 'scalable', value: 5, uni: 'g' }, { _type: 'text', value: ' pure de zapallo' }] },
            { _type: 'items', value: [{ _type: 'scalable', value: 4, uni: 'g' }, { _type: 'text', value: ' cream cheese' }] },
            { _type: 'items', value: [{ _type: 'scalable', value: 8, uni: 'g' }, { _type: 'text', value: ' azucar de mentira' }] },
            { _type: 'items', value: [{ _type: 'scalable', value: 3, uni: 'g' }, { _type: 'text', value: ' yema' }] },
        ],
    });
});