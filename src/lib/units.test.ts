import { find, transform } from './units';

expect.extend({
    toBeU(received, val, u) {
        expect(received.unit).toBe(u);
        expect(received.value).toBeCloseTo(val);
        return {
            pass: true,
            message: () => '',
        };
    },
});

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeU(expectedVal: number, expectedUnit: string): CustomMatcherResult
        }
    }
}

describe('units', () => {

    describe("types", () => {
        test('weight', () => {
            expect(find('g')[0]).toBe('weight');
            expect(find('kg')[0]).toBe('weight');
            expect(find('once')[0]).toBe('weight');
            expect(find('lb')[0]).toBe('weight');
        });

        test('volume', () => {
            expect(find('ml')[0]).toBe('volume');
            expect(find('us fluid ounce')[0]).toBe('volume');
            expect(find('pint')[0]).toBe('volume');
            expect(find('cup')[0]).toBe('volume');
        });

        test('temperature', () => {
            expect(find('c')[0]).toBe('temperature');
            expect(find('f')[0]).toBe('temperature');
        });

        test('none', () => {
            expect(find('foo')).toBeUndefined();
        });
    });

    describe("transform", () => {
        describe("happy paths", () => {
            test('to same family', () => {
                expect(transform(300, 'g', 'metric')).toBeU(300, 'g');
            });

            test('to another family', () => {
                expect(transform(300, 'g', 'imperial')).toBeU(10.58, 'once');
            });

            test('to another family, different scale', () => {
                expect(transform(500, 'g', 'imperial')).toBeU(1.10231, 'lb');
            });
            test('to same family, fits', () => {
                expect(transform(3000, 'g', 'metric')).toBeU(3, 'kg');
            });

            test('to another family not from the pivot', () => {
                expect(transform(2, 'kg', 'imperial')).toBeU(4.41, 'lb');
            });

            test('amounts', () => {
                expect(transform(300, '', '_')).toBeU(300, '');
            });
        });

        describe("conversions", () => {
            test("weight", () => {
                expect(transform(300, 'g', 'metric')).toBeU(300, 'g');
                expect(transform(3000, 'g', 'metric')).toBeU(3, 'kg');

                expect(transform(300, 'g', 'imperial')).toBeU(10.58, 'once');
                expect(transform(500, 'g', 'imperial')).toBeU(1.1, 'lb');


                expect(transform(300, 'once', 'metric')).toBeU(8.51, 'kg');
                expect(transform(2, 'lb', 'metric')).toBeU(907.18, 'g');
            });

            test("volume", () => {
                expect(transform(300, 'ml', 'metric')).toBeU(300, 'ml');
                expect(transform(3000, 'ml', 'metric')).toBeU(3, 'l');

                expect(transform(1, 'ml', 'imperial')).toBeU(0.034, 'fluid ounce');

                expect(transform(1, 'ml', 'us imperial')).toBeU(0.035, 'us fluid ounce');

                expect(transform(5, 'ml', 'customary')).toBeU(1.01, 'teaspoon');
                expect(transform(15, 'ml', 'customary')).toBeU(1.01, 'tablespoon');
                expect(transform(240, 'ml', 'customary')).toBeU(1.01, 'cup');
                expect(transform(500, 'ml', 'customary')).toBeU(1.06, 'pint');

                expect(transform(2, 'tablespoon', 'metric')).toBeU(29.57, 'ml');
            });

            test("temperature", () => {
                expect(transform(100, 'c', 'metric')).toBeU(100, 'c');

                expect(transform(100, 'c', 'imperial')).toBeU(212, 'f');


                expect(transform(100, 'f', 'metric')).toBeU(37.78, 'c');
            });
        });

        describe("errors", () => {
            test('to different families', () => {
                expect(transform(300, 'g', 'customary')).toBeUndefined();
            });

            test('non existent unit', () => {
                expect(transform(300, 'foo', 'customary')).toBeUndefined();
            });
        })
    });
})