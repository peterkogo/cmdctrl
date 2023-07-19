import { Detector } from '@cmdctrl/shortcuts';
import type { Action } from 'svelte/action';

import type { Handlers, Keymap } from '@cmdctrl/shortcuts'


export const detector: Action<Window | HTMLElement, (keys: string[]) => void> = (
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


import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher<{
    cmdctrlRegisterKeymap: {
        keymap: Keymap,
        ref: HTMLElement
    },
    cmdctrlDeregisterKeymap: {
        ref: HTMLElement
    },
    cmdctrlRegisterHandler: {
        handlers: Handlers,
        ref: HTMLElement
    },
    cmdctrlDeregisterHandler: {
        ref: HTMLElement
    }
}>()

type cmdctrlActionOptions = { keyMap: Keymap | undefined, handlers: Handlers | undefined }
// type cmdctrlActionOptions = (keys: string[]) => void

export const cmdctrl: Action<HTMLElement, cmdctrlActionOptions> = (
    node,
    options: cmdctrlActionOptions
) => {
    if (options.keyMap) {
        dispatch('cmdctrlRegisterKeymap', { keymap: options.keyMap, ref: node })
    }
    if (options.handlers) {
        dispatch('cmdctrlRegisterHandler', { handlers: options.handlers, ref: node })
    }
    return {
        destroy: () => {
            if (options.keyMap) {
                dispatch('cmdctrlDeregisterKeymap', { ref: node })
            }
            if (options.handlers) {
                dispatch('cmdctrlDeregisterHandler', { ref: node })
            }
        },
        update: (options) => {
            if (options.keyMap) {
                dispatch('cmdctrlRegisterKeymap', { keymap: options.keyMap, ref: node })
            }
            if (options.handlers) {
                dispatch('cmdctrlRegisterHandler', { handlers: options.handlers, ref: node })
            }
        }
    }
}


