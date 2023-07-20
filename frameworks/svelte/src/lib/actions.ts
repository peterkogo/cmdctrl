import { createEventDispatcher } from 'svelte';
import { Detector } from '@cmdctrl/shortcuts';

import type { Action } from 'svelte/action';
import type { Handlers, Keymap } from '@cmdctrl/shortcuts'


export const comboDetector: Action<Window | HTMLElement, (keys: string[]) => void> = (
    node,
    handleUpdate: (keys: string[]) => void
) => {
    const detector = new Detector(node, handleUpdate);
    return {
        destroy: () => {
            detector.destroy();
        }
    };
};

type comboActionOptions = { keyMap?: Keymap, handlers?: Handlers }

export const combo: Action<HTMLElement, comboActionOptions> = (
    node,
    options: comboActionOptions
) => {
    // TODO?: Warning if neither keymap nor handler attached
    node.dispatchEvent(
        new CustomEvent('comboAttach', {
            detail: { ref: node, keymap: options.keyMap, handlers: options.handlers },
            bubbles: true
        })
    )
    return {
        destroy: () => {
            node.dispatchEvent(
                new CustomEvent('comboDetach', {
                    detail: { ref: node },
                    bubbles: true
                })
            )
        },
        update: (options) => {
            node.dispatchEvent(
                new CustomEvent('comboAttach', {
                    detail: { ref: node, keymap: options.keyMap, handlers: options.handlers },
                    bubbles: true
                })
            )
        }
    }
}


