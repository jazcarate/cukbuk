import { testing } from './parser';

describe('line', () => {
    test('one word', () => {
        expect(testing.line("foo").value).toEqual([{ _type: 'text', value: "foo" }]);
    });

    test('many words', () => {
        expect(testing.line("foo bar biz").value).toEqual([{ _type: 'text', value: "foo bar biz" }]);
    });

    describe("ingredient", () => {
        test('just the ingredient', () => {
            expect(testing.line("[salt]").value).toEqual([{ _type: 'ingredient', name: 'salt' }]);
        });

        test('number and ingredient', () => {
            expect(testing.line("[3 eggs]").value).toEqual([{ _type: 'ingredient', name: 'eggs', value: 3, unit: null }]);
        });
        test('a coma number', () => {
            expect(testing.line("[5.2 lollipops]").value).toEqual([{ _type: 'ingredient', value: 5.2, name: 'lollipops', unit: null }]);
        });
        test('a fractional number', () => {
            expect(testing.line("[3/4 lemons]").value).toEqual([{ _type: 'ingredient', value: 0.75, name: 'lemons', unit: null }]);
        });

        test('a weight', () => {
            expect(testing.line("[5g of AP flour]").value).toEqual([{ _type: 'ingredient', value: 5, unit: 'g', name: 'of AP flour' }]);
        });

        test('a volume', () => {
            expect(testing.line("[5cups of milk]").value).toEqual([{ _type: 'ingredient', value: 5, unit: 'cup', name: 'of milk' }]);
        });

        test('a temperature', () => {
            expect(testing.line("[5f]").value).toEqual([{ _type: 'scalable', value: 5, unit: 'f' }]);
        });
    })

    test('number and text', () => {
        expect(testing.line("[5] foo").value).toEqual([
            { _type: 'scalable', value: 5, unit: null },
            { _type: 'text', value: ' foo' }
        ]);
    });

    test('text and number', () => {
        expect(testing.line("foo [5]").value).toEqual([
            { _type: 'text', value: 'foo ' },
            { _type: 'scalable', value: 5, unit: null },
        ]);
    });

    describe('timed', () => {
        test("short", () => {
            expect(testing.line("[30:00]").value).toEqual(
                [{ _type: 'time', value: { hours: 0, minutes: 30, seconds: 0 } }]
            );
        });

        test("complete", () => {
            expect(testing.line("[1:30:00]").value).toEqual(
                [{ _type: 'time', value: { hours: 1, minutes: 30, seconds: 0 } }]
            );
        });

        test("fractions", () => {
            expect(testing.line("[1/2:00:00]").value).toEqual(
                [{ _type: 'time', value: { hours: 0.5, minutes: 0, seconds: 0 } }]
            );
        })

    });

    describe('types', () => {
        test("step", () => {
            expect(testing.line("- foo")._type).toEqual('step');
        });
        test("heading", () => {
            expect(testing.line("# foo")._type).toEqual('header');
        });
        test("p", () => {
            expect(testing.line("foo")._type).toEqual('paragraph');
        });
    });

    describe('alternative', () => {
        test("texts", () => {
            expect(testing.line("[foo|bar]").value).toEqual({
                _type: 'alternative', values: [
                    [{ _type: 'text', value: "foo" }],
                    [{ _type: 'text', value: "bar" }]
                ]
            });
        });
    });
})