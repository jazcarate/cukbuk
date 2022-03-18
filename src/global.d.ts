type CompresionMode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface LZMA {
    decompress(x: any, cb: (decoded: string, err: any) => void): void
    compress(x: string, CompresionMode, cb: (encoded: number[], err: any) => void): void
}

declare const LZMA: LZMA;
declare const __cukbuk: { env: any, isProd: boolean };

declare module 'svelte-hash-router';