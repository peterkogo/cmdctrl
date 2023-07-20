import type { Handlers, Keymap } from '@cmdctrl/shortcuts'

export type ComboEvent = (event: CustomEvent<{ action: string }>) => any;

export type ComboAttachEvent = (event: CustomEvent<{ ref: HTMLElement, keyMap?: Keymap, handlers?: Handlers }>) => any;
export type ComboDetachEvent = (event: CustomEvent<{ ref: HTMLElement }>) => any;