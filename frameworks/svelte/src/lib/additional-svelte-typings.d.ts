declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:cmdctrl'?: import('./types.js').CmdCtrlEvent;
    }
}

