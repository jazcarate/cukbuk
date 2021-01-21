const TITLE_BASE = "Cukb.uk";

export function setTitle(x: string): void {
    if (x) {
        document.title = TITLE_BASE + " :: " + x;
    } else {
        document.title = TITLE_BASE;
    }
}