import { parse } from './parser';

describe('test parsing', () => {
    test('nothing fancy', () => {
        return expect(parse("foo")).toStrictEqual([
            { _type: "text", value: "foo" }
        ]);
    });

    describe('YouTube', () => {
        test("long form link", () => {
            return expect(parse("https://www.youtube.com/watch?v=foo")).toStrictEqual([
                { _type: "embeddedYouTube", id: "foo" }
            ]);
        });
        test("short form link", () => {
            return expect(parse("https://youtu.be/foo?t=409")).toStrictEqual([
                { _type: "embeddedYouTube", id: "foo" }
            ]);
        });

        test("with something else", () => {
            return expect(parse("foo bar https://youtu.be/foo?t=409 biz")).toStrictEqual([
                { _type: "text", value: "foo bar " },
                { _type: "embeddedYouTube", id: "foo" },
                { _type: "text", value: " biz" },
            ]);
        });
    });

    describe('link', () => {
        test("complete form link", () => {
            return expect(parse("https://www.google.com/?q=foo")).toStrictEqual([
                { _type: "link", value: "https://www.google.com/?q=foo", href: "https://www.google.com/?q=foo" }
            ]);
        });

        test("short form link", () => {
            return expect(parse("google.com/?q=foo")).toStrictEqual([
                { _type: "link", href: "http://google.com/?q=foo", value: "google.com/?q=foo" }
            ]);
        });

        test("truncate", () => {
            const superLongURL = `http://google.com/search?q=su${'u'.repeat(100)}uper_long`
            return expect(parse(superLongURL)).toStrictEqual([
                { _type: "link", href: superLongURL, value: "http://google.com/search?q=suuuuuuuuuuuuuuuuuuuuuu…" }
            ]);
        });

        test("with something else", () => {
            return expect(parse("foo bar google.com biz")).toStrictEqual([
                { _type: "text", value: "foo bar " },
                { _type: "link", value: "google.com", href: "http://google.com" },
                { _type: "text", value: " biz" },
            ]);
        });
    })
})