declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:combo'?: import('./types.js').ComboEvent;
        'on:comboAttach'?: import('./types.js').ComboAttachEvent;
        'on:comboDetach'?: import('./types.js').ComboDetachEvent;
    }
}

