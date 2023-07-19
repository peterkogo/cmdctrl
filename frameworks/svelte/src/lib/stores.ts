import { writable } from 'svelte/store';

function privateWritable<T>(value: T) {
    const { subscribe, set, update } = writable<T>(value);

    return {
        subscribe,
        _update: update,
        _set: set
    };
}

export const pressedKeys = privateWritable<string[]>([]);