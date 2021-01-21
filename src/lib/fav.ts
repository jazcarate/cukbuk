import type { RecipeKey } from "./lzma";

export function checkFav(key: string): boolean {
    return window.localStorage.getItem(key) !== null;
}

export function toggleFav(key: string, url: string): void {
    if (checkFav(key)) {
        window.localStorage.removeItem(key);
    } else {
        window.localStorage.setItem(key, JSON.stringify({ url, date: Date.now() }));
    }
}

interface Fav {
    name: string,
    url: string,
    date: Date,
}

export function listFavs(): Fav[] {
    return Object.entries(window.localStorage)
        .map(([name, data]) => {
            const { url, date } = JSON.parse(data);
            return { name, url, date: new Date(date) }
        });
}