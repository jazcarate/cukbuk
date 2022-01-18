import * as linkify from "linkifyjs";
import { options } from "linkifyjs";

type Text = Simple | Link | EmbeddedYouTube;

type Simple = { _type: 'text', value: string }
type Link = { _type: 'link', value: string, href: string }
type EmbeddedYouTube = { _type: 'embeddedYouTube', id: string }

// Copied from jrom @ https://stackoverflow.com/a/3726073
const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

// TODO: Use the `truncate` option when it gets fixed (https://github.com/Hypercontext/linkifyjs/milestone/4)
const MAX_LENGTH = 50;
const opts = new linkify.Options({
    format: (value: string, type: 'url' | string) => {
        if (type === 'url' && value.length > MAX_LENGTH) {
            value = value.slice(0, MAX_LENGTH) + '…';
        }
        return value;
    }
});

export function parse(str: string): Text[] {
    return linkify.tokenize(str).map(token => {
        if (token.isLink && opts.check(token)) {
            const {
                formatted,
                formattedHref,
            } = opts.resolve(token);
            const match = formattedHref.match(youtubeRegex);
            if (match) {
                return { _type: "embeddedYouTube", id: match[1] };
            }
            return { _type: "link", value: formatted, href: formattedHref };
        }
        return { _type: "text", value: token.toString() };
    });
}