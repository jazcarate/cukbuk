import { testing } from './parser';

describe('line', () => {
    test('unparsable', () => {
        return expect(testing.line("[Foo")).rejects.toMatchObject({
            message: expect.stringMatching('PARSING FAILED')
        });
    });

    test('one word', () => {
        return expect(testing.line("foo")).resolves.toMatchObject({
            value: [{ _type: 'text', value: "foo" }]
        });
    });

    test('many words', () => {
        return expect(testing.line("foo bar biz")).resolves.toMatchObject({
            value: [{ _type: 'text', value: "foo bar biz" }]
        });
    });

    describe("ingredient", () => {
        test('just the ingredient', () => {
            return expect(testing.line("[salt]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'salt' }]
            });
        });

        test('number and ingredient', () => {
            return expect(testing.line("[3 eggs]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'eggs', value: { value: 3, unit: '' } }]
            });
        });
        test('a coma number', () => {
            return expect(testing.line("[5.2 lollipops]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'lollipops', value: { value: 5.2, unit: '' } }]
            });
        });
        test('mantissa bug', () => {
            return expect(testing.line("[60.333 eggs]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name:"eggs", value: { value: 60.333, unit: '' } }]
            });
        });
        test('a fractional number', () => {
            return expect(testing.line("[3/4 lemons]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'lemons', value: { value: 0.75, unit: '' } }]
            });
        });

        test('a weight', () => {
            return expect(testing.line("[5g of AP flour]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'of AP flour', value: { value: 5, unit: 'g' } }]
            });
        });

        test('a volume', () => {
            return expect(testing.line("[5cups of milk]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'of milk', value: { value: 5, unit: 'cup' } }]
            });
        });

        test('with density', () => {
            return expect(testing.line("[5g (0.762g/l) of milk]")).resolves.toMatchObject({
                value: [{
                    _type: 'ingredient', name: 'of milk',
                    value: { value: 5, unit: 'g' },
                    density: { value: 0.762, mass: "g", volume: "l" },
                }]
            });
        });

        test('a temperature', () => {
            return expect(testing.line("[5f]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: "", value: { value: 5, unit: 'f' } }]
            });
        });

        test('only a number', () => {
            return expect(testing.line("[5]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: "", value: { value: 5 } }]
            });
        });

        test('an ingredient starting with a weight', () => {
            return expect(testing.line("[coco]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: 'coco' }]
            });
        });
    })


    test('number and text', () => {
        return expect(testing.line("[5 foo] bar")).resolves.toMatchObject({
            value: [
                { _type: 'ingredient', name: "foo", value: { value: 5 } },
                { _type: 'text', value: ' bar' }
            ]
        });
    });

    test('text and number', () => {
        return expect(testing.line("foo [5 biz]")).resolves.toMatchObject({
            value: [
                { _type: 'text', value: 'foo ' },
                { _type: 'ingredient', name: "biz", value: { value: 5, unit: '' } },
            ]
        });
    });

    describe('timed', () => {
        test("short", () => {
            return expect(testing.line("[30:00]")).resolves.toMatchObject({
                value: [{ _type: 'time', value: { hours: 0, minutes: 30, seconds: 0 } }]
            });
        });

        test("complete", () => {
            return expect(testing.line("[1:30:00]")).resolves.toMatchObject({
                value: [{ _type: 'time', value: { hours: 1, minutes: 30, seconds: 0 } }]
            });
        });

        test("fractions", () => {
            return expect(testing.line("[1/2:00:00]")).resolves.toMatchObject({
                value: [{ _type: 'time', value: { hours: 0.5, minutes: 0, seconds: 0 } }]
            });
        })

    });

    describe('image', () => {
        test("simple", () => {
            return expect(testing.line("[!https://cataas.com/cat]")).resolves.toMatchObject({
                value: [{ _type: 'image', value: 'https://cataas.com/cat' }]
            });
        });

        test("with name", () => {
            return expect(testing.line("[!a cat|https://cataas.com/cat]")).resolves.toMatchObject({
                value: [{ _type: 'image', name: 'a cat', value: 'https://cataas.com/cat' }]
            });
        });

        test("not a link", () => {
            return expect(testing.line("[!foo]")).resolves.toMatchObject({
                value: [{ _type: 'ingredient', name: '!foo' }]
            });
        });
    })

    describe('types', () => {
        test("step", () => {
            return expect(testing.line("- foo")).resolves.toMatchObject({ _type: 'step' });
        });

        test("heading", () => {
            return expect(testing.line("# foo")).resolves.toMatchObject({ _type: 'header' });
        });
    });
})