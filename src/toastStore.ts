import { writable } from 'svelte/store';

export const toasts = writable<{ _id: number, msg: string }[]>([]);
const retainMs = 3500;

let toastId = 0;

export function pushToast(msg: string = ""): void {
    toasts.update(t => [...t, {
        _id: ++toastId,
        msg,
    }]);
    setTimeout(() => {
        toasts.update(t => t.filter((a, i) => i > 0));
    }, retainMs);
};
