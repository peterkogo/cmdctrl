export type Action = {
    'keys': string[]
}

export type Keymap = { [key: string]: Action }


export type Handler = {
    fn: () => void;
    stopPropagation: boolean;
    preventBubbling: boolean;
};

export type Handlers = { [key: string]: Handler }