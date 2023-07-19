import { Keymap, Action } from "./types";

//TODO: Events too often matched when key combinations overlap
// Resolves currently pressed key combinations into actions
class Resolver {
    map: Map<string, string>
    handleMatch: (action: string) => void

    constructor(keymap: Keymap, handleMatch: (action: string) => void) {
        const map = new Map();
        Object.entries<Action>(keymap).forEach((action) => {
            // TODO: Sort first
            map.set(action[1].keys.join(''), action[0])
        })
        this.map = map
        this.handleMatch = handleMatch
    }

    resolve(keys: string[]) {
        const action = this.map.get(keys.join(''))
        if (action) {
            this.handleMatch(action)
        }
    }
}

export default Resolver